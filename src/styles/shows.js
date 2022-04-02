import { StyleSheet } from 'react-native';
import { globals, colors } from './globals';

export default StyleSheet.create({
  ...globals,
  dot: {
    backgroundColor: '#c4c4c4',
    height: 5,
    width: 5,
    marginHorizontal: 2,
  },
  completeButton: {
    backgroundColor: '#808080',
  },
  uncompleteButton: {
    backgroundColor: '#15A901',
  },
  emptyCollectionText: {
    fontFamily: 'Popping-Medium',
    fontSize: 30,
    color: colors.fadeColor,
    paddingVertical: 50,
    textAlign: 'center',
  },
  showCard: {
    backgroundColor: colors.tritaryBackgroundColor,
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
  },
  showName: {
    ...globals.text,
    fontSize: 16,
    flex: 1,
    paddingTop: 4,
  },
  showDescription: {
    ...globals.p,
    flex: 2,
    paddingRight: 4,
  },
  countersContainer: {
    ...globals.row,
    ...globals.alignCenter,
    ...globals.justifySpaceAround,
    flex: 3,
  },
  counterText: {
    ...globals.text,
      fontSize: 14,
      flex: 1,
      textAlign: 'center',
  }
});