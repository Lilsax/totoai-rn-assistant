import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Platform, PermissionsAndroid} from 'react-native';

function App(): React.JSX.Element {

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Request record audio permission
      // @ts-ignore
      void PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
        title: 'Whisper Audio Permission',
        message: 'Whisper needs access to your microphone',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
    }

  }, []);

  return <AppNavigator />;
}

export default App;
