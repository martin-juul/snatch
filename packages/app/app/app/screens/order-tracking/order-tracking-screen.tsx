import React, { useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import { color } from "../../theme"
import Scooter from './scooter.svg'

const GOOGLE_MAPS_DIRECTIONS_API_KEY = "AIzaSyBaJ0UeOoHDtDg8zKNz0q9Cc19N_HuCz4s"

const ROOT: ViewStyle = {
  flex: 1,
}

const { width, height } = Dimensions.get("window")

const ASPECT_RATIO = width / height
const LATITUDE = 55.3814737
const LONGITUDE = 10.4092051
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export const OrderTrackingScreen = observer(function OrderTrackingScreen() {
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

  const [driverPosition, setDriverPosition] = useState({
    latitude: 55.40969,
    longitude: 10.39408,
  })

  const [viewRegion, setViewRegion] = useState(destination)

  const onRegionChange = (region: Region) => {
    setViewRegion(region)
  }

  const STROKE_COLOR = color.palette.green
  const mapViewRef = useRef<MapViewDirections>()

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        headerText="Order"
      />

      <MapView
        userLocationPriority="high"
        provider={PROVIDER_GOOGLE}
        onRegionChange={onRegionChange}
        showsBuildings={true}
        showsScale={true}
        showsMyLocationButton={true}
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
          apikey={GOOGLE_MAPS_DIRECTIONS_API_KEY}
          origin={origin}
          destination={destination}
          strokeWidth={4}
          strokeColor={STROKE_COLOR}
          mode="DRIVING"
          language="en"
          isMemoized
          resetOnChange={false}
          ref={mapViewRef}
        />

        <Marker identifier="origin_marker" coordinate={origin} />
        <Marker identifier="destination_marker" coordinate={destination} />

        <Marker
          identifier="scooter_marker"
          coordinate={driverPosition}
        >
          <Scooter height={48} width={48} />
        </Marker>
      </MapView>

      <RegionOverlay region={viewRegion} />
    </Screen>
  )
})

type RegionOverlayProps = {
  region: Region,
}

function RegionOverlay({ region }: RegionOverlayProps) {
  return (
    <View style={{
      backgroundColor: color.palette.white,
      opacity: 0.8,
      position: "absolute",
      bottom: 10,
      left: 70,
      padding: 10,
      borderRadius: 20,
    }}>

      <Text>Latitude {region.latitude.toPrecision(7)}</Text>
      <Text>Longitude {region.longitude.toPrecision(7)}</Text>

      <Text>Longitude Delta {region.longitudeDelta.toPrecision(7)}</Text>
      <Text>Latitude Delta {region.latitudeDelta.toPrecision(7)}</Text>
    </View>
  )
}
