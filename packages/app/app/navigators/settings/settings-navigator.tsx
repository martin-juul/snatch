import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { SettingsScreen } from "../../screens"

export enum SettingsRoute {
  List = "Settings"
}

export type SettingsParamList = {
  [SettingsRoute.List]: undefined
}

const { Navigator, Screen } = createStackNavigator<SettingsParamList>()

export const SettingsNavigator = () => (
  <Navigator>
    <Screen name={SettingsRoute.List} component={SettingsScreen} />
  </Navigator>
)
