import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Overlay } from "react-native-elements";
import { useTheme } from "react-native-paper";

export default function Modal(props: any) {
    const { isVisible, close, children } = props;
    const colors = useTheme().colors;
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={{ ...styles.overlay, backgroundColor: colors.background }}
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
    borderRadius: 20,
  },
});