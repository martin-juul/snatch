import React, { useEffect, useState } from "react"
import { FlatList, Pressable, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import FastImage from "react-native-fast-image"
import firestore from "@react-native-firebase/firestore"
import { Collection, RestaurantModel } from "../../firestore/collections"

const FULL: ViewStyle = { flex: 1 }

export const RestaurantListScreen: React.FC = () => {
  const navigation = useNavigation()

  const [restaurants, setRestaurants] = useState<RestaurantModel[]>()

  useEffect(() => {
    async function fetchData() {
      const restaurants = await firestore().collection<RestaurantModel>(Collection.Restaurants).get()
      const models = []

      for (const restaurant of restaurants.docs) {
        models.push(restaurant.data())
      }

      console.log(models)

      setRestaurants(models)
    }

    fetchData()
  }, [])

  const goToRestaurant = () => {
    navigation.navigate("RestaurantDetail")
  }

  return (
    <View testID="RestaurantListScreen" style={FULL}>
      <Screen preset="fixed" statusBar="dark-content">
        <View style={{ marginHorizontal: 20 }}>

          {restaurants && (
            <FlatList
              data={restaurants}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable onPress={() => goToRestaurant()}>
                  <FastImage
                    style={{ width: "100%", height: 200 }}
                    source={{ uri: item.image }}
                    resizeMode={FastImage.resizeMode.contain}
                  />

                  <Text text={item.name} />
                  <Text text={item.type} />
                </Pressable>
              )}
            />
          )}
        </View>
      </Screen>
    </View>
  )
}
