import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Button, TextInputGroupe, Modal } from '../../basicComponents';

export default function NewCollectionModal({
  collectionStore,
  setAddCollectionModalVisibility,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collectionNameErrorMessage, setCollectionNameErrorMessage] = useState(null);

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
            defaultValue={collectionName}
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
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});