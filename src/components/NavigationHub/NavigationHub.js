import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, SafeAreaView, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import COLORS from '../../metadata/ColorPallete';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated'
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import PrimaryButton from '../Accessories/Buttons/PrimaryButton';
import MapComponent from './MapComponent';

export default function NavigationHub() {
    const [search, setSearch] = useState('')
    const [userLocation, setUserLocation] = useState(null)
    const [locationPermission, setLocationPermission] = useState(false)
    const op = useSharedValue(0)

    useEffect(() => {
        (async () => {
            let subscription = null
            let { granted } = await Location.getForegroundPermissionsAsync()
            if (!granted) {
                return
            }
            setLocationPermission(true)
            const result = await consentHandler()
            if (result) {
                subscription = Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.BestForNavigation,
                        timeInterval: 200,
                        distanceInterval: 0
                    },
                    (newLocation) => {
                        const { latitude, longitude } = newLocation.coords
                        console.log(`${latitude}  ${longitude}`)
                        setUserLocation({ latitude, longitude })
                    }
                )
            }

            return () => {
                if (subscription) {
                    subscription.remove()
                }
            }
        })()
    }, [])
    const handleFocus = () => {
        op.value = withTiming(0.5)
    }
    const handleBlur = () => {
        op.value = withTiming(0)
    }
    const handleInput = (e) => {
        setSearch(e.value)
    }
    const consentHandler = async () => {
        if (!locationPermission) {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                // Handle accordingly
                console.error("Permission denied")
                return false
            }
            setLocationPermission(true)
        }
        let location = await Location.getCurrentPositionAsync({})
        const { longitude, latitude } = location.coords
        setUserLocation({ latitude, longitude })
        return true
    }

    return (
        <View style={styles.page}>
            <View style={styles.map_container}>
                {locationPermission ?
                    <MapComponent userLocation={userLocation} /> :
                    <View style={styles.permission_container}>
                        <Text style={styles.permission_text}>Before we start, voyage needs access to your location to function properly</Text>
                        <PrimaryButton text={"Give Consent"} onPressHandler={consentHandler}></PrimaryButton>
                    </View>
                }
                <Animated.View style={[styles.grey_overlay, { opacity: op }]} pointerEvents="none"></Animated.View>
            </View>
            <SafeAreaView style={styles.search_bar_container}>
                <TextInput style={styles.search_bar} value={search} placeholder='Where would you like to go?' onChange={handleInput} onFocus={handleFocus} onBlur={handleBlur}></TextInput>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: "100%"
    },
    map_container: {
        flex: 1,
        width: "100%"
    },
    map: {
        width: "100%",
        flex: 1
    },
    search_bar_container: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: 100,
        backgroundColor: COLORS.c200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    search_bar: {
        backgroundColor: COLORS.c100,
        width: "90%",
        borderRadius: 10,
        padding: 10,
        fontFamily: "DMSans-500",
        fontSize: 16
    },
    grey_overlay: {
        backgroundColor: COLORS.c100,
        width: "100%",
        position: "absolute",
        height: "100%",
        opacity: 0
    },
    permission_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 50,
        width: "100%",
        backgroundColor: COLORS.c400,
        paddingLeft: 30
    },
    permission_text: {
        fontFamily: "DMSans-800",
        fontSize: 25,
        width: "100%",
        color: COLORS.c100
    }
})
