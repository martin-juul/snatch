import * as React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Feather from "react-native-vector-icons/Feather"
import { Pressable } from "react-native"
import { RestaurantsNavigator } from "./restaurant/restaurant-navigator"
import { OrderNavigator } from "./order/order-navigator"
import { ProfileNavigator } from "./profile/profile-navigator"

export enum MainRoute {
  Profile = "Profile",
  Restaurants = "Restaurants",
  Orders = "Orders",
}

export type MainParamList = {
  [MainRoute.Profile]: undefined
  [MainRoute.Restaurants]: undefined
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
          case MainRoute.Profile:
            iconName = "user"
            break
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
    <Screen name={MainRoute.Profile} component={ProfileNavigator} />
  </Navigator>
)

const exitRoutes = ["Restaurant", "OrderTracking", "Orders"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
