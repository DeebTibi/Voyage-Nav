import React from 'react'
import { Pressable, StyleSheet, Text, View } from "react-native";
import COLORS from '../../../metadata/ColorPallete';

export default function PrimaryButton({
    text,
    onPressHandler
}) {
    return (
        <Pressable
            style={styles.btn}
            onPress={onPressHandler}
        >
            <Text style={styles.btn_text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: COLORS.c100,
        padding: 15,
        borderRadius: 10,
    },
    btn_text: {
        fontFamily: "DMSans-500",
        fontSize: 16,
        color: COLORS.c300,
    },
});