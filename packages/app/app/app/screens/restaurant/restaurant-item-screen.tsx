import React, { useEffect, useState } from "react"
import { Button, Screen, Text } from "../../components"
import { TextStyle, View, ViewStyle } from "react-native"
import { FoodMenuItem, MOCK_FOOD_ITEMS } from "./mock"
import FastImage from "react-native-fast-image"

export const RestaurantItemScreen: React.FC = () => {
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
    <View testID="RestaurantItemScreen" style={ROOT}>
      <Screen statusBar="dark-content" style={SCREEN}>
        <FastImage source={{ uri: item.image }} style={IMAGE} />

        <View style={ITEM_CONTAINER}>
          <Text text={item.name} />
          <Text text={item.type} />

          <View style={PRICE_CONTAINER}>
            <Text tx="common.price" style={PRICE_LABEL} />
            <Text
              text={(item.price / 100).toString().replace(".", ",") + " kr."}
            />
          </View>
        </View>

        <View style={BUTTON_CONTAINER}>
          <Button tx="common.buy" preset="primary" />
        </View>
      </Screen>
    </View>
  )
}

const ROOT: ViewStyle = { flex: 1 }

const IMAGE = {
  height: 300,
  width: 300,
}

const SCREEN: ViewStyle = {
  alignItems: "center",
}

const ITEM_CONTAINER: ViewStyle = {
  alignItems: "flex-start",
}

const PRICE_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const PRICE_LABEL: TextStyle = {
  marginRight: 8,
}

const BUTTON_CONTAINER: ViewStyle = {
  marginTop: 50,
}
