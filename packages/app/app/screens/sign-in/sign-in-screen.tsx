import React from "react"
import { ViewStyle } from "react-native"
import { View } from "react-native-ui-lib"
import { GoogleSignIn, Screen, Text } from "../../components"
import { color } from "../../theme"
import { AppleButton } from "@invertase/react-native-apple-authentication"
import { useAuth } from "../../contexts/auth"


export const SignInScreen = () => {
  const auth = useAuth()

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="" />

      <View reanimated>
        <GoogleSignIn />

        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160,
            height: 45,
          }}
          onPress={() => auth.authenticate.appleSignIn()}
        />
      </View>
    </Screen>
  )
}

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}
