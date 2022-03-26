import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { BASE_URL } from '../config/constants.config';

//ToDo: rename this store to an more convienient name
class CollectionStore {
  constructor() {
    makeObservable(this, {
      collections: observable,
      setCollections: action,
      selectedCollectionId: observable,
      setSelectedCollectionId: action,
      displayedShows: observable,
      setDisplayedShows: action,
      syncCollections: action,
      addShow: action,
    });
  }

  collections = [];
  selectedCollectionId = null;
  displayedShows = [];

  setDisplayedShows(shows) {
    this.displayedShows = shows;
  }

  setCollections(collections, updateSelectedCollectionId = false) {
    this.collections = collections;
    if (updateSelectedCollectionId)
      this.setSelectedCollectionId(collections[0].collection_id);
    this.setDisplayedShows(this.getSelectedCollectionShows());
  }

  setSelectedCollectionId(id) {
    this.selectedCollectionId = id;
    this.setDisplayedShows(this.getSelectedCollectionShows());
  }

  getSelectedCollectionShows() {
    if (!this.selectedCollectionId) return [];

    return this.collections.filter(
      ({collection_id}) => collection_id === this.selectedCollectionId,
    )[0].Shows;
  }

  syncCollections() {
    return axios
      .get(`${BASE_URL}/api/user`)
      .then(res => {
        this.setCollections(res.data.Collections);

        this.setSelectedCollectionId(this.collections[0].collection_id);
      })
      .catch(error => console.error(error));
  }

  addShow(show, setShowNameErrorMessage) {
    return axios
      .post(`${BASE_URL}/api/show`, show)
      .then(res => {
        let newCollections = Object.create(this.collections);
        console.log(JSON.stringify(newCollections, null, 4));
        newCollections.forEach(collection => {
          if (collection.collection_id === this.selectedCollectionId)
            collection.Shows.push(res.data);
        });
        this.setCollections(newCollections);
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.name === 'ValidationError'
        ) {
          setShowNameErrorMessage(error.response.data.errors[0].message);
        } else {
          console.error(error);
        }
        return error;
      });
  }

  updateShow(show) {
    axios
      .put(`${BASE_URL}/api/show/${show.showId}`, {
        show_name: show.showName,
        show_description: show.showDescription,
        seasons_watched: show.seasonsWatched,
        episodes_watched: show.episodesWatched,
      })
      .then(() => {
        if (this.collections.length) {
          let newCollections = Object.create(this.collections);
          const collection = newCollections.find(
            ({collection_id}) => collection_id === this.selectedCollectionId,
          );
          let newShow = collection.Shows.find(
            ({show_id}) => show_id === show.showId,
          );
          console.log('show.showId', show.showId);
          console.log(
            'collectionShows ',
            JSON.stringify(collection.Shows, null, 4),
          );

          newShow.seasons_watched = show.seasonsWatched;
          newShow.episodes_watched = show.episodesWatched;

          this.setCollections(newCollections);
        }
      })
      .catch(error => console.error(error));
  }

  addCollection(collection, setCollectionNameErrorMessage) {
    return axios
      .post(`${BASE_URL}/api/collection`, collection)
      .then(res => {
        this.setCollections([
          ...this.collections,
          {
            collection_id: res.data.collection_id,
            collection_name: res.data.collection_name,
            Shows: [],
          },
        ]);
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.name === 'ValidationError'
        ) {
          setCollectionNameErrorMessage(error.response.data.errors[0].message);
        } else {
          console.error(error);
        }
        return error;
      });
  }

  deleteCollection() {
    axios
      .delete(`${BASE_URL}/api/collection/${this.selectedCollectionId}`)
      .then(res => {
        let newCollections = Object.create(this.collections);
        newCollections = newCollections.filter(
          ({collection_id}) => collection_id !== this.selectedCollectionId,
        );

        if (newCollections.length === 0)
          newCollections = [
            {
              collection_id: res.data.collection_id,
              collection_name: res.data.collection_name,
              Shows: [],
            },
          ];

        this.setCollections(newCollections, true);
      })
      .catch(error => console.error(error));
  }
}

export default new CollectionStore();
