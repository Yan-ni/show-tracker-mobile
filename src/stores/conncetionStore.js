import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { BASE_URL } from '../config/constants.config';

class ConnectionStore {
  constructor() {
    makeObservable(this, {
      isConnected: observable,
      connect: action,
      setConnected: action,
      disconnect: action,
      errorMessages: observable,
      clearUsernameErrorMessage: action,
      clearPasswordErrorMessage: action,
      setUsernameErrorMessage: action,
      setPasswordErrorMessage: action,
    });
  }

  isConnected = false;

  errorMessages = {
    username: null,
    password: null,
  };

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
        axios.defaults.headers.common['Authorization'] = res.data.authorization;
        this.setConnected();
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

  setConnected() {
    this.isConnected = true;
  }

  disconnect() {
    axios.defaults.headers.common['Authorization'] = undefined;
    this.isConnected = false;
  }
}

export default new ConnectionStore();
