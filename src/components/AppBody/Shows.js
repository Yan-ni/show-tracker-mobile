import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import collectionStore from '../../stores/collectionStore';
import Button from '../Button';
import RoundedButton from '../RoundedButton';

function Shows({collectionStore}) {
  return (
    <ScrollView
      style={{
        flex: 1,
        display: 'flex',
      }}>
      {collectionStore.displayedShows &&
      collectionStore.displayedShows.length ? (
        collectionStore.displayedShows.map(
          ({
            show_name,
            show_description,
            seasons_watched,
            episodes_watched,
            show_id,
          }) => (
            <Show
              showName={show_name}
              showDescription={show_description}
              seasonsWatched={seasons_watched}
              episodesWatched={episodes_watched}
              showId={show_id}
              key={show_id}
            />
          ),
        )
      ) : (
        <Text
          style={{
            fontFamily: 'Popping-Medium',
            fontSize: 30,
            color: '#999',
            paddingVertical: 50,
            textAlign: 'center',
          }}>
          Empty Collection
        </Text>
      )}

      <CollectionOptions collectionStore={collectionStore} />
    </ScrollView>
  );
}

export default observer(Shows);

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: '#c4c4c4',
    height: 5,
    width: 5,
    marginHorizontal: 2,
  },
  completeButton: {
    backgroundColor: '#808080',
  },
  uncompleteButton: {
    backgroundColor: '#15A901',
  },
});

const Show = ({
  showName,
  showDescription,
  seasonsWatched,
  episodesWatched,
  showId,
  completed,
  favorite,
}) => {
  const [counterSeasonsWatched, setCounterSeasonsWatched] =
    useState(seasonsWatched);
  const [counterEpisodesWatched, setCounterEpisodesWatched] =
    useState(episodesWatched);

  useEffect(() => {
    collectionStore.updateShow({
      showId,
      showName,
      showDescription,
      seasonsWatched: counterSeasonsWatched,
      episodesWatched: counterEpisodesWatched,
    });
  }, [counterSeasonsWatched, counterEpisodesWatched]);

  const trimToMaxLength = (text, maxLength) => {
    if (!text) return '';

    return text.length >= maxLength
      ? `${text.slice(0, maxLength - 3)}...`
      : text;
  };

  return (
    <View
      style={{
        backgroundColor: '#F2F2F2',
        borderRadius: 5,
        padding: 10,
        marginTop: 15,
      }}>
      <View style={styles.row}>
        <Text
          style={{
            flex: 1,
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
            color: '#252525',
            paddingTop: 4,
          }}>
          {trimToMaxLength(showName, 23)}
        </Text>
        <ThreeDots />
      </View>

      {/* descreption and show counters */}
      <View style={styles.row}>
        <Text
          style={{
            flex: 2,
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            color: '#252525',
            paddingRight: 4,
            textAlign: 'justify',
          }}>
          {trimToMaxLength(showDescription, 100)}
        </Text>

        <View
          style={{
            flex: 3,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Counter title="season" setCounter={setCounterSeasonsWatched}>
            {counterSeasonsWatched}
          </Counter>
          <Counter title="episode" setCounter={setCounterEpisodesWatched}>
            {counterEpisodesWatched}
          </Counter>
        </View>
      </View>

      {/* complete status with mark as complete button */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: '#1ACB02',
            fontSize: 14,
          }}>
          {completed ? 'Completed' : ''}
        </Text>
        <Button
          textStyle={{
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
          }}
          buttonStyle={[
            {
              borderRadius: 20,
              paddingTop: 5,
              paddingVertical: 5,
              paddingHorizontal: 10,
            },
            completed ? styles.completeButton : styles.uncompleteButton,
          ]}
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
          }}>{`mark as ${completed ? 'un' : ''}complete`}</Button>
      </View>
    </View>
  );
};

const Counter = ({children, title, style, disabled, setCounter}) => (
  <View
    style={{
      display: 'flex',
      alignItems: 'center',
    }}>
    <Text
      style={[
        {
          fontFamily: 'Poppins-Medium',
          fontSize: 18,
          color: '#000',
          paddingHorizontal: 5,
        },
        style,
      ]}>
      {title}
    </Text>
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {disabled || (
        <RoundedButton
          buttonStyle={{
            width: 25,
            height: 25,
          }}
          textStyle={{
            fontSize: 16,
          }}
          onPress={() => setCounter(`${parseInt(children) - 1}`)}>
          -
        </RoundedButton>
      )}

      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          fontSize: 14,
          color: '#000',
          paddingHorizontal: 0,
          flex: 1,
          textAlign: 'center',
        }}>
        {children}
      </Text>

      {disabled || (
        <RoundedButton
          buttonStyle={{
            width: 25,
            height: 25,
          }}
          textStyle={{
            fontSize: 16,
          }}
          onPress={() => setCounter(`${parseInt(children) + 1}`)}>
          +
        </RoundedButton>
      )}
    </View>
  </View>
);

//ToDo: rename the component
const ThreeDots = () => (
  <View style={styles.row}>
    <View style={styles.dot}></View>
    <View style={styles.dot}></View>
    <View style={styles.dot}></View>
  </View>
);

const CollectionOptions = ({collectionStore}) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    }}>
    <Button
      buttonStyle={{
        borderRadius: 20,
        backgroundColor: '#2745F2',
        marginRight: 15,
      }}
      textStyle={{
        fontSize: 12,
      }}
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
      Edit collection
    </Button>
    <Button
      buttonStyle={{borderRadius: 20, backgroundColor: '#A10909'}}
      textStyle={{
        fontSize: 12,
      }}
      onPress={() => collectionStore.deleteCollection()}>
      delete collection
    </Button>
  </View>
);
