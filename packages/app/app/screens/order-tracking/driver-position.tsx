import React, { useEffect, useRef, useState } from "react"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { Dimensions, ViewStyle } from "react-native"
import { PERMISSIONS, request } from "react-native-permissions"
import { MOCK_DRIVER_POS_COORDS } from "./mock-driver-pos"
import ErrorBoundary from "react-native-error-boundary"
import { FallbackComponent } from "./fallback"
import { MapViewDirections } from "../../components"
import Config from "react-native-config"
import { color } from "../../theme"
import Scooter from "./scooter.svg"

const { width, height } = Dimensions.get("window")

const ASPECT_RATIO = width / height
const LATITUDE = 55.3814737
const LONGITUDE = 10.4092051
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export function DriverPosition() {
  const [destination, setDestination] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  })

  const [origin, setOrigin] = useState({
    latitude: 55.4117734,
    longitude: 10.3933488,
  })

  const [driverId, setDriverId] = useState("1")
  const [driverPosition, setDriverPosition] = useState({
    latitude: 55.40969,
    longitude: 10.39408,
  })

  const mapViewRef = useRef<MapViewDirections>()

  useEffect(() => {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
  }, [])

  useEffect(() => {
    ;(async () => {
      for (const pos of MOCK_DRIVER_POS_COORDS) {
        setDriverPosition(pos)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      for (const pos of MOCK_DRIVER_POS_COORDS) {
        setDriverPosition(pos)
      }
    })()
  }, [])

  // useEffect(() => {
  //   const subscription = firestore()
  //     .collection<DriverAttributes>('drivers')
  //     .doc(driverId)
  //     .onSnapshot(snapshot => {
  //       const points =
  //         snapshot.get<FirebaseFirestoreTypes.GeoPoint[]>('geopoints');
  //       setDriverPosition(points[points.length - 1]);
  //     });
  //
  //   return () => {
  //     // unsubscribe
  //     subscription();
  //   };
  // }, [driverId]);

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <MapView
        userLocationPriority="high"
        provider={PROVIDER_GOOGLE}
        cacheEnabled
        showsBuildings
        showsScale
        showsUserLocation
        showsMyLocationButton
        initialRegion={{
          latitude: destination.latitude,
          longitude: destination.longitude,
          longitudeDelta: 0.0622,
          latitudeDelta: 0.0121,
        }}
        style={MAP_VIEW_STYLE}
      >
        <MapViewDirections
          apikey={Config.GOOGLE_MAPS_DIRECTIONS_API_KEY}
          origin={origin}
          destination={destination}
          strokeColor={color.palette.green}
          strokeWidth={4}
          mode="DRIVING"
          language="en"
          isMemoized
          resetOnChange={false}
          ref={mapViewRef}
        />

        <Marker identifier="origin_marker" coordinate={origin} pinColor="#d7c133" />
        <Marker identifier="destination_marker" coordinate={destination} />

        <Marker identifier="scooter_marker" coordinate={driverPosition}>
          <Scooter height={48} width={48} />
        </Marker>
      </MapView>
    </ErrorBoundary>
  )
}

const MAP_VIEW_STYLE: ViewStyle = {
  flex: 10,
}
