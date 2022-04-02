import { StyleSheet } from 'react-native';
import { globals, colors } from './globals';

export default StyleSheet.create({
  ...globals,
  appBodyView: {
    backgroundColor: colors.primaryBackgroundColor,
    width: '90%',
    height: '85%',
    padding: 20,
    borderRadius: 10,
    elevation: 7,
  },
});

