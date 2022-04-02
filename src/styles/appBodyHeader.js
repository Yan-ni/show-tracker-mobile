import { StyleSheet } from 'react-native';
import { globals, colors } from './globals';

export default StyleSheet.create({
  ...globals,
  searchInputContainer: {
    ...globals.row,
    ...globals.alignCenter,
    backgroundColor: colors.tritaryBackgroundColor,
    borderRadius: 5,
    elevation: 3,
  },
  filter: {
    ...globals.center,
    backgroundColor: colors.tritaryBackgroundColor,
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  searchIconContainer: {
    backgroundColor: colors.tritaryBackgroundColor,
    paddingRight: 15,
    paddingLeft: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  searchInput: {
    backgroundColor: colors.tritaryBackgroundColor,
    color: colors.inputColor,
    paddingHorizontal: 10,
    height: 40,
    width: 110,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  }
});

