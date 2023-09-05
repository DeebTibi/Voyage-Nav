import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import COLORS from "../../metadata/ColorPallete";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.center_container}>
      <View style={[styles.text_container, styles.padded_20px]}>
        <Text style={[styles.hero_text, styles.white]}>Hi, welcome to </Text>
        <Text style={[styles.voyage, styles.colored]}>Voyage</Text>
        <View style={styles.spacer_20}></View>
        <Pressable
          style={styles.btn}
          onPress={() => {
            navigation.navigate("Preference2");
          }}
        >
          <Text style={styles.btn_text}>Let's get you started</Text>
        </Pressable>
      </View>
      <View style={styles.flex_row}>
        <LottieView
          autoPlay={true}
          loop={true}
          style={styles.lottie}
          source={require("../../../assets/lottie/Cycling.json")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center_container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.c200,
    alignItems: "center",
    justifyContent: "center",
  },
  text_container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  padded_20px: {
    paddingLeft: 20,
  },
  lottie: {
    width: "100%",
  },
  hero_text: {
    fontSize: 40,
    fontFamily: "DMSans-600",
  },
  voyage: {
    fontSize: 50,
    fontFamily: "DMSans-900",
  },
  white: {
    color: COLORS.c100,
  },
  colored: {
    color: COLORS.c300,
  },
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
  spacer_20: {
    width: "100%",
    height: 20,
  },
});
