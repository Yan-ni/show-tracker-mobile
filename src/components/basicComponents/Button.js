import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, Vibration } from 'react-native';
import styles from '../../styles/button';

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
      activeOpacity={1}
      underlayColor={
        pressBackground ||
        buttonStyle?.backgroundColor ||
        styles.button.backgroundColor
      }
      style={
        isPress
          ? [styles.button, buttonStyle]
          : [styles.button, buttonStyle, pressStyle]
      }
      onHideUnderlay={() => setIsPress(false)}
      onShowUnderlay={() => setIsPress(true)}
      onPress={() => {
        Vibration.vibrate(50);
        onPress();
      }}>
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableHighlight>
  );
}
