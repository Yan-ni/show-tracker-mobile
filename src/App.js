import { observer } from 'mobx-react';
import React from 'react';
import AppScreen from './Screens/AppScreen';
import LoginScreen from './Screens/LoginScreen';
import connectionStore from './stores/conncetionStore';

function App() {
  return connectionStore.isConnected ? (
    <AppScreen connectionStore={connectionStore} />
  ) : (
    <LoginScreen connectionStore={connectionStore} />
  );
}

export default observer(App);
