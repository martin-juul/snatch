import React, { useEffect, useState } from "react"
import { FlatList, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import FastImage, { ImageStyle } from "react-native-fast-image"
import firestore from "@react-native-firebase/firestore"
import { Collection, RestaurantModel } from "../../firestore/collections"
import { RestaurantProps, RestaurantRoute } from "../../navigators/restaurant"
import { Card, View } from "react-native-ui-lib"
import { spacing } from "../../theme"

interface Props extends RestaurantProps<RestaurantRoute.List> {
}

export const RestaurantListScreen = ({ navigation }: Props) => {
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
    navigation.navigate(RestaurantRoute.Detail, { restaurantId: id })
  }

  return (
    <View testID="RestaurantListScreen" style={FULL}>
      <Screen preset="fixed" statusBar="dark-content">
        {restaurants && (
          <FlatList
            data={restaurants}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                flex
                onPress={() => goToRestaurant(item.id)}
                style={{ padding: 10, marginTop: spacing[4] }}
              >
                <FastImage
                  style={ITEM_IMAGE}
                  source={{ uri: item.image }}
                  resizeMode={FastImage.resizeMode.stretch}
                />

                <View style={{ marginLeft: 20, marginTop: 5 }}>
                  <Text text={item.name} />
                  <Text text={item.type} preset="secondary" />
                </View>
              </Card>
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
