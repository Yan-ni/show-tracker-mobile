import React, { useState } from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import Button from '../Button';
import Modal from '../Modal';
import TextInputGroupe from '../TextInputGroupe';

export default function AppBodyHeader({collectionStore}) {
  const [addShowModalVisibility, setAddShowModalVisibility] = useState(false);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Button
        buttonStyle={{
          backgroundColor: '#2745F2',
        }}
        onPress={() => setAddShowModalVisibility(true)}>
        + Add show
      </Button>

      <NewShowModal
        collectionStore={collectionStore}
        setAddShowModalVisibility={setAddShowModalVisibility}
        visible={addShowModalVisibility}
        animationType="fade"
      />

      <SearchInput />

      <FilterButton />
    </View>
  );
}

const NewShowModal = ({
  setAddShowModalVisibility,
  collectionStore,
  ...props
}) => {
  const [showName, setShowName] = useState('');
  const [showDescription, setShowDescription] = useState('');

  const [showNameErrorMessage, setShowNameErrorMessage] = useState(null);

  const [seasonsWatched, setSeasonsWatched] = useState('0');
  const [episodesWatched, setEpisodesWatched] = useState('0');

  return (
    <Modal {...props}>
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
            value={seasonsWatched}
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
            value={episodesWatched}
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
          onPress={() =>
            collectionStore.addShow(
              {
                collection_id: collectionStore.selectedCollectionId,
                show_name: showName,
                show_description: showDescription,
                seasons_watched: seasonsWatched,
                episodes_watched: episodesWatched,
              },
              setShowNameErrorMessage,
              setAddShowModalVisibility,
            )
          }>
          Add
        </Button>
      </View>
    </Modal>
  );
};

const SearchInput = () => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: 5,
      elevation: 3,
    }}>
    <TextInput
      style={{
        backgroundColor: '#f5f5f5',
        color: '#000',
        paddingHorizontal: 10,
        height: 40,
        width: 110,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
      }}
      placeholder="Search shows"
      placeholderTextColor="#999"
    />
    {/* I had to use another view to make the padding with the image */}
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        height: 40,
        paddingRight: 15,
        paddingLeft: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      }}>
      <Image
        style={{
          width: 20,
          height: 20,
        }}
        source={require('../../assets/images/search.png')}
      />
    </View>
  </View>
);

const FilterButton = () => (
  <TouchableHighlight
    style={{
      backgroundColor: '#f5f5f5',
      width: 40,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
    }}
    underlayColor="#eee"
    onPress={() => {
      Alert.alert(
        'Error',
        "the app is still in developpement and this feature isn't available yet.\n\nPlease stay up to date with the latest version.",
        [
          {
            text: 'ok',
          },
        ],
        {
          cancelable: true,
        },
      );
    }}>
    <Image
      style={{height: 20, width: 20}}
      source={require('../../assets/images/filter.png')}
    />
  </TouchableHighlight>
);
