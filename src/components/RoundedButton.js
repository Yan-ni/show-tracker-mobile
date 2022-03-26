import React from 'react';
import { Pressable, StyleSheet, Text, Vibration } from 'react-native';

export default function RoundedButton({
  children,
  onPress,
  buttonStyle,
  textStyle,
}) {
  if (buttonStyle && buttonStyle.width)
    buttonStyle.borderRadius = buttonStyle.width / 2;
  if (buttonStyle && buttonStyle.height)
    buttonStyle.borderRadius = buttonStyle.height / 2;

  return (
    <Pressable
      style={[defaultStyles.roundedButton, buttonStyle]}
      onPress={() => {
        Vibration.vibrate(50);
        onPress();
      }}>
      <Text style={[defaultStyles.roundedButtonText, textStyle]}>
        {children}
      </Text>
    </Pressable>
  );
}

const defaultStyles = StyleSheet.create({
  roundedButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2745F2',
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    elevation: 3,
  },
  roundedButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    paddingTop: 3,
  },
});
