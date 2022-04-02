import React, { useState } from 'react';
import {
  Alert,
  Image,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { Button } from '../basicComponents';
import NewShowModal from './Modals/NewShowModal';
import styles from '../../styles/appBodyHeader';

export default function AppBodyHeader() {
  const [addShowModalVisibility, setAddShowModalVisibility] = useState(false);

  return (
    <View
      style={[styles.row, styles.alignCenter, styles.justifySpaceBetween]}>
      <Button onPress={() => setAddShowModalVisibility(true)}>
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
    style={styles.searchInputContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search shows"
      placeholderTextColor="#999"
    />
    {/* I had to use another view to make the padding with the image */}
    <View style={styles.searchIconContainer}>
      <Image
        style={styles.icon}
        source={require('../../assets/images/search.png')}
      />
    </View>
  </View>
);

const FilterButton = () => (
  <TouchableHighlight
    style={styles.filter}
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
      style={styles.icon}
      source={require('../../assets/images/filter.png')}
    />
  </TouchableHighlight>
);
