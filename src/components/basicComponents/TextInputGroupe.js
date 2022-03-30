import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function TextInputGroupe({
  children,
  style,
  labelStyle,
  TextInputStyle,
  placeholderTextColor,
  errorMessage,
  ...props
}) {
  return (
    <View style={style}>
      {children && (
        <Text style={[defaultStyles.label, labelStyle]}>{children}</Text>
      )}
      <TextInput
        style={[
          defaultStyles.input,
          TextInputStyle,
          errorMessage ? defaultStyles.inputError : {},
        ]}
        placeholderTextColor={placeholderTextColor || '#999'}
        {...props}
      />
      {errorMessage && (
        <Text style={defaultStyles.errorSpan}>{errorMessage}</Text>
      )}
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  label: {
    color: '#333',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    marginVertical: 3,
  },
  input: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    borderColor: '#CED8DE',
    borderRadius: 5,
    padding: 10,
    paddingBottom: 6,
  },
  inputError: {
    borderColor: '#F06760',
  },
  errorSpan: {
    color: '#F06760',
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
    marginLeft: 5,
  },
});
