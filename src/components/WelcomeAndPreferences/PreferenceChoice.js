import LottieView from "lottie-react-native";
import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import lotties from "../../metadata/lotties";
import COLORS from "../../metadata/ColorPallete";
import AsyncStorage from "@react-native-async-storage/async-storage";
import navMenu from "../../metadata/navigationConfig";

export default function PreferenceChoice({
  pref1,
  pref2,
  optText1,
  optText2,
  optLottie1,
  optLottie2,
  loop1,
  loop2,
  navigation,
}) {
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("config", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("config");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const handlePress = async (pressed) => {
    let config = await getData();
    if (config == null) {
      config = {};
    }
    if (pressed == pref1) {
      config[pref1] = true;
      config[pref2] = false;
    } else {
      config[pref2] = true;
      config[pref1] = false;
    }
    await storeData(config);
    navigationHandler(pressed);
  };

  const navigationHandler = (pressed) => {
    navigation.navigate(navMenu[pressed]);
  };

  return (
    <View style={[styles.take_all_space, { backgroundColor: COLORS.c200 }]}>
      <SafeAreaView style={[styles.flex_center, styles.take_all_space]}>
        <Text style={[styles.header_text]}>
          Which one would you say suits you more?
        </Text>
        <View style={[styles.spacer_15]}></View>
        <TouchableOpacity
          onPress={() => {
            handlePress(pref1);
          }}
          style={[styles.card, styles.full_width, styles.take_all_space]}
        >
          <View style={[styles.flex_column, styles.take_all_space]}>
            <View
              style={{
                flex: 8,
                backgroundColor: "white",
                width: "100%",
                alignItems: "center",
              }}
            >
              <LottieView
                autoPlay={true}
                loop={loop1 != undefined ? loop1 : true}
                style={[styles.lottie]}
                source={lotties[optLottie1]}
              />
            </View>
            <View style={styles.flex_column_end}>
              <Text style={styles.option_text}>{optText1}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.spacer_10}></View>
        <TouchableOpacity
          onPress={() => {
            handlePress(pref2);
          }}
          style={[styles.card, styles.full_width, styles.take_all_space]}
        >
          <View style={[styles.flex_column, styles.take_all_space]}>
            <View
              style={{
                flex: 8,
                backgroundColor: "white",
                width: "100%",
                alignItems: "center",
              }}
            >
              <LottieView
                autoPlay={true}
                loop={loop2 != undefined ? loop2 : true}
                style={[styles.lottie]}
                source={lotties[optLottie2]}
              />
            </View>
            <View style={styles.flex_column_end}>
              <Text style={styles.option_text}>{optText2}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.spacer_15}></View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  full_width: {
    width: "80%",
  },
  flex_center: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flex_column: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  take_all_space: {
    flex: 1,
  },
  option_text: {
    fontFamily: "DMSans-600",
    fontSize: 15,
  },
  header_text: {
    fontFamily: "DMSans-800",
    fontSize: 25,
    color: COLORS.c400,
  },
  spacer_15: {
    width: "100%",
    height: 50,
  },
  spacer_10: {
    width: "100%",
    height: 10,
  },
  spacer_5: {
    width: "100%",
    height: 5,
  },
  lottie: {
    flex: 1,
  },
  card: {
    borderRadius: "10px",
    backgroundColor: COLORS.c100,
  },
  flex_column_end: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 2,
  },
});
