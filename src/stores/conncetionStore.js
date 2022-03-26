import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { BASE_URL } from '../config/constants.config';

class ConnectionStore {
  constructor() {
    makeObservable(this, {
      isConnected: observable,
      connect: action,
      setIsConnected: action,
      disconnect: action,
      errorMessages: observable,
      clearUsernameErrorMessage: action,
      clearPasswordErrorMessage: action,
      setUsernameErrorMessage: action,
      setPasswordErrorMessage: action,
    });

    this.verifySavedConnectionState();
  }

  isConnected = false;

  errorMessages = {
    username: null,
    password: null,
  };

  async verifySavedConnectionState() {
    try {
      const authorization = await AsyncStorage.getItem('authorization');

      if (!authorization) return this.setIsConnected(false);

      axios.defaults.headers.common['authorization'] = authorization;
      return this.setIsConnected(true);
    } catch (error) {
      console.error(error);
    }
  }

  async saveAuthToken(authToken) {
    try {
      if (authToken) await AsyncStorage.setItem('authorization', authToken);
      else await AsyncStorage.removeItem('authorization');

      axios.defaults.headers.common['authorization'] = authToken;

      this.setIsConnected(!!authToken);
    } catch (error) {
      console.error(error);
    }
  }

  clearUsernameErrorMessage() {
    this.errorMessages.username = null;
  }

  clearPasswordErrorMessage() {
    this.errorMessages.password = null;
  }

  setUsernameErrorMessage(errorMessage) {
    this.errorMessages.username = errorMessage;
  }

  setPasswordErrorMessage(errorMessage) {
    this.errorMessages.password = errorMessage;
  }

  connect(credentials) {
    axios
      .post(`${BASE_URL}/api/authenticate/login`, credentials)
      .then(res => {
        this.saveAuthToken(res.data.authorization);
      })
      .catch(error => {
        if (error.response.data.name === 'ValidationError') {
          const errors = error.response.data.errors;

          errors.forEach(error => {
            if (error.field === 'username')
              this.setUsernameErrorMessage(error.message);
            else if (error.field === 'password')
              this.setPasswordErrorMessage(error.message);
          });
        } else {
          console.error(error);
        }
      });
  }

  setIsConnected(state) {
    this.isConnected = state;
  }

  disconnect() {
    this.saveAuthToken(null);
  }
}

export default new ConnectionStore();
