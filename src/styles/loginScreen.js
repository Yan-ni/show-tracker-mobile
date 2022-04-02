import { StyleSheet } from 'react-native';
import { colors, globals } from './globals';


export default StyleSheet.create({
  ...globals,
  mainView: {
    ...globals.center,
    backgroundColor: colors.secondaryBackgroundColor,
    flex: 1,
  },
  loginContainer: {
    backgroundColor: colors.primaryBackgroundColor,
    padding: 20,
    width: '90%',
    elevation: 5,
    borderRadius: 10,
  },
  loading: {
    ...globals.center,
    backgroundColor: colors.primaryBackgroundColor,
    flex: 1
  },
  loginHeading: {
    ...globals.h1,
    color: colors.secondaryColor,
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 15,
  },
  loginButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors.tritaryColor    
  }
});