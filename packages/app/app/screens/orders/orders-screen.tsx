import React, { useEffect, useState } from "react"
import { FlatList, Pressable, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import FastImage from "react-native-fast-image"
import { OrderProps, OrderRoute } from "../../navigators/order"
import { OrderModel } from "../../firestore/collections"
import firestore from "@react-native-firebase/firestore"
import { useUser } from "../../contexts/user"
import { Customer } from "../../firestore/collections/customer"
import { Card, View } from "react-native-ui-lib"

const ROOT: ViewStyle = {
  flex: 1,
}

interface Props extends OrderProps<OrderRoute.List> {
}

export const OrdersScreen = ({ navigation }: Props) => {
  const user = useUser()
  const [orders, setOrders] = useState<OrderModel[]>([])

  useEffect(() => {
    async function fetchData() {
      const customer = await firestore().doc<Customer>(`/customers/${user.customer.id}/`).get()

      const res = await firestore().collection<OrderModel>("/orders/").where("customerId", "==", customer.ref).get()
      const items: OrderModel[] = []

      console.log(user.customer.id)

      for (const item of res.docs) {
        items.push({
          id: item.id,
          ...item.data(),
        })
      }

      setOrders(items)
    }

    if (user.customer) {
      fetchData()
    }
  }, [])

  return (
    <Screen testID="OrdersScreen" style={ROOT} preset="fixed">
      <View>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={[...orders]}
          contentContainerStyle={{ height: "100%", marginHorizontal: 10 }}
          renderItem={({ item }) => (
            <Card
              style={{ flexDirection: "row", paddingVertical: 25, paddingHorizontal: 10 }}
              onPress={() => navigation.navigate(OrderRoute.Tracking, { id: item.id })}
            >
              <View>
                <Text text={`ID: #${item.id}`} />
                <Text text={item.createdAt.toDate().toLocaleTimeString()} />
              </View>
            </Card>
          )}
        />
      </View>
    </Screen>
  )
}
