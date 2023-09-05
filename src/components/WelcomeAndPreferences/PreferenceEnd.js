import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import COLORS from "../../metadata/ColorPallete";
import lotties from "../../metadata/lotties";

export default function PreferenceEnd({ navigation }) {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("NavigationHub");
    }, 3000)
  }, [])


  return (
    <View style={styles.page}>
      <View style={styles.text_container}>
        <Text style={styles.hero_text}>You're all setup !</Text>
        <Text style={styles.secondary_text}>
          Let's meet your new travel companion
        </Text>
      </View>
      <View style={styles.lottie_container}>
        <LottieView loop={true} autoPlay={true} source={lotties.after_setup} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.c200,
  },
  text_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    paddingLeft: 10,
  },
  lottie_container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hero_text: {
    fontFamily: "DMSans-700",
    fontSize: 35,
    color: COLORS.c400,
  },
  secondary_text: {
    fontFamily: "DMSans-500",
    fontSize: 25,
    color: COLORS.c100,
    width: 250,
  },
});
