export const colors = {
  primaryBackgroundColor: '#FFFFFF',
  secondaryBackgroundColor: '#F7F7F7',
  tritaryBackgroundColor: '#F2F2F2',

  primaryColor: '#2745F2',
  secondaryColor: '#121A5B',
  tritaryColor: '#1B78F2',
  fadeColor: '#999999',

  dangerColor: '#F06760',
  successColor: '',

  labelColor: '#333333',
  inputBackgroundColor: '#CED8DE',
  inputColor: '#000000',
};

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
    fontSize: 18,
    marginVertical: 3,
  },
  span: {
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    color: colors.inputColor,
    borderColor: colors.inputBackgroundColor,
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