import * as React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { RestaurantsNavigator } from "./restaurant"
import { OrderNavigator } from "./order"
import Feather from "react-native-vector-icons/Feather"
import { Pressable } from "react-native"

export enum MainRoute {
  Restaurants = "Restaurants",
  OrderTracking = "OrderTracking",
  Orders = "Orders",
}

export type MainParamList = {
  [MainRoute.Restaurants]: undefined
  [MainRoute.OrderTracking]: undefined
  [MainRoute.Orders]: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<MainParamList>()

export const MainNavigator = () => (
  <Navigator
    initialRouteName={MainRoute.Restaurants}
    screenOptions={({ navigation, route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string

        switch (route.name) {
          case MainRoute.Orders:
            iconName = "list"
            break
          case MainRoute.Restaurants:
            iconName = "home"
            break
        }

        return <Feather name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
      headerRight: ({ tintColor }) => (
        <Pressable onPress={() => navigation.navigate('settingsStack')} style={{ marginRight: 12 }}>
          <Feather name="settings" size={24} color={tintColor} />
        </Pressable>
      )
    })}
  >
    <Screen name={MainRoute.Restaurants} component={RestaurantsNavigator} />
    <Screen name={MainRoute.Orders} component={OrderNavigator} />
  </Navigator>
)

const exitRoutes = ["Restaurant", "OrderTracking", "Orders"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
