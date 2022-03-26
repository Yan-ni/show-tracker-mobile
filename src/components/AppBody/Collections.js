import { observer } from 'mobx-react';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from '../Button';
import Modal from '../Modal';
import RoundedButton from '../RoundedButton';
import TextInputGroupe from '../TextInputGroupe';

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

      <RoundedButton
        buttonStyle={{marginLeft: 10}}
        onPress={() => setAddCollectionModalVisibility(true)}>
        +
      </RoundedButton>

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

const NewCollectionModal = ({
  collectionStore,
  setAddCollectionModalVisibility,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [collectionName, setCollectionName] = useState(null);
  const [collectionNameErrorMessage, setCollectionNameErrorMessage] =
    useState(null);

  return (
    <Modal {...props}>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2745F2" />
        </View>
      ) : (
        <>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 24,
              color: '#1B78F2',
              textAlign: 'center',
            }}>
            New collection
          </Text>

          <TextInputGroupe
            placeholder="Name"
            style={{marginTop: 20}}
            errorMessage={collectionNameErrorMessage}
            onChangeText={text => {
              setCollectionName(text);
              setCollectionNameErrorMessage(null);
            }}>
            Collection name
          </TextInputGroupe>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: 30,
            }}>
            <Button
              buttonStyle={{
                backgroundColor: '#EBEBEB',
                marginRight: 20,
              }}
              textStyle={{
                color: '#212121',
              }}
              onPress={() => setAddCollectionModalVisibility(false)}>
              Cancel
            </Button>

            <Button
              buttonStyle={{
                backgroundColor: '#1B78F2',
              }}
              onPress={() => {
                setIsLoading(true);
                collectionStore
                  .addCollection(
                    {
                      collection_name: collectionName,
                    },
                    setCollectionNameErrorMessage,
                  )
                  .then(res => {
                    if (!res || res.name !== 'Error') {
                      setAddCollectionModalVisibility(false);
                      setCollectionName('');
                    }
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              }}>
              Add
            </Button>
          </View>
        </>
      )}
    </Modal>
  );
};

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
