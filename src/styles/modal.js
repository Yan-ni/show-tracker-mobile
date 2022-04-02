import { StyleSheet } from 'react-native';
import { globals, colors } from './globals';

export default StyleSheet.create({
  ...globals,
  modalContainer: {
    backgroundColor: '#000000aa',
    ...globals.center,
    flex: 1,
  },
  modal: {
    backgroundColor: colors.primaryBackgroundColor,
    width: '85%',
    padding: 20,
  }
});