import React, { useEffect, useState } from "react"
import { FlatList, TextStyle, ViewStyle } from "react-native"
import { Card, SkeletonView, View } from "react-native-ui-lib"
import firestore from "@react-native-firebase/firestore"
import { Collection, RestaurantMenuItem, RestaurantModel } from "../../firestore/collections"
import { Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { RestaurantProps, RestaurantRoute } from "../../navigators/restaurant"
import { useLanguage } from "../../contexts/language"
import { RestaurantMiniBasket } from "./restaurant-mini-basket"

interface Props extends RestaurantProps<RestaurantRoute.Detail> {
}

export const RestaurantDetailScreen = ({ route, navigation }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [restaurant, setRestaurant] = useState<RestaurantModel>()
  const [menuItems, setMenuItems] = useState<RestaurantMenuItem[]>()
  const { currentLanguage } = useLanguage()

  useEffect(() => {
    async function fetchData() {
      const res = await firestore().collection<RestaurantModel>(Collection.Restaurants).doc(route.params.restaurantId).get()

      // TODO: show a nice modal instead of borking the app
      if (!res.exists) {
        throw new Error("Restaurant does not exist!")
      }

      const item = res.data()
      item.id = res.id

      setRestaurant(item)
    }

    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      const res = await firestore().collection<RestaurantMenuItem>(`restaurant/${restaurant.id}/menu-items`).get()
      const items: RestaurantMenuItem[] = []

      for (const item of res.docs) {
        const doc = item.data()
        doc.id = item.id

        items.push(doc)
      }

      setMenuItems(items)
    }

    if (restaurant) {
      fetchData()
    }
  }, [restaurant])

  useEffect(() => {
    if (menuItems) {
      setIsLoaded(true)
    }
  }, [menuItems])

  const goToItem = (itemId: string) => {
    navigation.navigate(RestaurantRoute.Item, { restaurantId: restaurant.id, itemId })
  }

  const renderItem = (item: RestaurantMenuItem) => (
    <Card style={{ marginTop: 10, padding: 5 }} onPress={() => goToItem(item.id)}>
      <Text style={LIST_TEXT}>{item.name}</Text>

      <View style={LIST_ITEM_TEXT_CONTAINER}>
        <Text style={LIST_SUB_TEXT}>{item.type[currentLanguage]}</Text>
        <Text style={[LIST_SUB_TEXT, { marginTop: 8 }]}>{item.description[currentLanguage]}</Text>
      </View>

      <Text style={LIST_PRICE_TEXT}>{(item.price / 100).toString().replace(".", ",")} kr.</Text>
    </Card>
  )

  return (
    <Screen style={ROOT} preset="fixed" statusBar="dark-content">

      <SkeletonView
        showContent={isLoaded}
        renderContent={() => (
          <>
            <View style={RESTAURANT_CONTAINER}>
              <Text preset="header" text={restaurant.name} />

              <View style={RESTAURANT_TYPE_CONTAINER}>
                <Text text={restaurant.type} preset="fieldLabel" />
              </View>
            </View>

            <FlatList<RestaurantMenuItem>
              contentContainerStyle={FLAT_LIST}
              data={[...menuItems]}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => renderItem(item)}
            />
          </>
        )}
      />

      <RestaurantMiniBasket />
    </Screen>
  )
}

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
}

const RESTAURANT_CONTAINER: ViewStyle = {
  paddingHorizontal: 20,
}

const RESTAURANT_TYPE_CONTAINER: ViewStyle = {
  marginTop: 5,
}

const LIST_ITEM_TEXT_CONTAINER: ViewStyle = {
  flexDirection: "column",
}

const LIST_TEXT: TextStyle = {
  fontWeight: "600",
  marginLeft: 10,
}
const LIST_SUB_TEXT: TextStyle = {
  color: color.dim,
  fontSize: 12,
  fontWeight: "500",
  marginLeft: 10,
  width: 240,
}
const LIST_PRICE_TEXT: TextStyle = {
  textAlign: "right",
  marginTop: -20,
  alignSelf: "flex-end",
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

// TODO: Fix image prop check
/**
 <View>
 {typeof restaurant.image !== 'undefined' && (
            <FastImage
              style={{ width: "100%", height: 200 }}
              source={{
                uri: restaurant.image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
 </View>
 */
