import React, { useEffect, useState } from "react"
import { Button, Screen, Text, TextField } from "../../components"
import { ProfileProps, ProfileRoute } from "../../navigators/profile/profile-navigator"
import firestore from "@react-native-firebase/firestore"
import { Customer } from "../../firestore/collections/customer"
import { useAuth } from "../../contexts/auth"
import { StyleSheet, ViewStyle } from "react-native"
import { Card, View } from "react-native-ui-lib"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"

interface Props extends ProfileProps<ProfileRoute.Detail> {
}

export const ProfileDetailScreen = ({ navigation }: Props) => {
  const auth = useAuth()
  const [profile, setProfile] = useState<Customer>()

  useEffect(() => {
    async function fetchData() {
      const res = await firestore().collection<Customer>("customers").where("userId", "==", auth.user?.uid).get()
      const customer = res.docs[0].data()

      setProfile(customer)
    }

    fetchData()
  }, [])

  if (!profile) {
    return <Text>Loading</Text>
  }

  return (
    <Screen style={ROOT}>
      <Card style={{ marginHorizontal: 25, padding: 12 }}>
        <TextField
          label="Name"
          value={profile.name}
        />

        <TextField
          label="Address"
          value={profile.address}
        />

        <TextField
          label="Zip"
          value={profile.zipCode}
        />


      </Card>

      <MapView
        userLocationPriority="high"
        provider={PROVIDER_GOOGLE}
        cacheEnabled
        showsBuildings
        showsScale
        showsUserLocation
        showsMyLocationButton
        initialRegion={{
          latitude: profile.location.latitude,
          longitude: profile.location.longitude,
          longitudeDelta: 0.0622,
          latitudeDelta: 0.0121,
        }}
        style={{
          flex: 1,
          marginHorizontal: 25,
          borderRadius: 8,
          marginTop: 8,
        }}
      >
        <Marker identifier="profile_location" pinColor="#d7c133" coordinate={profile.location} />
      </MapView>

      <View style={{ marginHorizontal: 20 }}>
        <Button tx="common.save" style={{ marginTop: 8 }} />
      </View>
    </Screen>
  )
}

const ROOT: ViewStyle = {
  flex: 1,
}
