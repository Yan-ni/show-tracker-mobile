import React, { useState, useContext } from 'react';
import {
  Alert,
  Appearance,
  Image,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { Button } from '../basicComponents';
import NewShowModal from './Modals/NewShowModal';
import styles from '../../styles/appBodyHeader';
import { StoreContext } from '../../App';

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

const SearchInput = () => {
  const { collectionStore } = useContext(StoreContext);
  
  const colorScheme = Appearance.getColorScheme();

  return (
    <View
      style={styles.searchInputContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search shows"
        placeholderTextColor="#BFBFBF"
        onChangeText={text => collectionStore.setSearchInputText(text)}
      />
      {/* I had to use another view to make the padding with the image */}
      <View style={styles.searchIconContainer}>
        <Image
          style={styles.icon}
          source={colorScheme === 'dark' ? 
            require('../../assets/images/darkTheme/search.png') : 
            require('../../assets/images/lightTheme/search.png')
        }/>
      </View>
    </View>
  );
}

const FilterButton = () => {
  const colorScheme = Appearance.getColorScheme();

  return (
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
        source={colorScheme === 'dark' ? 
          require('../../assets/images/darkTheme/filter.png') : 
          require('../../assets/images/lightTheme/filter.png')
        }/>
    </TouchableHighlight>
  );
}