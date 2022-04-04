import { useFonts } from 'expo-font';
import { observer } from 'mobx-react';
import React, { createContext } from 'react';
import { StatusBar } from 'react-native';
import AppScreen from './Screens/AppScreen';
import LoginScreen from './Screens/LoginScreen';

import connectionStore from './stores/connectionStore';
import collectionStore from './stores/collectionStore';

export const StoreContext = createContext();

function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  return (
    <StoreContext.Provider value={{connectionStore, collectionStore}}>
      <StatusBar backgroundColor="#40404000" barStyle="dark-content" />
      {fontsLoaded &&
        (connectionStore.isConnected ? (
          <AppScreen />
        ) : (
          <LoginScreen />
        ))}
    </StoreContext.Provider>
  );
}

export default observer(App);
