import React, { useEffect, useState } from "react"
import { Button, Screen, Text } from "../../components"
import { FlatList, StyleSheet, TextStyle, ViewStyle } from "react-native"
import { RestaurantProps, RestaurantRoute } from "../../navigators/restaurant"
import { useAppDispatch, useAppSelector } from "../../store"
import { OrderItemModel, OrderModel } from "../../firestore/collections"
import { Card, View } from "react-native-ui-lib"
import NumericInput from "rn-numeric-input"
import { clearBasket, removeItemFromBasket, updateBasketItemQuantity } from "../../store/basket"
import { color } from "../../theme"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { useUser } from "../../contexts/user"
import { OrderRoute } from "../../navigators/order"

export interface Props extends RestaurantProps<RestaurantRoute.Basket> {
}

export const RestaurantBasketScreen = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch()
  const basket = useAppSelector(state => state.basket)
  const { customer } = useUser()
  const [totalPrice, setTotalPrice] = useState("0")

  useEffect(() => {
    let price = 0

    for (const item of basket.items) {
      price += item.itemPrice * item.quantity
    }

    setTotalPrice((price / 100).toFixed(2).replace(".", ","))
  }, [basket.items])

  const onBuy = async () => {
    const fbCustomer = await firestore().doc(`/customers/${customer.id}/`).get()
    const restaurant = await firestore().doc(`/restaurant/${basket.restaurantId}/`).get()

    if (!fbCustomer.exists || !restaurant.exists) {
      throw new Error("Something went wrong")
    }

    const order: OrderModel = {
      customerId: fbCustomer.ref,
      restaurantId: restaurant.ref,
      items: basket.items,
      status: "pending",
      deliveryDistance: 10000,
      deliveryFee: 2900,
      deliveryLocation: customer.location,
      createdAt: FirebaseFirestoreTypes.Timestamp.fromDate(new Date()),
    }

    firestore().collection<OrderModel>("orders").add(order)
      .then(() => {
        dispatch(clearBasket())
        navigation.navigate(OrderRoute.List)
      })
      .catch(console.error)
  }

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
          onChange={value => {
            if (value > 0) {
              dispatch(updateBasketItemQuantity({ itemRef: item.itemRef, quantity: value }))
            } else {
              dispatch(removeItemFromBasket(item.itemRef))
            }
          }}
          maxValue={10}
        />
      </View>

      <View>
        <Text text={((item.itemPrice * item.quantity) / 100).toFixed(2).replace(".", ",") + "kr."} />
      </View>

      <View>
        <Button
          onPress={() => dispatch(removeItemFromBasket(item.itemRef))}
          text="X"
          preset="link"
          textStyle={{ color: color.palette.angry }}
        />
      </View>
    </View>
  )

  return (
    <Screen style={ROOT}>

      <FlatList<OrderItemModel>
        data={basket.items}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={(item) => item.itemRef}
      />

      <Card
        style={DETAIL}
      >
        <Text preset="header" style={TOTAL_TEXT}>Total: {totalPrice}kr.</Text>

        <Button
          tx="common.buy"
          onPress={onBuy}
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
