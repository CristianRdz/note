import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Overlay } from "react-native-elements";

export default function Modal(props: any) {
    const { isVisible, close, children } = props;
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
      animationType="slide"
      onBackdropPress={close}
    >
      {children}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});