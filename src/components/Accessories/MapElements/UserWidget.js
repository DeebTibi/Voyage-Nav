import React from 'react'
import { View, StyleSheet } from 'react-native'
import COLORS from '../../../metadata/ColorPallete'

export default function UserWidget() {
    return (
        <View style={styles.background}>
            <View style={styles.foreground}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        borderRadius: "50%",
        backgroundColor: COLORS.c200,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    foreground: {
        borderRadius: "50%",
        backgroundColor: COLORS.c100,
        padding: 10
    }
})
