import crashlytics from "@react-native-firebase/crashlytics"

export class AuthError extends Error {
  public code: string

  constructor(code: string, message: string) {
    super()
    super.message = message

    this.code = code

    crashlytics().recordError(this, "AuthError")
  }
}
