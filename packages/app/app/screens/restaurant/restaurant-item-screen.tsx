import React, { useCallback, useEffect, useState } from "react"
import { Button, Screen, Text } from "../../components"
import { View } from "react-native-ui-lib"
import { TextStyle, ViewStyle } from "react-native"
import FastImage from "react-native-fast-image"
import { RestaurantProps, RestaurantRoute } from "../../navigators/restaurant"
import firestore from "@react-native-firebase/firestore"
import { OrderItemModel, RestaurantMenuItem } from "../../firestore/collections"
import { useLanguage } from "../../contexts/language"
import { addItemToBasket, setBasketRestaurantId } from "../../store/basket"
import NumericInput from "rn-numeric-input"
import { useAppDispatch, useAppSelector } from "../../store"


interface Props extends RestaurantProps<RestaurantRoute.Item> {
}


export const RestaurantItemScreen = ({ route, navigation }: Props) => {
  const lang = useLanguage()
  const basket = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch()
  const [item, setItem] = useState<RestaurantMenuItem>()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    async function fetchData() {
      const res = await firestore().doc<RestaurantMenuItem>(`restaurant/${route.params.restaurantId}/menu-items/${route.params.itemId}`).get()
      const model = res.data()
      model.id = res.id
      setItem(model)
    }

    fetchData()
  }, [])

  const addItem = () => {
    if (!basket.restaurantId) {
      dispatch(setBasketRestaurantId(route.params.restaurantId))
    }

    if (basket.restaurantId !== route.params.restaurantId) {
      console.log(basket.restaurantId, route.params.restaurantId)
      // TODO: show message to user that a basket can only be associated with 1 restaurant
      return
    }

    const model: OrderItemModel = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      productCode: item.productCode,
      quantity,
    }

    dispatch(addItemToBasket(model))

    console.log(basket)

    navigation.goBack()
  }

  return (
    <Screen style={SCREEN}>
      {item
        ? <>
          <FastImage source={{ uri: item.image }} style={IMAGE} />

          <View>
            <Text text={item.name} />
            <Text text={item.type[lang.currentLanguage]} />

            <View style={PRICE_CONTAINER}>
              <Text tx="common.price" style={PRICE_LABEL} />
              <Text text={(item.price / 100).toFixed(2).replace(".", ",") + "kr."} />
            </View>
          </View>

          <View style={QUANTITY_CONTAINER}>
            <Text style={QUANTITY}>Quantity</Text>
            <NumericInput
              rounded
              value={quantity}
              onChange={value => setQuantity(value)}
              maxValue={10}
            />

          </View>

          <View style={BUTTON_CONTAINER}>
            <Button tx="addToBasket" preset="primary" onPress={() => addItem()} />
          </View>
        </>
        : <>
          <View>
            <Text>Loading</Text>
          </View>
        </>}
    </Screen>
  )
}

const SCREEN: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const IMAGE = {
  height: 200,
}

const PRICE_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const PRICE_LABEL: TextStyle = {
  marginRight: 8,
}

const BUTTON_CONTAINER: ViewStyle = {
  marginTop: 40,
}

const QUANTITY_CONTAINER: ViewStyle = {
  marginTop: 10,
}

const QUANTITY: TextStyle = {
  marginBottom: 10,
  textAlign: "center",
}
