import { observer } from 'mobx-react';
import React, { useState, useContext } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';
import { Button } from '../basicComponents';
import NewCollectionModal from './Modals/NewCollectionModal';
import styles from '../../styles/collections';

import { StoreContext } from '../../App';

function Collections() {
  const { collectionStore } = useContext(StoreContext);

  const [addCollectionModalVisibility, setAddCollectionModalVisibility] =
    useState(false);

  return (
    <View
      style={[styles.row, styles.alignCenter , { marginTop: 15 }]}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}>
        {collectionStore.collections &&
          collectionStore.collections.map(
            ({collection_id, collection_name}) => (
              <Collection
                key={collection_id}
                collection_id={collection_id}
                selectedCollectionId={collectionStore.selectedCollectionId}
                setSelectedCollectionId={id =>
                  collectionStore.setSelectedCollectionId(id)
                }>
                {collection_name}
              </Collection>
            ),
          )}
      </ScrollView>

      <Button
        rounded={true}
        buttonStyle={{marginLeft: 10, width: 32}}
        onPress={() => setAddCollectionModalVisibility(true)}>
        +
      </Button>

      <NewCollectionModal
        setAddCollectionModalVisibility={setAddCollectionModalVisibility}
        visible={addCollectionModalVisibility}
        animationType="fade"
      />
    </View>
  );
}

export default observer(Collections);

const Collection = ({
  children,
  collection_id,
  selectedCollectionId,
  setSelectedCollectionId,
}) => (
  <Pressable onPress={() => setSelectedCollectionId(collection_id)}>
    <Text
      style={[
        styles.collectionText,
        collection_id === selectedCollectionId ? styles.selected : {},
      ]}>
      {children}
    </Text>
  </Pressable>
);
