import React from "react"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import { RestaurantItemScreen, RestaurantListScreen, RestaurantDetailScreen } from "../../screens"

export enum RestaurantRoute {
  List = "List",
  Detail = "Detail",
  Order = "Order",
}

export type RestaurantParamList = {
  [RestaurantRoute.List]: undefined
  [RestaurantRoute.Detail]: {
    id: string
  }
  [RestaurantRoute.Order]: undefined
}

export type RestaurantNavigationProp<RouteName extends keyof RestaurantParamList> = StackNavigationProp<
  RestaurantParamList,
  RouteName
>
export type RestaurantRouteProp<RouteName extends keyof RestaurantParamList> = RouteProp<RestaurantParamList, RouteName>

export interface RestaurantProps<RouteName extends keyof RestaurantParamList> {
  navigation: RestaurantNavigationProp<RouteName>
  route: RestaurantRouteProp<RouteName>
}

const RestaurantStack = createStackNavigator<RestaurantParamList>()

export const RestaurantsNavigator = () => (
  <RestaurantStack.Navigator>
    <RestaurantStack.Screen
      options={{ headerShown: false }}
      name={RestaurantRoute.List}
      component={RestaurantListScreen}
    />
    <RestaurantStack.Screen
      options={{ headerShown: false }}
      name={RestaurantRoute.Detail}
      component={RestaurantDetailScreen}
    />
    <RestaurantStack.Screen name={RestaurantRoute.Order} component={RestaurantItemScreen} />
  </RestaurantStack.Navigator>
)
