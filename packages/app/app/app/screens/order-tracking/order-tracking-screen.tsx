import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
import MapView, { Geojson, PROVIDER_GOOGLE, Region } from "react-native-maps"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  flex: 1,
}

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd",
      },
    ],
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735",
      },
    ],
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6",
      },
    ],
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off",
      },
    ],
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6",
      },
    ],
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be",
      },
    ],
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90",
      },
    ],
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae",
      },
    ],
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off",
      },
    ],
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae",
      },
    ],
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c",
      },
    ],
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076",
      },
    ],
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530",
      },
    ],
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6",
      },
    ],
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off",
      },
    ],
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8",
      },
    ],
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967",
      },
    ],
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62",
      },
    ],
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58",
      },
    ],
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555",
      },
    ],
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63",
      },
    ],
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off",
      },
    ],
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae",
      },
    ],
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77",
      },
    ],
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd",
      },
    ],
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae",
      },
    ],
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2",
      },
    ],
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d",
      },
    ],
  },
]

const { width, height } = Dimensions.get("window")

const ASPECT_RATIO = width / height
const LATITUDE = 37.78825
const LONGITUDE = -122.4324
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export const OrderTrackingScreen = observer(function OrderTrackingScreen() {
  const [latitude, setLatitude] = useState(LATITUDE)
  const [longitude, setLongitude] = useState(LONGITUDE)
  const [latitudeDelta, setLatitudeDelta] = useState(LATITUDE_DELTA)
  const [longitudeDelta, setLongitudeDelta] = useState(LONGITUDE_DELTA)

  const onRegionChange = (region: Region) => {
    setLatitude(region.latitude)
    setLongitude(region.longitude)
    setLatitudeDelta(region.latitudeDelta)
    setLongitudeDelta(region.longitudeDelta)
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        headerText="Order"
      />

      <MapView
        userLocationPriority="high"
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        onRegionChange={onRegionChange}
        showsBuildings={true}
        showsScale={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: 55.45055,
          longitude: 10.52848,
          longitudeDelta: 0.009032,
          latitudeDelta: 0.009031,
        }}
        style={{
          flex: 1,
        }}
      >
        <Geojson geojson={{
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [55.45, 10.52],
              },
            },
          ],
        }} />
      </MapView>

      <View
        style={{
          backgroundColor: color.palette.angry,
          height: 10,
          width: 250,
          position: "absolute",
          left: 10,
          top: 125,
        }}
      />

      <View style={{
        backgroundColor: color.palette.white,
        opacity: 0.8,
        position: "absolute",
        bottom: 10,
        left: 100,
        padding: 10,
        borderRadius: 20,
      }}>

        <Text>Latitude {latitude.toPrecision(7)}</Text>
        <Text>Longitude {longitude.toPrecision(7)}</Text>

        <Text>Longitude Delta {longitudeDelta.toPrecision(7)}</Text>
        <Text>Latitude Delta {latitudeDelta.toPrecision(7)}</Text>
      </View>
    </Screen>
  )
})
