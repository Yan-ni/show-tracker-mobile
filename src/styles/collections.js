import { StyleSheet } from 'react-native';
import { globals, colors } from './globals';

export default StyleSheet.create({
  ...globals,
  collectionText: {
    fontFamily: 'Poppins-Medium',
    color: colors.secondaryColor,
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  selected: {
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 3,
  },
});