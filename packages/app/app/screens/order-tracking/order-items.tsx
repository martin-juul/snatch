import React from "react"
import { View } from "react-native-ui-lib"
import { OrderItemModel } from "../../firestore/collections"
import { FlatList, ViewStyle } from "react-native"
import { Text } from "../../components"

interface Props {
  items: OrderItemModel[]
}

export const OrderItems = ({ items }: Props) => {

  return (
    <FlatList<OrderItemModel>
      data={items}
      keyExtractor={item => `${item.name}_${item.quantity}`.replace(" ", "_")}
      contentContainerStyle={CONTENT_CONTAINER}
      renderItem={({ item }) => (
        <View style={ITEM_CONTAINER}>
          <Text text={item.name} />
          <Text>Qty {item.quantity}</Text>
        </View>
      )}
    />
  )
}

const CONTENT_CONTAINER: ViewStyle = {
  flex: 2,
  marginHorizontal: 10,
}

const ITEM_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
