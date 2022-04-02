import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppBody from '../components/AppBody';
import AppHead from '../components/AppHead';
import styles from '../styles/appScreen';

function AppScreen() {
  return (
    <View style={styles.mainView}>
      <AppHead />
      <AppBody />
    </View>
  );
}

export default observer(AppScreen);
