import React, { useEffect, useState } from "react"
import { FlatList, Pressable, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import firestore from "@react-native-firebase/firestore"
import { Collection, RestaurantModel } from "../../firestore/collections"

export const RestaurantListScreen: React.FC = () => {
  const navigation = useNavigation()

  const [restaurants, setRestaurants] = useState<RestaurantModel[]>()

  useEffect(() => {
    async function fetchData() {
      const restaurants = await firestore().collection<RestaurantModel>(Collection.Restaurants).get()
      const models = []

      for (const restaurant of restaurants.docs) {
        const model = restaurant.data()
        model.id = restaurant.id

        models.push(model)
      }

      setRestaurants(models)
    }

    fetchData()
  }, [])

  const goToRestaurant = (id: string) => {
    navigation.navigate("RestaurantDetail", { id })
  }

  return (
    <View testID="RestaurantListScreen" style={FULL}>
      <Screen preset="fixed" statusBar="dark-content">
        {restaurants && (
          <FlatList
            data={restaurants}

            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => goToRestaurant(item.id)}
                style={ITEM_CONTAINER}
              >
                <FastImage
                  style={ITEM_IMAGE}
                  source={{ uri: item.image }}
                  resizeMode={FastImage.resizeMode.contain}
                />

                <View style={ITEM_TEXT_CONTAINER}>
                  <Text text={item.name} />
                  <Text text={item.type} />
                </View>
              </Pressable>
            )}
          />
        )}
      </Screen>
    </View>
  )
}

const FULL: ViewStyle = { flex: 1 }
const ITEM_CONTAINER: ViewStyle = { width: "100%" }
const ITEM_TEXT_CONTAINER: ViewStyle = { paddingLeft: 25 }
const ITEM_IMAGE: ImageStyle = { width: "90%", height: 200, alignSelf: "center" }
