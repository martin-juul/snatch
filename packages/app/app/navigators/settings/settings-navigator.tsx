import React from "react"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { SettingsLanguageScreen, SettingsScreen } from "../../screens"
import { RouteProp } from "@react-navigation/native"
import { translate } from "../../i18n"

export enum SettingsRoute {
  List = "Settings",
  Language = "Language",
}

export type SettingsParamList = {
  [SettingsRoute.List]: undefined
  [SettingsRoute.Language]: undefined
}

export type SettingsNavigationProp<RouteName extends keyof SettingsParamList> = StackNavigationProp<SettingsParamList, RouteName>
export type SettingsRouteProp<RouteName extends keyof SettingsParamList> = RouteProp<SettingsParamList, RouteName>

export interface SettingsProps<RouteName extends keyof SettingsParamList> {
  navigation: SettingsNavigationProp<RouteName>
  route: SettingsRouteProp<RouteName>
}

const { Navigator, Screen } = createStackNavigator<SettingsParamList>()

export const SettingsNavigator = () => (
  <Navigator>
    <Screen
      name={SettingsRoute.List}
      component={SettingsScreen}
      options={{ headerBackTitle: translate("common.back") }}
    />

    <Screen
      name={SettingsRoute.Language}
      component={SettingsLanguageScreen}
    />
  </Navigator>
)
