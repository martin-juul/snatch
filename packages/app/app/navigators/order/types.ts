import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import { OrderParamList } from "./order-navigator"

export enum OrderRoute {
  List = "OrdersList",
  Detail = "OrderDetail",
  Chat = "OrderTrackingChat",
  Tracking = "OrderTracking",
}

export type OrderNavigationProp<RouteName extends keyof OrderParamList> = StackNavigationProp<OrderParamList,
  RouteName>
export type OrderRouteProp<RouteName extends keyof OrderParamList> = RouteProp<OrderParamList, RouteName>

export interface OrderProps<RouteName extends keyof OrderParamList> {
  navigation: OrderNavigationProp<RouteName>
  route: OrderRouteProp<RouteName>
}
