import { StyleSheet } from 'react-native';
import { globals, colors } from './globals';

export default StyleSheet.create({
  button: {
    ...globals.center,
    backgroundColor: colors.primaryColor,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    fontSize: 16,
    paddingTop: 3,
  },
});