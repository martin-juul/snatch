import React, { useEffect, useState } from "react"
import { Button, Screen, Text } from "../../components"
import { FlatList, StyleSheet, TextStyle, ViewStyle } from "react-native"
import { RestaurantProps, RestaurantRoute } from "../../navigators/restaurant"
import { useAppDispatch, useAppSelector } from "../../store"
import { OrderItemModel } from "../../firestore/collections"
import { Card, View } from "react-native-ui-lib"
import NumericInput from "rn-numeric-input"
import { updateBasketItemQuantity } from "../../store/basket"
import { color } from "../../theme"

export interface Props extends RestaurantProps<RestaurantRoute.Basket> {

}

export const RestaurantBasketScreen = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch()
  const basket = useAppSelector(state => state.basket)
  const [totalPrice, setTotalPrice] = useState("0")

  useEffect(() => {
    let price = 0

    for (const item of basket.items) {
      price += item.price * item.quantity
    }

    setTotalPrice((price / 100).toFixed(2).replace(".", ","))
  }, [basket.items])

  const renderRow = (item: OrderItemModel) => (
    <View style={ROW}>
      <View style={ROW_NAME}>
        <Text numberOfLines={1}>{item.name}</Text>
      </View>

      <View>
        <NumericInput
          totalHeight={32}
          rounded
          value={item.quantity}
          onChange={value => dispatch(updateBasketItemQuantity({ id: item.id, quantity: value }))}
          maxValue={10}
        />
      </View>

      <View>
        <Text text={((item.price * item.quantity) / 100).toFixed(2).replace(".", ",") + "kr."} />
      </View>
    </View>
  )

  return (
    <Screen style={ROOT}>

      <FlatList<OrderItemModel>
        data={basket.items}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={(item) => item.id}
      />

      <Card
        style={DETAIL}
      >
        <Text preset="header" style={TOTAL_TEXT}>Total: {totalPrice}kr.</Text>

        <Button
          tx="common.buy"
        />
      </Card>

    </Screen>
  )
}

const ROOT: ViewStyle = {
  flex: 1,
}

const ROW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 8,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: color.dim,
  paddingBottom: 6,
  marginHorizontal: 4,
}

const ROW_NAME: ViewStyle = {
  width: "40%",
}

const DETAIL: ViewStyle = {
  marginHorizontal: 12,
  marginBottom: 12,
  padding: 16,
}

const TOTAL_TEXT: TextStyle = {
  textAlign: "center",
}
