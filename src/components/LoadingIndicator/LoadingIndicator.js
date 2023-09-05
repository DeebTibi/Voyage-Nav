import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import lotties from '../../metadata/lotties';


export default function LoadingIndicator() {
  const lottieRef = useRef(null)
  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        lottieRef.current?.reset()
        lottieRef.current?.play()
      }, 100)
    }
  }, [lottieRef.current])
  return (
    <LottieView
      autoPlay={true}
      loop={true}
      style={{
        width: 200,
        height: 200,
      }}
      source={lotties.loading}
      ref={lottieRef}
    />
  )
}
