import React, { useEffect, useState } from "react"
import { ViewStyle } from "react-native"
import { OrderProps, OrderRoute } from "../../navigators/order"
import { Screen } from "../../components"
import { Chat } from "./chat"
import { findOrderById, OrderModel } from "../../firestore/collections"
import { OrderItems } from "./order-items"
import { DriverPosition } from "./driver-position"

interface Props extends OrderProps<OrderRoute.Tracking> {
}

export const OrderTrackingScreen = ({ route }: Props) => {
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

          <Chat orderId={order.id} />
          <OrderItems items={order.items} />
        </>
      )}
    </Screen>
  )
}

const ROOT: ViewStyle = {
  flex: 1,
}

