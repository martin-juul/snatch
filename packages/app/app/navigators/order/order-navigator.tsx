import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { OrderDetailScreen, OrdersScreen, OrderTrackingChatScreen, OrderTrackingScreen } from "../../screens"
import { OrderRoute } from "./types"

export type OrderParamList = {
  [OrderRoute.List]: undefined
  [OrderRoute.Detail]: { id: string }
  [OrderRoute.Tracking]: { customerId: string, orderId: string }
  [OrderRoute.Chat]: { orderId }
}

const { Navigator, Screen } = createStackNavigator<OrderParamList>()

export const OrderNavigator = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name={OrderRoute.List} component={OrdersScreen} />
    <Screen name={OrderRoute.Detail} component={OrderDetailScreen} />
    <Screen name={OrderRoute.Tracking} component={OrderTrackingScreen} />
    <Screen name={OrderRoute.Chat} component={OrderTrackingChatScreen} />
  </Navigator>
)
