import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, Vibration } from 'react-native';

export default function Button({
  textStyle,
  buttonStyle,
  onPress,
  pressStyle,
  pressBackground,
  children,
}) {
  const [isPress, setIsPress] = useState(false);

  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={
        pressBackground ||
        buttonStyle?.backgroundColor ||
        defaultStyles.button.backgroundColor
      }
      style={
        isPress
          ? [defaultStyles.button, buttonStyle]
          : [defaultStyles.button, buttonStyle, pressStyle]
      }
      onHideUnderlay={() => setIsPress(false)}
      onShowUnderlay={() => setIsPress(true)}
      onPress={() => {
        Vibration.vibrate(50);
        onPress();
      }}>
      <Text style={[defaultStyles.buttonText, textStyle]}>{children}</Text>
    </TouchableHighlight>
  );
}

const defaultStyles = StyleSheet.create({
  button: {
    backgroundColor: '#1B78F2',
    paddingVertical: 8,
    paddingHorizontal: 15,
    paddingTop: 10,
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
