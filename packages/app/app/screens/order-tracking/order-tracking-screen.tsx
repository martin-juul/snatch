import React, { useEffect, useState } from "react"
import { ViewStyle } from "react-native"
import { OrderProps, OrderRoute } from "../../navigators/order"
import { Button, Screen } from "../../components"
import { findOrderById, OrderModel } from "../../firestore/collections"
import { OrderItems } from "./order-items"
import { DriverPosition } from "./driver-position"

interface Props extends OrderProps<OrderRoute.Tracking> {
}

export const OrderTrackingScreen = ({ route, navigation }: Props) => {
  const [order, setOrder] = useState<OrderModel>()

  useEffect(() => {
    async function fetchData() {
      const order = await findOrderById(route.params.orderId)

      setOrder(order.data())
    }

    fetchData()
  }, [route.params.customerId, route.params.orderId])

  return (
    <Screen testID="OrderTrackingScreen" style={ROOT}>
      {order && (
        <>
          <DriverPosition />

          <Button
            testID="chat"
            text="Chat"
            onPress={() => navigation.navigate(OrderRoute.Chat, { orderId: order.id })}
            preset="secondary"
            style={CHAT_BUTTON}
          />

          <OrderItems items={order.items} />
        </>
      )}
    </Screen>
  )
}

const ROOT: ViewStyle = {
  flex: 1,
}

const CHAT_BUTTON: ViewStyle = {
  height: 50,
  width: "50%",
  alignSelf: "center",
  marginVertical: 10,
}
