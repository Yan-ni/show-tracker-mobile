import React, { useState, useContext } from 'react';
import { ActivityIndicator, Text, View } from 'react-native'; 
import { Button, Modal, TextInputGroupe } from '../../basicComponents';
import styles from '../../../styles/newShowModal';

import { StoreContext } from '../../../App';

export default function NewShowModal({
  setAddShowModalVisibility,
  ...props
}) {
  const { collectionStore } = useContext(StoreContext);

  const [isLoading, setIsLoading] = useState(false);
  const [showName, setShowName] = useState('');
  const [showDescription, setShowDescription] = useState('');

  const [showNameErrorMessage, setShowNameErrorMessage] = useState(null);

  const [seasonsWatched, setSeasonsWatched] = useState('0');
  const [episodesWatched, setEpisodesWatched] = useState('0');

  return (
    <Modal {...props}>
      {isLoading ? (
        <View style={[styles.center, { flex: 1 }]}>
          <ActivityIndicator size="large" color="#2745F2" />
        </View>
      ) : (
        <>
          <Text
            style={[styles.h1, { color: '#1B78F2', textAlign: 'center' }]}>
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
            style={[styles.row, styles.alignCenter, styles.justifySpaceAround, { marginTop: 20 }]}>
            <View style={styles.alignCenter}>
              <Text
                style={[styles.text, {
                  fontFamily: 'Poppins-SemiBold',
                  marginBottom: 10,
                }]}>
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

            <View style={styles.alignCenter}>
              <Text
                style={[styles.label, {
                  fontFamily: 'Poppins-SemiBold',
                  marginBottom: 10,
                }]}>
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

          <View style={styles.buttonsContainer}>
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
                      setSeasonsWatched('0');
                      setEpisodesWatched('0');
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
