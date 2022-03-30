import React, { useState } from 'react';
import {
  Alert,
  Image, TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { Button } from '../basicComponents';
import NewShowModal from './Modals/NewShowModal';

export default function AppBodyHeader() {
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
        setAddShowModalVisibility={setAddShowModalVisibility}
        visible={addShowModalVisibility}
        animationType="fade"
      />

      <SearchInput />

      <FilterButton />
    </View>
  );
}

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
