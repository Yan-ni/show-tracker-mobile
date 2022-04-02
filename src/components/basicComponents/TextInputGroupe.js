import React from 'react';
import { Text, TextInput, View } from 'react-native';
import defaultStyles from '../../styles/textInputGroupe';

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
