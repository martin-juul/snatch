import React, { useEffect, useState } from "react"
import { FlatList, Pressable, TextStyle, View, ViewStyle } from "react-native"
import firestore from "@react-native-firebase/firestore"
import { Collection, RestaurantMenuItem, RestaurantModel } from "../../firestore/collections"
import { Header, Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { RestaurantProps, RestaurantRoute } from "../../navigators/restaurant"
import { useLanguage } from "../../contexts/language"

interface Props extends RestaurantProps<RestaurantRoute.Detail> {
}

export const RestaurantDetailScreen = ({ route, navigation }: Props) => {
  const [restaurant, setRestaurant] = useState<RestaurantModel>()
  const [menuItems, setMenuItems] = useState<RestaurantMenuItem[]>()
  const { currentLanguage } = useLanguage()

  useEffect(() => {
    async function fetchData() {
      const res = await firestore().collection<RestaurantModel>(Collection.Restaurants).doc(route.params.id).get()

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

  return (
    <View testID="RestaurantDetailScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" statusBar="dark-content">
        <Header
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />


        {restaurant && (
          <View style={RESTAURANT_CONTAINER}>
            <Text preset="header" text={restaurant.name} />

            <View style={RESTAURANT_TYPE_CONTAINER}>
              <Text text={restaurant.type} preset="fieldLabel" />
            </View>
          </View>
        )}

        {menuItems && (
          <FlatList
            contentContainerStyle={FLAT_LIST}
            data={[...menuItems]}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Pressable onPress={() => navigation.navigate(RestaurantRoute.Order)}>
                <View style={LIST_CONTAINER}>

                  <View style={LIST_ITEM_CONTAINER}>
                    <View style={LIST_ITEM_TEXT_CONTAINER}>
                      <Text style={LIST_TEXT}>{item.name}</Text>
                      <Text style={LIST_SUB_TEXT}>{item.type[currentLanguage]}</Text>
                      <Text style={LIST_SUB_TEXT}>{item.description[currentLanguage]}</Text>
                    </View>

                    <Text style={LIST_PRICE_TEXT}>
                      {(item.price / 100).toString().replace(".", ",")} kr.
                    </Text>
                  </View>
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

const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.background,
}

const RESTAURANT_CONTAINER: ViewStyle = {
  paddingHorizontal: 20,
}

const RESTAURANT_TYPE_CONTAINER: ViewStyle = {
  marginTop: 5,
}

const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: 10,
}

const LIST_ITEM_CONTAINER: ViewStyle = {
  alignItems: "stretch",
  width: "80%",
}

const LIST_ITEM_TEXT_CONTAINER: ViewStyle = {
  flexDirection: "column",
}

// const IMAGE: ImageStyle = {
//   borderRadius: 35,
//   height: 65,
//   width: 65,
// }

const LIST_TEXT: TextStyle = {
  fontWeight: "600",
  marginLeft: 10,
}
const LIST_SUB_TEXT: TextStyle = {
  color: color.dim,
  fontWeight: "500",
  marginLeft: 10,
  width: 240,
}
const LIST_PRICE_TEXT: TextStyle = {
  textAlign: "right",
  marginTop: -20,
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
