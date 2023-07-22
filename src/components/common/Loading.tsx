import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Overlay } from 'react-native-elements'
import { useTheme } from 'react-native-paper'
export default function Loading(props : any) {
    const colors = useTheme().colors;
    // Estilo propio el del profesor es diferente pero se ve bien
    const { visible, text } = props
  return (
    <Overlay
        isVisible={visible}
        animationType="fade"
        overlayStyle={{...styles.overlay, backgroundColor: colors.background, borderColor: colors.primary}}
    >
        <View style={styles.view}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{...styles.text, color: colors.primary}}>{text}</Text>
        </View>
    </Overlay>
    )
}

Loading.defaultProps = {
    visible: false,
    text: ""
}

const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        borderWidth: 2,
        borderRadius: 10
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        textTransform: "uppercase",
        fontWeight: "bold"
    }
})
