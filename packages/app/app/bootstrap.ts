import { enableScreens } from "react-native-screens"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { Platform } from "react-native"

export async function bootstrap() {
  enableScreens()

  const webClientId = Platform.select({
    android: "81702780710-koheumf9pu03q6edihbu6sg1upnob879.apps.googleusercontent.com",
    ios: "81702780710-m637qgdc0dvd67db271bt5ctfeeuoo2b.apps.googleusercontent.com",
  })

  GoogleSignin.configure({
    webClientId,
  })
}
