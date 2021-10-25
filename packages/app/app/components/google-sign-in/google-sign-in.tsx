import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import auth from "@react-native-firebase/auth"
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin"
import { GoogleSigninButtonProps } from "@react-native-google-signin/google-signin/src/GoogleSigninButton"

export interface GoogleSignInProps extends GoogleSigninButtonProps {
  style?: StyleProp<ViewStyle>
}

export const GoogleSignIn = (props: GoogleSignInProps) => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn()

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential)
    } catch (e) {
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (e.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  return (
    <GoogleSigninButton
      onPress={() => signIn()}
      {...props}
    />
  )
}
