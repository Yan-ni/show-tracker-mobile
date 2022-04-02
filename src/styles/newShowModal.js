import { StyleSheet } from 'react-native';
import { globals, colors } from './globals';

export default StyleSheet.create({
  ...globals,
  buttonsContainer: {
    ...globals.row,
    ...globals.alignCenter,
    alignSelf: 'flex-end',
    marginTop: 30
  }
});