// Polyfills
import "react-native-get-random-values"

// Dependencies
import { enableScreens } from "react-native-screens"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import Config from "react-native-config"

import firestore from "@react-native-firebase/firestore"

export async function bootstrap() {
  enableScreens()

  GoogleSignin.configure({
    webClientId: Config.FIREBASE_AUTH_WEB_CLIENT_ID,
  })

  firestore.setLogLevel(__DEV__ ? "debug" : "error")
}
