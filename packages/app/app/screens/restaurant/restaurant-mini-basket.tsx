import React, { useEffect, useState } from "react"
import { Card, View } from "react-native-ui-lib"
import { useAppSelector } from "../../store"
import { Text } from "../../components"
import { ViewStyle } from "react-native"
import Fontisto from "react-native-vector-icons/Fontisto"
import { useNavigation } from "@react-navigation/native"
import { RestaurantRoute } from "../../navigators/restaurant"

export const RestaurantMiniBasket = () => {
  const navigation = useNavigation()

  const basket = useAppSelector(state => state.basket)
  const [quantity, setQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState("0")

  useEffect(() => {
    let price = 0
    let qty = 0

    for (const item of basket.items) {
      price += item.itemPrice * item.quantity
      qty += item.quantity
    }

    setTotalPrice((price / 100).toFixed(2).replace(".", ","))
    setQuantity(qty)
  }, [basket.items])

  if (basket.items.length < 1) {
    return null
  }

  return (
    <Card
      style={ROOT}
      row
      enableShadow
      onPress={() => navigation.navigate(RestaurantRoute.Basket)}
    >
      <View style={{ flexDirection: "row" }}>
        <Fontisto name="shopping-basket" size={24} />
        <Text style={{ marginLeft: 10 }}>({quantity})</Text>
      </View>
      <Text>Total {totalPrice} kr.</Text>
    </Card>
  )
}

const ROOT: ViewStyle = {
  justifyContent: "space-between",
  paddingVertical: 10,
  paddingHorizontal: 35,
  marginHorizontal: 15,
  marginBottom: 15,
}
