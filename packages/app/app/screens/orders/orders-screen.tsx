import React from "react"
import { FlatList, Pressable, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import FastImage from "react-native-fast-image"
import { OrderProps, OrderRoute } from "../../navigators/order"
import { useAppSelector } from "../../store"

const ROOT: ViewStyle = {
  flex: 1,
}

interface Props extends OrderProps<OrderRoute.List> {
}

export const OrdersScreen = ({ navigation }: Props) => {
  const orders = useAppSelector(state => state.orders.orders)

  return (
    <Screen testID="OrdersScreen" style={ROOT} preset="fixed">
      <Text preset="header" text="Orders" />

      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={[...orders]}
        renderItem={({ item }) => (
          <Pressable
            style={{ flexDirection: "row" }}
            onPress={() => navigation.navigate(OrderRoute.Tracking, { id: item.id })}
          >
            <FastImage
              style={{ width: 100, height: 100 }}
              source={{ uri: item.items[0].image }}
              resizeMode={FastImage.resizeMode.contain}
            />

            <Text text={`Order ID: #${item.id}`} />
            <Text text={item.createdAt.toLocaleDateString()} />
          </Pressable>
        )}
      />
    </Screen>
  )
}
