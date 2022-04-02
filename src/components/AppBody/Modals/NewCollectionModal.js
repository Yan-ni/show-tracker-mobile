import React, { useState, useContext } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Button, TextInputGroupe, Modal } from '../../basicComponents';
import styles from '../../../styles/newCollectionModal';

import { StoreContext } from '../../../App';

export default function NewCollectionModal({
  setAddCollectionModalVisibility,
  ...props
}) {
  const { collectionStore } = useContext(StoreContext);
  
  const [isLoading, setIsLoading] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collectionNameErrorMessage, setCollectionNameErrorMessage] = useState(null);

  return (
    <Modal {...props}>
      {isLoading ? (
        <View style={[styles.center, { flex: 1 }]}>
          <ActivityIndicator size="large" color="#2745F2" />
        </View>
      ) : (
        <>
          <Text
            style={[styles.h1, {
              color: '#1B78F2',
              textAlign: 'center',
            }]}>
            New collection
          </Text>

          <TextInputGroupe
            placeholder="Name"
            style={{marginTop: 20}}
            errorMessage={collectionNameErrorMessage}
            defaultValue={collectionName}
            onChangeText={text => {
              setCollectionName(text);
              setCollectionNameErrorMessage(null);
            }}>
            Collection name
          </TextInputGroupe>

          <View
            style={styles.buttonsContainer}>
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
}