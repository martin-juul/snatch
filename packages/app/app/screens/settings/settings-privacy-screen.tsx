import React, { useState } from "react"
import { Screen, Text } from "../../components"
import { Switch } from "react-native-ui-lib"
import { useSettings } from "../../contexts/settings"
import { ViewStyle } from "react-native"

export const SettingsPrivacyScreen = () => {
  const settings = useSettings()

  const [enableCrashlytics, _setEnableCrashlytics] = useState<boolean>(settings.value?.privacy?.enableCrashlytics || true)

  const setEnableCrashlytics = (enabled: boolean) => {
    settings.methods.setPrivacy({
      enableCrashlytics,
    })

    _setEnableCrashlytics(enabled)
  }

  return (
    <Screen testID="SettingsLanguageScreen" style={ROOT}>

      <Text text="Allow crash reporting" />
      <Switch
        testID="crashlyticsSwitch"
        value={enableCrashlytics}
        onValueChange={value => setEnableCrashlytics(value)}
      />

    </Screen>
  )
}

const ROOT: ViewStyle = {
  flex: 1,
  marginHorizontal: 12,
}
