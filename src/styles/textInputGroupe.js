import { StyleSheet } from 'react-native';
import { globals, colors } from './globals';

export default StyleSheet.create({
  ...globals,
  inputError: {
    borderColor: colors.dangerColor,
  },
  errorSpan: {
    ...globals.span,
    color: colors.dangerColor,
    marginLeft: 5,
  },
});