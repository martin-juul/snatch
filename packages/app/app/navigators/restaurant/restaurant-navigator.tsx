import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  RestaurantBasketScreen,
  RestaurantItemScreen,
  RestaurantListScreen,
  RestaurantDetailScreen,
} from "../../screens"
import { RestaurantRoute } from "./types"


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
    <RestaurantStack.Screen
      name={RestaurantRoute.Item}
      component={RestaurantItemScreen}
    />
    <RestaurantStack.Screen
      name={RestaurantRoute.Basket}
      component={RestaurantBasketScreen}
    />
  </RestaurantStack.Navigator>
)
