import { observer } from 'mobx-react';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Button from '../components/Button';
import TextInputGroupe from '../components/TextInputGroupe';

function LoginScreen({setIsConnected, connectionStore}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={styles.mainView}
        onPress={Keyboard.dismiss}
        accessible={false}>
        <View style={styles.loginContainer}>
          <Text style={textStyles.loginText}>Login</Text>

          <TextInputGroupe
            autoComplete="username"
            placeholder="Your username or Email"
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
            <Text style={textStyles.LinkText}>Forgot Password ?</Text>
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
            <Text style={textStyles.LinkText}>create an account</Text>
          </Pressable>
          <Button
            buttonStyle={{alignSelf: 'flex-end', elevation: 2}}
            onPress={() => connectionStore.connect({username, password})}
            pressBackground="#1b7cda">
            Login
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default observer(LoginScreen);

const textStyles = StyleSheet.create({
  loginText: {
    alignSelf: 'center',
    color: '#121A5B',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    paddingTop: 5,
    paddingBottom: 15,
  },
  LinkText: {
    color: '#1B78F2',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    paddingVertical: 3,
  },
});

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#f7f7f7',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    display: 'flex',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    elevation: 5,
    borderRadius: 10,
  },
});
