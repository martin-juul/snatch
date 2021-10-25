import crashlytics from "@react-native-firebase/crashlytics"

export class SettingsSaveTooManyTriesError extends Error {

  constructor() {
    super("Could not save settings due to too many attempts")

    crashlytics().recordError(this, "SettingsSaveLoopError")
  }
}
