import { observer } from 'mobx-react';
import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Collections from './Collections';
import AppBodyHeader from './Header';
import Shows from './Shows';
import styles from '../../styles/appBody';

import { StoreContext } from '../../App';

function AppBody() {
  const { collectionStore } = useContext(StoreContext);

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    collectionStore.syncCollections().then(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <View style={[styles.center, { flex: 1 }]}>
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

const Hr = () => <View style={styles.hr} />;