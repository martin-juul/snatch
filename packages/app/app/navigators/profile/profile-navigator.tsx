import React from "react"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import { ProfileDetailScreen } from "../../screens"

export enum ProfileRoute {
  Detail = "Detail",
}

export type ProfileParamList = {
  [ProfileRoute.Detail]: undefined
}

export type ProfileNavigationProp<RouteName extends keyof ProfileParamList> = StackNavigationProp<ProfileParamList, RouteName>
export type ProfileRouteProp<RouteName extends keyof ProfileParamList> = RouteProp<ProfileParamList, RouteName>

export interface ProfileProps<RouteName extends keyof ProfileParamList> {
  navigation: ProfileNavigationProp<RouteName>
  route: ProfileRouteProp<RouteName>
}

const { Navigator, Screen } = createStackNavigator<ProfileParamList>()

export const ProfileNavigator = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen
      name={ProfileRoute.Detail}
      component={ProfileDetailScreen}
    />
  </Navigator>
)
