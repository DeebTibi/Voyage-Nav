import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import COLORS from "./src/metadata/ColorPallete";
import LoadingIndicator from "./src/components/LoadingIndicator/LoadingIndicator";
import WelcomeScreen from "./src/components/WelcomeAndPreferences/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PreferenceChoice from "./src/components/WelcomeAndPreferences/PreferenceChoice";
import PreferenceEnd from "./src/components/WelcomeAndPreferences/PreferenceEnd";
import NavigationHub from './src/components/NavigationHub/NavigationHub.js'

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "DMSans-900": require("./assets/fonts/DMSans-900.ttf"),
    "DMSans-800": require("./assets/fonts/DMSans-800.ttf"),
    "DMSans-700": require("./assets/fonts/DMSans-700.ttf"),
    "DMSans-600": require("./assets/fonts/DMSans-600.ttf"),
    "DMSans-500": require("./assets/fonts/DMSans-500.ttf"),
    "DMSans-400": require("./assets/fonts/DMSans-400.ttf"),
    // You can add more fonts here
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <LoadingIndicator></LoadingIndicator>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen options={{ headerShown: false }} name="Preference1">
          {(props) => (
            <PreferenceChoice
              {...props}
              pref1={"private"}
              pref2={"public"}
              optLottie1={"car"}
              optLottie2={"taxi"}
              optText1={"I prefer using my own vehicle"}
              optText2={"I prefer using public transport"}
            />
          )}
        </Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name="Preference2">
          {(props) => (
            <PreferenceChoice
              {...props}
              pref1={"fast"}
              pref2={"economy"}
              optLottie1={"stopWatch"}
              optLottie2={"money"}
              optText1={"I prefer taking the fastest route"}
              optText2={"I prefer taking the route that is less expensive"}
            />
          )}
        </Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name="Preference3">
          {(props) => (
            <PreferenceChoice
              {...props}
              pref1={"walking"}
              pref2={"scooter"}
              optLottie1={"walking"}
              optLottie2={"scooter"}
              optText1={"I prefer walking when I have to"}
              optText2={"I prefer scootin when I have to"}
            />
          )}
        </Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name="Preference4">
          {(props) => (
            <PreferenceChoice
              {...props}
              pref1={"envFriendly"}
              pref2={"notEnvFriendly"}
              optLottie1={"envoirnment"}
              optLottie2={"smoke"}
              optText1={
                "I prefer taking envoirnment friendly routes and methods of transport"
              }
              optText2={"I don't think that's my priority"}
            />
          )}
        </Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name="PreferenceEnd">
          {(props) => <PreferenceEnd {...props} />}
        </Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name="NavigationHub">
          {(props) => <NavigationHub {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.c400,
    alignItems: "center",
    justifyContent: "center",
  },
});
