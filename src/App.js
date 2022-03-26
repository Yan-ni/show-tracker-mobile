import { useFonts } from 'expo-font';
import { observer } from 'mobx-react';
import React from 'react';
import { StatusBar } from 'react-native';
import AppScreen from './Screens/AppScreen';
import LoginScreen from './Screens/LoginScreen';
import connectionStore from './stores/conncetionStore';

function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  return (
    <>
      <StatusBar backgroundColor="#ffffff00" barStyle="dark-content" />
      {fontsLoaded &&
        (connectionStore.isConnected ? (
          <AppScreen connectionStore={connectionStore} />
        ) : (
          <LoginScreen connectionStore={connectionStore} />
        ))}
    </>
  );
}

export default observer(App);
