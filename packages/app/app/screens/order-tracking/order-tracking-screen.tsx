import React, { useEffect, useRef, useState } from "react"
import { Dimensions, View, ViewStyle } from "react-native"
import { Header, MapViewDirections, Screen, Text } from "../../components"
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps"
import { color } from "../../theme"
import Scooter from "./scooter.svg"
import { PERMISSIONS, request } from "react-native-permissions"
import { MOCK_DRIVER_POS_COORDS } from "./mock-driver-pos"
import Config from "react-native-config"
// import firestore, {
//   FirebaseFirestoreTypes,
// } from '@react-native-firebase/firestore';
// import {DriverAttributes} from '../../models/firebase/driver';

const ROOT: ViewStyle = {
  flex: 1,
}

const { width, height } = Dimensions.get("window")

const ASPECT_RATIO = width / height
const LATITUDE = 55.3814737
const LONGITUDE = 10.4092051
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export const OrderTrackingScreen: React.FC = () => {
  useEffect(() => {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
  }, [])

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

  useEffect(() => {
    ;(async () => {
      for (const pos of MOCK_DRIVER_POS_COORDS) {
        console.log(pos)
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

  const [viewRegion, setViewRegion] = useState(destination)

  const onRegionChange = (region: Region) => {
    setViewRegion(region)
  }

  const mapViewRef = useRef<MapViewDirections>()

  return (
    <Screen testID="OrderTrackingScreen" style={ROOT} preset="scroll">
      <Header headerText="Order" />

      <MapView
        userLocationPriority="high"
        provider={PROVIDER_GOOGLE}
        onRegionChange={onRegionChange}
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
        style={{
          flex: 1,
        }}
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

        <Marker identifier="origin_marker" coordinate={origin} />
        <Marker identifier="destination_marker" coordinate={destination} />

        <Marker identifier="scooter_marker" coordinate={driverPosition}>
          <Scooter height={48} width={48} />
        </Marker>
      </MapView>

      {__DEV__ && <RegionOverlay region={viewRegion} />}
    </Screen>
  )
}

type RegionOverlayProps = {
  region: Region
}

function RegionOverlay({ region }: RegionOverlayProps) {
  return (
    <View
      style={{
        backgroundColor: color.palette.white,
        opacity: 0.8,
        position: "absolute",
        bottom: 10,
        left: 70,
        padding: 10,
        borderRadius: 20,
      }}
    >
      <Text>Latitude {region.latitude.toPrecision(7)}</Text>
      <Text>Longitude {region.longitude.toPrecision(7)}</Text>

      <Text>Longitude Delta {region.longitudeDelta.toPrecision(7)}</Text>
      <Text>Latitude Delta {region.latitudeDelta.toPrecision(7)}</Text>
    </View>
  )
}
