import * as React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { RestaurantsNavigator } from "./restaurant"
import { OrderNavigator } from "./order/order-navigator"
import { OrderTrackingScreen } from "../screens"
import Feather from "react-native-vector-icons/Feather"

export enum MainRoute {
  Restaurant = "Restaurant",
  OrderTracking = "OrderTracking",
  Orders = "Orders",
}

export type MainParamList = {
  [MainRoute.Restaurant]: undefined
  [MainRoute.OrderTracking]: undefined
  [MainRoute.Orders]: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<MainParamList>()

export const MainNavigator = () => (
  <Navigator
    initialRouteName={MainRoute.Restaurant}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string

        switch (route.name) {
          case MainRoute.Orders:
            iconName = "list"
            break
          case MainRoute.OrderTracking:
            iconName = "map-pin"
            break
          case MainRoute.Restaurant:
            iconName = "home"
            break
        }

        return <Feather name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Screen name={MainRoute.Restaurant} component={RestaurantsNavigator} />
    <Screen name={MainRoute.OrderTracking} component={OrderTrackingScreen} />
    <Screen name={MainRoute.Orders} component={OrderNavigator} />
  </Navigator>
)

const tabBarIcon = () => {
}

const exitRoutes = ["Restaurant", "OrderTracking", "Orders"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
