import crashlytics from "@react-native-firebase/crashlytics"

export class SettingsSaveError extends Error {

  constructor() {
    super("Could not save settings")

    crashlytics().recordError(this, "SettingsSaveError")
  }
}
