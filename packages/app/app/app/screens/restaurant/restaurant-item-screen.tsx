import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text } from "../../components"
import { FoodMenuItem } from "../../models/food-menu-item/food-menu-item"
import { ImageStyle, View, ViewStyle } from "react-native"
import { MOCK_FOOD_ITEMS, MOCK_RESTAURANT, Restaurant } from "./mock"
import { useNavigation } from "@react-navigation/native"
import FastImage from "react-native-fast-image"

const FULL: ViewStyle = { flex: 1 }

const IMAGE: ImageStyle = {
  height: 300,
  width: 300,
}

export const RestaurantItemScreen = observer(() => {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const [restaurant, setRestaurant] = useState<Restaurant>(MOCK_RESTAURANT)
  const [item, setItem] = useState<FoodMenuItem>()

  useEffect(() => {
    setItem(MOCK_FOOD_ITEMS[0])
  }, [])

  if (!item) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  return (
    <View testID="RestaurantItemScreen" style={FULL}>
      <Screen statusBar="dark-content" style={{ alignItems: "center" }}>
        <Header
          headerText={restaurant.name}
          leftIcon="back"
          onLeftPress={goBack}
        />

        <FastImage source={{ uri: item.image }} style={IMAGE} />

        <View style={{ alignItems: 'flex-start' }}>
          <Text text={item.name} />
          <Text text={item.type} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text tx="common.price" style={{ marginRight: 8 }} />
            <Text text={(item.price / 100).toString().replace('.', ',') + ' kr.'} />
          </View>
        </View>

        <View style={{ marginTop: 50 }}>
          <Button tx="common.buy" preset="primary" />
        </View>
      </Screen>
    </View>
  )
})
