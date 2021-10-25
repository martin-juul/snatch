import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { SettingsScreen, SettingsLanguageScreen, SettingsPrivacyScreen } from "../../screens"
import { translate } from "../../i18n"
import { SettingsRoute } from "./types"

export type SettingsParamList = {
  [SettingsRoute.List]: undefined
  [SettingsRoute.Language]: undefined
  [SettingsRoute.Privacy]: undefined
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

    <Screen
      name={SettingsRoute.Privacy}
      component={SettingsPrivacyScreen}
    />
  </Navigator>
)
