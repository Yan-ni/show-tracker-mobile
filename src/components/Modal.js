import React from 'react';
import { Modal as DefaultModal, View } from 'react-native';

export default function Modal({children, ...props}) {
  return (
    <DefaultModal {...props} transparent={true}>
      <View
        style={{
          backgroundColor: '#000000aa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '85%',
            padding: 20,
          }}>
          {children}
        </View>
      </View>
    </DefaultModal>
  );
}
