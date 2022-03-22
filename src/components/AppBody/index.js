import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import collectionStore from '../../stores/collectionStore';
import Collections from './Collections';
import AppBodyHeader from './Header';
import Shows from './Shows';

function AppBody() {
  useEffect(() => collectionStore.syncCollections(), []);

  return (
    <View style={styles.appBodyView}>
      <AppBodyHeader collectionStore={collectionStore} />
      <Collections collectionStore={collectionStore} />
      <Hr />
      <Shows collectionStore={collectionStore} />
    </View>
  );
}

export default observer(AppBody);

const styles = StyleSheet.create({
  appBodyView: {
    display: 'flex',
    backgroundColor: '#fff',
    padding: 20,
    elevation: 7,
    width: '90%',
    height: '85%',
    borderRadius: 10,
  },
});

const Hr = () => (
  <View
    style={{
      backgroundColor: '#999',
      marginHorizontal: -20,
      marginVertical: 10,
      height: 1,
    }}
  />
);
