import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, Vibration } from 'react-native';

export default function Button({
  textStyle,
  buttonStyle,
  onPress,
  pressStyle,
  pressBackground,
  children,
  rounded,
}) {
  const [isPress, setIsPress] = useState(false);

  if (rounded) {
    if (!buttonStyle) var buttonStyle = {};

    // only the width or the height need to be specified
    buttonStyle.width = buttonStyle.width || buttonStyle.height;
    buttonStyle.height = buttonStyle.width;

    //default values for width and height if neither are specified
    if (!buttonStyle.width && !buttonStyle.height) {
      buttonStyle.width = 25;
      buttonStyle.height = 25;
    }

    buttonStyle.paddingVertical = 0;
    buttonStyle.paddingHorizontal = 0;
    buttonStyle.borderRadius = (buttonStyle.width || buttonStyle.height) / 2;
  }

  return (
    <TouchableHighlight
      activeOpacity={true}
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2745F2',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 3,
    fontFamily: 'Poppins-Regular',
  },
});
