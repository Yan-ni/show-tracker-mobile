import { StyleSheet } from 'react-native';
import { globals, colors } from './globals';

export default StyleSheet.create({
  mainView: {
    ...globals.alignCenter,
    flex: 1,
    backgroundColor: colors.secondaryBackgroundColor,
  },
});