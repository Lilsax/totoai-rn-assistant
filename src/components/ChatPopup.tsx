import React, {useState, useRef, useEffect, useCallback} from 'react';
import {View, Text, TextInput, Alert, ScrollView, TouchableOpacity, Pressable, Modal, Animated, Dimensions, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {ChatMessage, ChatPopupProps, ChatScreenNavigationProp, ComponentData, GeminiHistoryMessage, ResponseData} from '../types';
import Markdown from 'react-native-markdown-display';
import {getApp} from '@react-native-firebase/app';
import type {Part} from '@react-native-firebase/ai';
import {getAI, getGenerativeModel, GoogleAIBackend} from '@react-native-firebase/ai';
import {chatPopupStyles as styles, markdownStyles} from '../styles/ChatPopup.styles';
import {reasoning_template} from '../ai/prompts/promptTemplates';
import {fileReadingTools, tools} from '../ai/tools';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CreditCard from './CreditCard';
import {launchImageLibrary} from 'react-native-image-picker';
import {chatStorage} from '../utils/chatStorage';
import LoadingDots from 'react-native-loading-dots';
import {initWhisper, initWhisperVad, type WhisperContext, type WhisperVadContext} from 'whisper.rn/index.js';
import type {AudioStreamInterface, RealtimeVadEvent, RealtimeTranscribeEvent} from 'whisper.rn/src/realtime-transcription';
import {RealtimeTranscriber} from 'whisper.rn/src/realtime-transcription';
import {AudioPcmStreamAdapter} from 'whisper.rn/realtime-transcription/adapters/AudioPcmStreamAdapter.js';
import RNFS from 'react-native-fs';

const componentRegistry: Record<string, React.ComponentType<any>> = {
  CreditCard,
};

const firebaseApp = getApp();
const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

const ChatPopup: React.FC<ChatPopupProps> = ({ visible, onClose }) => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [geminiHistory, setGeminiHistory] = useState<GeminiHistoryMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [currentTranscription, setCurrentTranscription] = useState<string>('');

  const navigation = useNavigation<ChatScreenNavigationProp>();

  const slideAnim = useRef(new Animated.Value(0)).current;
  const whisperContextRef = useRef<WhisperContext | null>(null);
  const vadContextRef = useRef<WhisperVadContext | null>(null);
  const realtimeTranscriberRef = useRef<RealtimeTranscriber | null>(null);
  const audioStreamRef = useRef<AudioStreamInterface | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const model = getGenerativeModel(ai, {
    model: 'gemini-2.5-flash',
    systemInstruction: reasoning_template,
    tools: [fileReadingTools],
  });

  useEffect(
    () => () => {
      whisperContextRef.current?.release();
      vadContextRef.current?.release();
      realtimeTranscriberRef.current?.release();
    },
    [],
  );

  useEffect(() => {
    const loadChatHistory = async () => {
      const storedHistory = await chatStorage.loadHistory();
      const fixedHistory: GeminiHistoryMessage[] = [];

      for (let i = 0; i < storedHistory.length; i++) {
        const currentMessage = storedHistory[i];
        const nextMessage = storedHistory[i + 1];

        fixedHistory.push(currentMessage);

        if (nextMessage && currentMessage.role === nextMessage.role) {
          const oppositeRole = currentMessage.role === 'user' ? 'model' : 'user';
          fixedHistory.push({
            role: oppositeRole,
            parts: [{ text: '' }],
          });
        }
      }

      setGeminiHistory(fixedHistory);
    };

    loadChatHistory();
  }, []);

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [visible, slideAnim]);

  useEffect(() => {
    initializeContextsWithAsset();
  }, []);

  const getModelPath = async (modelName: string) => {
    if (Platform.OS === 'android') {
      const destPath = `${RNFS.DocumentDirectoryPath}/${modelName}`;

      const exists = await RNFS.exists(destPath);
      if (!exists) {
        await RNFS.copyFileAssets(`models/${modelName}`, destPath);
      }
      return destPath;
    } else if (Platform.OS === 'ios') {
      return `${RNFS.MainBundlePath}/${modelName}`;
    } else {
      throw new Error('Unsupported platform');
    }
  }

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSendVoiceMsg = () => {
    if (realtimeTranscriberRef.current) {
      realtimeTranscriberRef.current.stop();
      const allResults =
        realtimeTranscriberRef.current?.getTranscriptionResults() ?? [];

      if (allResults.length > 0) {
        const {transcribeEvent} = allResults[0] ?? {};
        const {data} = transcribeEvent ?? {};
        const {result} = data ?? {};

        handleSendMessage(result);
      }
    }
  };

  const handleTranscribeEvent = (event: RealtimeTranscribeEvent) => {
    try {
      const {data} = event;

      if (data?.result) {
        const transcriptionText = data.result.trim();

        if (transcriptionText) {
          setCurrentTranscription(transcriptionText);
        }
      }
    } catch (error) {
      console.log('handleTranscribeEvent error', error);
    }
  };

  const handleStatusChange = (isActive: boolean) => {
    setIsTranscribing(isActive);
  };

  const handleError = (error: string) => {
    console.log('Realtime Error:', error);
  };

  async function initializeContextsWithAsset() {
    try {
      if (whisperContextRef.current) {
        await whisperContextRef.current.release();
        whisperContextRef.current = null;
      }

      if (vadContextRef.current) {
        await vadContextRef.current.release();
        vadContextRef.current = null;
      }

      const whisperModelPath: string = await getModelPath("ggml-tiny.bin");

      const whisperCtx = await initWhisper({
        filePath: whisperModelPath,
        ...{},
      });

      whisperContextRef.current = whisperCtx;

      const whisperVadModelPath: string = await getModelPath("ggml-silero-v5.1.2.bin");

      const vadCtx = await initWhisperVad({
        filePath: whisperVadModelPath,
        useGpu: true,
        nThreads: 4,
      });

      vadContextRef.current = vadCtx;
    } catch (error: any) {
      console.log('Error', `Failed to initialize: ${error}`);
    }
  };

  const startRealtimeTranscription = async () => {
    try {
      if (!whisperContextRef.current || !vadContextRef.current) {
        console.log('Error', 'Contexts not initialized');
        return;
      }

      if (isTranscribing) {
        handleSendVoiceMsg();
      } else {
        const audioStream: AudioStreamInterface = new AudioPcmStreamAdapter();

        audioStreamRef.current = audioStream;

        if (realtimeTranscriberRef.current) {
          realtimeTranscriberRef.current.release();
        }

        const transcriber = new RealtimeTranscriber(
          {
            whisperContext: whisperContextRef.current,
            vadContext: vadContextRef.current,
            audioStream,
            fs: RNFS,
          },
          {
            audioSliceSec: 30,
            audioMinSec: 0.5,
            maxSlicesInMemory: 1,
            vadPreset: 'default',
            vadOptions: {
              threshold: 0.5,
              minSpeechDurationMs: 250,
              minSilenceDurationMs: 100,
              maxSpeechDurationS: 15,
              speechPadMs: 30,
              samplesOverlap: 0.1,
            },
            autoSliceOnSpeechEnd: true,
            autoSliceThreshold: 0.5,
            transcribeOptions: {
              language: 'en',
              maxLen: 1,
            },
          },
          {
            onTranscribe: handleTranscribeEvent,
            onVad: handleVadEvent,
            onError: handleError,
            onStatusChange: handleStatusChange,
          },
        );

        realtimeTranscriberRef.current = transcriber;

        await realtimeTranscriberRef.current.start();
      }
    } catch (error) {
      console.log('error ss', error);
    }
  };

  const extractJsonFromResponse = (response: string): ResponseData => {
    try {
      const firstBraceIndex = response.indexOf('{');
      if (firstBraceIndex === -1) {
        return { text: response };
      }

      const lastBraceIndex = response.lastIndexOf('}');
      if (lastBraceIndex === -1) {
        return { text: response };
      }

      const jsonString = response.substring(firstBraceIndex, lastBraceIndex + 1);
      const parsedJson = JSON.parse(jsonString) as ResponseData;
      return parsedJson;
    } catch (error) {
      console.error('Failed to parse JSON from response:', error);
      console.error('Attempted to parse:', response);
      return { text: response };
    }
  };

  function addMessage(text: string, isUser: boolean, component?: ComponentData) {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
      component,
    };

    setChatHistory(prev => {
      const updatedHistory = [...prev, newMessage];

      if (!component && !text.includes('navigate')) {
        const geminiMessage: GeminiHistoryMessage = {
          role: isUser ? 'user' : 'model',
          parts: [{ text }],
        };
        setGeminiHistory(prevGemini => {
          const updatedGeminiHistory = [...prevGemini, geminiMessage];
          chatStorage.saveHistory(updatedGeminiHistory);
          return updatedGeminiHistory;
        });
      }

      return updatedHistory;
    });
  };

  async function handleSendMessage(message?: string) {
    if (!userInput.trim() && !message && !imageBase64) {
      Alert.alert('Error', 'Please enter a message first!');
      return;
    }

    const userMessage = message ?? userInput.trim();
    setUserInput('');
    addMessage(userMessage, true);
    setIsLoading(true);

    try {
      const chat = model.startChat({ history: geminiHistory });

      const requestParts: Array<string | Part> = imageBase64 && imageMime
        ? [
            { text: userMessage },
            { inlineData: { mimeType: imageMime, data: imageBase64 } },
          ]
        : [userMessage];

      let result = await chat.sendMessage(requestParts);
      let functionCalls = result.response.functionCalls() ?? [];
      const functionCallResults: Array<Part> = [];

      while (functionCalls.length > 0) {
        for (const call of functionCalls) {
          const name = call.name as keyof typeof tools;
          const toolFunction = tools[name];
          if (toolFunction) {
            const functionResult = await toolFunction(call.args);
            functionCallResults.push({
              functionResponse: {
                name: call.name,
                response: {
                  result: functionResult,
                },
              },
            });
          } else {
            console.warn(`Tool ${call.name} not found`);
          }
        }

        if (functionCallResults.length > 0) {
          result = await chat.sendMessage(functionCallResults);
          functionCalls = result.response.functionCalls() ?? [];
        }
      }

      try {
        const responseText = result.response.text();
        const responseData = extractJsonFromResponse(responseText);

        if (responseData.text) {
          addMessage(responseData.text, false);
        }

        if (responseData.navigation) {
          addMessage(`Navigate to: ${responseData.navigation}`, false);
        }

        if (responseData.component?.name) {
          addMessage('Component rendered', false, responseData.component);
        }

        setImageBase64(null);
        setImageMime(null);
        setCurrentTranscription('');
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        addMessage(result.response.text(), false);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      addMessage('Sorry, I encountered an error. Please try again.', false);
    } finally {
      setIsLoading(false);
    }
  };

  function handleVadEvent(vadEvent: RealtimeVadEvent) {
    try {
      if (vadEvent.type === 'silence' && vadEvent.duration > 3) {
        handleSendVoiceMsg();
      }
    } catch (error) {
      console.log('handleVadEvent error', error);
    }
  };

  const renderComponent = (componentData?: ComponentData): React.ReactElement | null => {
    if (!componentData) {
      return null;
    }

    const Component = componentRegistry[componentData.name];

    if (!Component) {
      return null;
    }

    return (
      <View style={styles.messageComponentContainer}>
        <Component {...componentData.props} />
      </View>
    );
  };

  const handleImageUpload = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });

    const {assets} = result;
    const [firstAsset] = assets ?? [];

    if (firstAsset?.base64) {
      setImageBase64(firstAsset.base64);
      setImageMime(firstAsset.type ?? 'image/jpeg');
    }
  };

  const renderMessage = (message: ChatMessage, index: number): React.ReactElement => {
    const isNavigationMessage = message?.text?.includes('Navigate to:');

    if (message.component) {
      return (
        <View key={message.id || index}>
          {renderComponent(message.component)}
        </View>
      );
    }

    return (
      <View
        key={message.id || index}
        style={[
          styles.messageContainer,
          message.isUser ? styles.userMessage : styles.assistantMessage,
        ]}
      >
        <View style={[
          styles.messageBubble,
          message.isUser ? styles.userBubble : styles.assistantBubble,
        ]}>
          {message.isUser ? (
            <Text style={[styles.messageText, styles.userText]}>
              {message.text}
            </Text>
          ) : isNavigationMessage ? (
            <TouchableOpacity
              onPress={() => {
                const navigationText = message.text.replace('Navigate to: ', '');
                if (navigationText.toLowerCase().includes('settings')) {
                  navigation.navigate('Settings');
                  handleClose();
                } else if (navigationText.toLowerCase().includes('profile')) {
                  handleClose();
                  navigation.navigate('Profile');
                } else if (navigationText.toLowerCase().includes('dashboard')) {
                  handleClose();
                  navigation.navigate('Dashboard');
                }
              }}
            >
              <Text style={[styles.messageText, styles.assistantText, styles.navigationText]}>
                {message.text}
              </Text>
            </TouchableOpacity>
          ) : (
            // <Text style={styles.bubbleMessaheText}>
              <Markdown style={markdownStyles}>
              {message.text}
            </Markdown>
            // </Text>
          )}
        </View>
      </View>
    );
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible
      animationType="slide"
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.popupContainer,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [Dimensions.get('window').height, 0],
                  }),
                },
                {
                  scale: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
              opacity: slideAnim,
            },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerText}>Chat</Text>
              <TouchableOpacity style={styles.headerButton} onPress={handleClose}>
                <Icon name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <>
            <ScrollView
              ref={scrollViewRef}
              style={styles.chatContainer}
              contentContainerStyle={styles.chatContent}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
              {chatHistory.length === 0 ? (
                <View style={styles.welcomeContainer}>
                  <Text style={styles.welcomeText}>Welcome! I’m Zaina, your AI assistant. How can I help you today?</Text>
                </View>
              ) : (
                chatHistory.map(renderMessage)
              )}

              {isTranscribing && currentTranscription && (
                <View style={[styles.messageContainer, styles.userMessage]}>
                  <View style={[styles.messageBubble, styles.userBubble]}>
                    <Text style={[styles.messageText, styles.userText]}>
                      {currentTranscription}
                    </Text>
                  </View>
                </View>
              )}

              {isLoading && (
                <View style={[styles.messageContainer, styles.assistantMessage]}>
                  <LoadingDots
                    dots={4}
                    colors={['#FFF', '#cdccccff', '#cdcdd2ff', '#ABABB0']}
                    size={6}
                    animationType="spring"
                    animationOptions={{ tension: 150, friction: 7 }}
                  />
                </View>
              )}
            </ScrollView>
            <View style={styles.inputContainer}>
              <View style={styles.textInputContainer}>
                <Icon name="auto-awesome" size={20} color="#ABABB0" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Type your message..."
                  value={userInput}
                  onChangeText={setUserInput}
                  editable={!isLoading}
                  placeholderTextColor={'#ABABB0'}
                />
              </View>
              {!!imageBase64 && (
                <View style={styles.imagePreviewContainer}>
                  <Icon name="image" size={16} color="#ABABB0" />
                  <Text style={styles.imagePreviewText}>Image attached</Text>
                  <Pressable
                    onPress={() => { setImageBase64(null); setImageMime(null); }}
                    style={styles.imageRemoveBtn}
                    accessibilityLabel="Remove attached image"
                  >
                    <Icon name="close" size={14} color="#ABABB0" />
                  </Pressable>
                </View>
              )}
              <View style={styles.actionsContainer}>
                <Pressable
                  style={[
                    styles.sendButton,
                  ]}
                  onPress={handleImageUpload}
                  disabled={!!imageBase64}
                >
                  <Icon name="crop-original" size={20} color="#ABABB0" />
                </Pressable>
                <Pressable
                  style={[
                    styles.sendButton,
                  ]}
                  onPress={startRealtimeTranscription}
                >
                  <Icon name="mic" size={20} color={isTranscribing ? '#f00' : '#ABABB0'} />
                </Pressable>
                <Pressable
                  style={[
                    styles.sendButton,
                  ]}
                  onPress={() => {
                    handleSendMessage();
                  }}
                  disabled={isLoading || (!userInput.trim() && !imageBase64)}
                >
                  <Icon name="send" size={20} color="#ABABB0" />
                </Pressable>
              </View>
            </View>
          </>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ChatPopup;
