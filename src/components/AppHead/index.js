import React, { useContext } from 'react';
import { Alert, Appearance, Image, Pressable, Text, View } from 'react-native';
import styles from '../../styles/appHead';

import { StoreContext } from '../../App';

export default function Header() {
  const colorScheme = Appearance.getColorScheme();

  const { connectionStore } = useContext(StoreContext);

  return (
    <View style={styles.headerView}>
      <Text style={styles.appNameText}>Show Tracker</Text>

      <View style={styles.row}>
        <Pressable
          onPress={() =>
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
            )
          }>
          <Image
            style={[styles.icon, { marginRight: 18 }]}
            source={colorScheme === 'dark' ? 
              require('../../assets/images/darkTheme/settings.png') : 
              require('../../assets/images/lightTheme/settings.png')
            }/>
        </Pressable>

        <Pressable
          onPress={() => {
            Alert.alert(
              'Warning',
              'are you sure you want to disconnect ?',
              [
                {
                  text: 'no',
                },
                {
                  text: 'yes',
                  onPress: () => connectionStore.disconnect(),
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
              require('../../assets/images/darkTheme/logout.png') : 
              require('../../assets/images/lightTheme/logout.png')
            }/>
        </Pressable>
      </View>
    </View>
  );
}
