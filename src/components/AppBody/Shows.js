import { observer } from 'mobx-react';
import React, { useEffect, useState, useContext } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import collectionStore from '../../stores/collectionStore';
import { Button } from '../basicComponents';
import styles from '../../styles/shows';

import { StoreContext } from '../../App';

function Shows() {
  const { collectionStore } = useContext(StoreContext);

  return (
    <ScrollView style={{ flex: 1 }}>
      {collectionStore.displayedShows &&
      collectionStore.displayedShows.length ? (
        collectionStore.displayedShows
        .filter(({show_name}) => {
          const textMatch = show_name.toLowerCase().match(collectionStore.searchInputText.toLowerCase());
          return (textMatch && textMatch.length);
        })
        .map(
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
        <Text style={styles.emptyCollectionText}>
          Empty Collection
        </Text>
      )}

      <CollectionOptions />
    </ScrollView>
  );
}

export default observer(Shows);

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
      style={styles.showCard}>
      <View style={[styles.row, styles.alignCenter]}>
        <Text style={styles.showName}>
          {trimToMaxLength(showName, 23)}
        </Text>
        <ThreeDots />
      </View>

      {/* descreption and show counters */}
      <View style={[styles.row, styles.alignCenter]}>
        <Text style={styles.showDescription}>
          {trimToMaxLength(showDescription, 100)}
        </Text>

        <View style={styles.countersContainer}>
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
        style={[styles.row, styles.alignCenter, styles.justifySpaceBetween, { marginTop: 15 }]}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: '#1ACB02',
            fontSize: 14,
          }}>
          {completed ? 'Completed' : ''}
        </Text>
        <Button
          textStyle={{ fontSize: 12 }}
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
    style={styles.alignCenter}>
    <Text style={[styles.text, { paddingHorizontal: 5 }, style]}>
      {title}
    </Text>
    <View
      style={[styles.row, styles.alignCenter]}>
      {disabled || (
        <Button
          rounded={true}
          textStyle={{
            fontSize: 16,
          }}
          onPress={() => setCounter(`${parseInt(children) - 1}`)}>
          -
        </Button>
      )}

      <Text
        style={styles.counterText}>
        {children}
      </Text>

      {disabled || (
        <Button
          rounded={true}
          textStyle={{
            fontSize: 16,
          }}
          onPress={() => setCounter(`${parseInt(children) + 1}`)}>
          +
        </Button>
      )}
    </View>
  </View>
);

//ToDo: rename the component
const ThreeDots = () => (
  <View style={[styles.row, styles.alignCenter]}>
    <View style={styles.dot}></View>
    <View style={styles.dot}></View>
    <View style={styles.dot}></View>
  </View>
);

const CollectionOptions = () => {
  const { collectionStore } = useContext(StoreContext);

  return (
    <View
      style={[styles.row, styles.center, { marginVertical: 20 }]}>
      <Button
        buttonStyle={{
          borderRadius: 20,
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
        onPress={() => {
          Alert.alert(
            'Warning',
            'are you sure you want to delete this collection ?',
            [
              {
                text: 'no',
              },
              {
                text: 'yes',
                onPress: () => collectionStore.deleteCollection(),
              },
            ],
            {
              cancelable: true,
            },
          );
        }}>
        delete collection
      </Button>
    </View>
  );
}
