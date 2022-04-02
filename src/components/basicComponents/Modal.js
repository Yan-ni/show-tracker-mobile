import React from 'react';
import { Modal as DefaultModal, View } from 'react-native';
import styles from '../../styles/modal';

export default function Modal({children, ...props}) {
  return (
    <DefaultModal {...props} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          {children}
        </View>
      </View>
    </DefaultModal>
  );
}
