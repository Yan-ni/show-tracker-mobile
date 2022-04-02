import { StyleSheet } from 'react-native';
import { globals, colors } from './globals';

export default StyleSheet.create({
  ...globals,
  headerView: {
    ...globals.row,
    ...globals.alignCenter,
    ...globals.justifySpaceBetween,
    backgroundColor: colors.primaryBackgroundColor,
    width: '90%',
    padding: 20,
    marginVertical: 20,
    borderRadius: 10,
    elevation: 5,
  },
  appNameText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.secondaryColor,
  },
});