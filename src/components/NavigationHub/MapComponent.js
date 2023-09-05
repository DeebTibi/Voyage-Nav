
import MapView, { Marker } from 'react-native-maps'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import COLORS from '../../metadata/ColorPallete'
import { useCallback, useEffect, useRef } from 'react'
import UserWidget from '../Accessories/MapElements/UserWidget'
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

const AnimatedMarker = Animated.createAnimatedComponent(Marker)

export default function MapComponent({
    userLocation
}) {
    const latitude = useSharedValue(userLocation ? userLocation.latitude : 0);
    const longitude = useSharedValue(userLocation ? userLocation.longitude : 0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            latitude: withTiming(latitude.value, {
                duration: 500,
                easing: Easing.linear
            }),
            longitude: withTiming(longitude.value, {
                duration: 500,
                easing: Easing.linear
            })
        };
    });

    return (
        <>
            {
                userLocation == null ?
                    <View style={styles.page}><LoadingIndicator></LoadingIndicator></View> :
                    <View style={styles.page}><MapView
                        style={styles.map}
                        initialRegion={{ latitude: userLocation.latitude, longitude: userLocation.longitude, latitudeDelta: 0.001, longitudeDelta: 0.001 }}

                    >
                        <Marker
                            coordinate={{
                                latitude: userLocation.latitude,
                                longitude: userLocation.longitude
                            }}
                        >
                            <UserWidget></UserWidget>
                        </Marker>
                    </MapView></View >

            }
        </>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: "100%",
        backgroundColor: COLORS.c200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading_page: {
        flex: 1,
        width: "100%",
        backgroundColor: COLORS.c200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        flex: 1,
        width: "100%"
    }
})
