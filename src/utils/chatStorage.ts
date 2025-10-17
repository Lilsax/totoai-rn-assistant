import AsyncStorage from '@react-native-async-storage/async-storage';
import type {ChatHistoryData, GeminiHistoryMessage, ChatMessage} from '../types';

const CHAT_HISTORY_KEY = '@chat_history';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const chatStorage = {
  async saveHistory(history: GeminiHistoryMessage[]): Promise<void> {
    try {
      const data: ChatHistoryData = {
        messages: history,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  },

  async loadHistory(): Promise<GeminiHistoryMessage[]> {
    try {
      const storedData = await AsyncStorage.getItem(CHAT_HISTORY_KEY);
      if (storedData === null) {
        return [];
      }

      const data: ChatHistoryData = JSON.parse(storedData);
      const now = Date.now();
      const isExpired = now - data.timestamp > ONE_DAY_MS;

      if (isExpired) {
        await this.clearHistory();
        return [];
      }

      return data.messages;
    } catch (error) {
      console.error('Error loading chat history:', error);
      return [];
    }
  },

  async clearHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CHAT_HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  },

  convertToGeminiFormat(messages: ChatMessage[]): GeminiHistoryMessage[] {
    return messages
      .filter(msg => !msg.component)
      .map(msg => ({
        role: msg.isUser ? 'user' as const : 'model' as const,
        parts: [{text: msg.text}],
      }));
  },
};
