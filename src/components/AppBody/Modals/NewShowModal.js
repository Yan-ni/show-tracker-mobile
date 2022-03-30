import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'; 
import { Button, Modal, TextInputGroupe } from '../../basicComponents';

export default function NewShowModal({
  setAddShowModalVisibility,
  collectionStore,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showName, setShowName] = useState('');
  const [showDescription, setShowDescription] = useState('');

  const [showNameErrorMessage, setShowNameErrorMessage] = useState(null);

  const [seasonsWatched, setSeasonsWatched] = useState('0');
  const [episodesWatched, setEpisodesWatched] = useState('0');

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
            New show
          </Text>

          <TextInputGroupe
            placeholder="Name"
            style={{marginTop: 20}}
            errorMessage={showNameErrorMessage}
            defaultValue={showName}
            onChangeText={text => {
              setShowName(text);
              setShowNameErrorMessage(null);
            }}>
            Show name
          </TextInputGroupe>

          <TextInputGroupe
            multiline
            numberOfLines={4}
            placeholder="show's synopsis"
            textAlignVertical="top"
            style={{marginTop: 20}}
            defaultValue={showDescription}
            onChangeText={text => setShowDescription(text)}>
            Show Descreption
          </TextInputGroupe>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginTop: 20,
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                  color: '#333',
                  marginBottom: 10,
                }}>
                seasons watched
              </Text>
              <TextInputGroupe
                textAlign="center"
                keyboardType="numeric"
                TextInputStyle={{padding: 5, paddingBottom: 2}}
                defaultValue={seasonsWatched}
                selectTextOnFocus
                onChangeText={text => setSeasonsWatched(text)}
              />
            </View>

            <View
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                  color: '#333',
                  marginBottom: 10,
                }}>
                episodes watched
              </Text>
              <TextInputGroupe
                textAlign="center"
                keyboardType="numeric"
                TextInputStyle={{padding: 5, paddingBottom: 2}}
                defaultValue={episodesWatched}
                selectTextOnFocus
                onChangeText={text => setEpisodesWatched(text)}
              />
            </View>
          </View>

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
              onPress={() => setAddShowModalVisibility(false)}>
              Cancel
            </Button>

            <Button
              buttonStyle={{
                backgroundColor: '#1B78F2',
              }}
              onPress={() => {
                setIsLoading(true);
                collectionStore
                  .addShow(
                    {
                      collection_id: collectionStore.selectedCollectionId,
                      show_name: showName,
                      show_description: showDescription,
                      seasons_watched: seasonsWatched,
                      episodes_watched: episodesWatched,
                    },
                    setShowNameErrorMessage,
                  )
                  .then(res => {
                    if (!res || res.name !== 'Error') {
                      setAddShowModalVisibility(false);
                      setShowName('');
                      setShowDescription('');
                      setSeasonsWatched(0);
                      setEpisodesWatched(0);
                    }
                  })
                  .finally(() => setIsLoading(false));
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});