import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"

export enum RestaurantRoute {
  List = "List",
  Detail = "Detail",
  Item = "Item",
  Basket = "Basket"
}

export type RestaurantParamList = {
  [RestaurantRoute.List]: undefined
  [RestaurantRoute.Detail]: {
    restaurantId: string
  }
  [RestaurantRoute.Item]: {
    restaurantId: string
    itemId: string
  }
  [RestaurantRoute.Basket]: undefined
}

export type RestaurantNavigationProp<RouteName extends keyof RestaurantParamList> = StackNavigationProp<RestaurantParamList, RouteName>
export type RestaurantRouteProp<RouteName extends keyof RestaurantParamList> = RouteProp<RestaurantParamList, RouteName>

export interface RestaurantProps<RouteName extends keyof RestaurantParamList> {
  navigation: RestaurantNavigationProp<RouteName>
  route: RestaurantRouteProp<RouteName>
}
