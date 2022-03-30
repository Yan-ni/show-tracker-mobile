import { observer } from 'mobx-react';
import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Collections from './Collections';
import AppBodyHeader from './Header';
import Shows from './Shows';

import { StoreContext } from '../../App';

function AppBody() {
  const { collectionStore } = useContext(StoreContext);

  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    collectionStore.syncCollections().then(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2745F2" />
      </View>
    );
  else
    return (
      <View style={styles.appBodyView}>
        <AppBodyHeader />
        <Collections />
        <Hr />
        <Shows />
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
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
