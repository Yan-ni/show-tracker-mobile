import { observer } from 'mobx-react';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button } from '../basicComponents';
import NewCollectionModal from './Modals/NewCollectionModal';

function Collections({collectionStore}) {
  const [addCollectionModalVisibility, setAddCollectionModalVisibility] =
    useState(false);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
      }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
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
        collectionStore={collectionStore}
        setAddCollectionModalVisibility={setAddCollectionModalVisibility}
        visible={addCollectionModalVisibility}
        animationType="fade"
      />
    </View>
  );
}

export default observer(Collections);

const styles = StyleSheet.create({
  test: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    paddingBottom: 10,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  selected: {
    borderBottomWidth: 3,
    borderBottomColor: '#2745F2',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

const Collection = ({
  children,
  collection_id,
  selectedCollectionId,
  setSelectedCollectionId,
}) => (
  <Pressable onPress={() => setSelectedCollectionId(collection_id)}>
    <Text
      style={[
        styles.test,
        collection_id === selectedCollectionId ? styles.selected : {},
      ]}>
      {children}
    </Text>
  </Pressable>
);
