import * as Font from 'expo-font';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import AppScreen from './Screens/AppScreen';
import LoginScreen from './Screens/LoginScreen';
import connectionStore from './stores/conncetionStore';

function App () {
  async function loadFonts() {
    await Font.loadAsync({
      "Poppins-Bold": require('./assets/fonts/Poppins-Bold.ttf'),
      "Poppins-Italic": require('./assets/fonts/Poppins-Italic.ttf'),
      "Poppins-Medium": require('./assets/fonts/Poppins-Medium.ttf'),
      "Poppins-Regular": require('./assets/fonts/Poppins-Regular.ttf'),
      "Poppins-SemiBold": require('./assets/fonts/Poppins-SemiBold.ttf'),
    });
  }

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);
  
  return fontsLoaded && (connectionStore.isConnected ? (
    <AppScreen connectionStore={connectionStore} />
  ) : (
    <LoginScreen connectionStore={connectionStore} />
  ));
}

export default observer(App);
