import React from "react"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { OrderDetailScreen, OrdersScreen, OrderTrackingChatScreen, OrderTrackingScreen } from "../../screens"
import { RouteProp } from "@react-navigation/native"

export enum OrderRoute {
  List = "OrdersList",
  Detail = "OrderDetail",
  Chat = "OrderTrackingChat",
  Tracking = "OrderTracking",
}

export type OrderParamList = {
  [OrderRoute.List]: undefined
  [OrderRoute.Detail]: { id: string }
  [OrderRoute.Tracking]: { customerId: string, orderId: string }
  [OrderRoute.Chat]: { orderId }
}

export type OrderNavigationProp<RouteName extends keyof OrderParamList> = StackNavigationProp<OrderParamList,
  RouteName>
export type OrderRouteProp<RouteName extends keyof OrderParamList> = RouteProp<OrderParamList, RouteName>

export interface OrderProps<RouteName extends keyof OrderParamList> {
  navigation: OrderNavigationProp<RouteName>
  route: OrderRouteProp<RouteName>
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
