import React from "react"
import { Button, Screen } from "../../components"
import { ViewStyle } from "react-native"
import { useAuth } from "../../contexts/auth"
import { color } from "../../theme"

export const SettingsScreen = () => {
  const auth = useAuth()

  return (
    <Screen style={ROOT}>

      <Button
        preset="link"
        onPress={() => auth.signOut()}
        text="Sign out"
        textStyle={{ color: color.palette.blue }}
        style={{ alignSelf: "center" }}
      />
    </Screen>
  )
}

const ROOT: ViewStyle = {
  flex: 1,
}
