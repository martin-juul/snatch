import React from "react"
import { ViewStyle } from "react-native"
import { View } from "react-native-ui-lib"
import { Header, Screen } from "../../components"
import { color } from "../../theme"
import { SignInWithOauth } from "./sign-in-with-oauth"
import { SignInWithPassword } from "./sign-in-with-password"


export const SignInScreen = () => (
  <Screen testID="SignInScreen" style={ROOT} preset="scroll">
    <Header headerTx="signIn" />

    <View style={SIGN_IN_CONTAINER}>
      <View style={SIGN_IN_WITH_PASSWORD_CONTAINER}>
        <SignInWithPassword />
      </View>

      <SignInWithOauth />
    </View>
  </Screen>
)

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

const SIGN_IN_CONTAINER: ViewStyle = {
  alignItems: "center",
}

const SIGN_IN_WITH_PASSWORD_CONTAINER: ViewStyle = {
  marginTop: "45%",
  marginBottom: "10%",
}
