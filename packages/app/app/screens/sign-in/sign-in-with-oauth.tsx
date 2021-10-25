import React from "react"
import { useAuth } from "../../contexts/auth"
import { View } from "react-native-ui-lib"
import { GoogleSignIn } from "../../components"
import { AppleButton } from "@invertase/react-native-apple-authentication"
import { ViewStyle } from "react-native"

export const SignInWithOauth = () => {
  const auth = useAuth()

  return (
    <View testID="SignInWithOauth">
      <GoogleSignIn />

      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={APPLE_BUTTON}
        onPress={() => auth.authenticate.appleSignIn()}
      />
    </View>
  )
}

const APPLE_BUTTON: ViewStyle = {
  width: 160,
  height: 45,
}
