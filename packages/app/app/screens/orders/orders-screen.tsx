import React, { useCallback, useEffect, useState } from "react"
import { FlatList, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { OrderProps, OrderRoute } from "../../navigators/order"
import { OrderModel } from "../../firestore/collections"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { useUser } from "../../contexts/user"
import { findCustomerById } from "../../firestore/collections/customer"
import { Card, View } from "react-native-ui-lib"

interface Props extends OrderProps<OrderRoute.List> {
}

export const OrdersScreen = ({ navigation }: Props) => {
  const user = useUser()
  const [orders, setOrders] = useState<OrderModel[]>([])

  const refresh = useCallback(() => {
    async function fetchData() {
      const customer = await findCustomerById(user.customer.id)

      const res = await firestore().collection<OrderModel>("/orders/").where("customerId", "==", customer.ref).get()
      const items: OrderModel[] = []

      for (const item of res.docs) {
        items.push({
          id: item.id,
          ...item.data(),
        })
      }

      items.sort((a, b) => {
        if ((a.createdAt.toDate() as Date).valueOf() < (b.createdAt.toDate() as Date).valueOf()) {
          return 1
        }

        return -1
      })

      setOrders(items)
    }

    if (user.customer) {
      fetchData()
    }
  }, [user.customer.id])

  useEffect(() => {
    refresh()
  }, [])

  return (
    <Screen testID="OrdersScreen" style={ROOT} preset="fixed">
      <View>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={[...orders]}
          contentContainerStyle={LIST_CONTAINER}
          renderItem={({ item }) => (
            <Card
              style={CARD}
              onPress={() => navigation.navigate(OrderRoute.Tracking, {
                orderId: item.id,
                customerId: user.customer.id,
              })}
            >
              <View>
                <Text text={`ID: #${item.id}`} />
              </View>

              <View style={CARD_DATE}>
                <Text text={(item.createdAt as FirebaseFirestoreTypes.Timestamp).toDate().toLocaleDateString()} />
                <Text text={(item.createdAt as FirebaseFirestoreTypes.Timestamp).toDate().toLocaleTimeString()} />
              </View>
            </Card>
          )}
        />
      </View>
    </Screen>
  )
}

const ROOT: ViewStyle = {
  flex: 1,
}

const LIST_CONTAINER: ViewStyle = {
  height: "100%",
  marginHorizontal: 10,
}

const CARD: ViewStyle = {
  marginTop: 10,
  paddingHorizontal: 10,
  paddingVertical: 25,
}

const CARD_DATE: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
