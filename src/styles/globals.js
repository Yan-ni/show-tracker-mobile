import { Appearance } from 'react-native';
import { lightTheme, darkTheme } from '../config/colors.config';

const colorScheme = Appearance.getColorScheme();

export const colors = colorScheme === 'dark' ? darkTheme : lightTheme;

export const globals = {
  row: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  justifySpaceAround: {
    justifyContent: 'space-around',
  },
  h1: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.secondaryColor,
    fontSize: 24,
  },
  h2: {
    fontFamily: 'Poppins-',
    color: colors.secondaryColor,
    fontSize: '',
  },
  p: {
    fontFamily: 'Poppins-Regular',
    color: colors.secondaryColor,
    fontSize: 12,
    textAlign: 'justify',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    color: colors.secondaryColor,
    fontSize: 16,
  },
  a: {
    fontFamily: 'Poppins-Medium',
    color: colors.tritaryColor,
    fontSize: 15,
    marginVertical: 3,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    color: colors.labelColor,
    fontSize: 16,
    marginVertical: 3,
  },
  span: {
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    color: colors.inputColor,
    borderColor: colors.inputBorderColor,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    paddingBottom: 6,
  },
  icon: {
    width: 20,
    height: 20
  },
  hr: {
    backgroundColor: colors.fadeColor,
    marginHorizontal: -20,
    marginVertical: 10,
    height: 1,
  }
}