import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Header({connectionStore}) {
  return (
    <View style={styles.headerView}>
      <Text style={styles.appNameText}>Show Tracker</Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
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
            style={{
              width: 22,
              height: 22,
              marginRight: 18,
            }}
            source={require('../assets/images/settings.png')}
          />
        </Pressable>

        <Pressable onPress={() => connectionStore.disconnect()}>
          <Image
            style={{
              width: 22,
              height: 22,
            }}
            source={require('../assets/images/logout.png')}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    marginVertical: 20,
    elevation: 5,
  },
  appNameText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#121A5B',
  },
});
