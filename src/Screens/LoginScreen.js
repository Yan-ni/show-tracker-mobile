import { observer } from 'mobx-react';
import React, { useState, useContext } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Button, TextInputGroupe } from '../components/basicComponents';

import styles from '../styles/loginScreen';

import { StoreContext } from '../App';

function LoginScreen() {
  const { connectionStore } = useContext(StoreContext);

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (isLoading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2745F2" />
      </View>
    );
  else
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={styles.mainView}
          onPress={Keyboard.dismiss}
          accessible={false}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginHeading}>Login</Text>

            <TextInputGroupe
              autoComplete="username"
              placeholder="Your username or Email"
              defaultValue={username}
              onChangeText={text => {
                setUsername(text);
                connectionStore.clearUsernameErrorMessage();
              }}
              errorMessage={connectionStore.errorMessages.username}>
              username
            </TextInputGroupe>

            <TextInputGroupe
              style={{
                marginVertical: 15,
              }}
              secureTextEntry={true}
              placeholder="Your password"
              defaultValue={password}
              onChangeText={text => {
                setPassword(text);
                connectionStore.clearPasswordErrorMessage();
              }}
              errorMessage={connectionStore.errorMessages.password}>
              password
            </TextInputGroupe>
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
              <Text style={styles.a}>Forgot Password ?</Text>
            </Pressable>

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
              <Text style={styles.a}>create an account</Text>
            </Pressable>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => {
                setIsLoading(true);
                connectionStore
                  .connect({username, password})
                  .then(() => setIsLoading(false));
              }}
              pressBackground="#1b7cda">
              Login
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
}

export default observer(LoginScreen);
