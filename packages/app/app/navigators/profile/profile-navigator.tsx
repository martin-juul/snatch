import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { ProfileDetailScreen } from "../../screens"
import { ProfileRoute } from "./types"


export type ProfileParamList = {
  [ProfileRoute.Detail]: undefined
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
