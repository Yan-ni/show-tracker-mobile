import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppBody from '../components/AppBody';
import AppHead from '../components/AppHead';

function AppScreen() {
  return (
    <View style={styles.mainView}>
      <AppHead />
      <AppBody />
    </View>
  );
}

export default observer(AppScreen);

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});
