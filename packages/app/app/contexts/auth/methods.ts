import auth from "@react-native-firebase/auth"
import { appleAuth } from "@invertase/react-native-apple-authentication"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { FirebaseAuthResponse } from "./interfaces"
import { FIREBASE_AUTH_ERROR } from "./error-codes"

export const _createUserWithEmailAndPassword = async (email: string, password: string): Promise<FirebaseAuthResponse> => {
  try {
    const credential = await auth().createUserWithEmailAndPassword(email, password)
    console.log("auth@createUserWithEmailAndPassword: created user successfully")

    return credential
  } catch (e) {
    if (e.code === FIREBASE_AUTH_ERROR.EMAIL_ALREADY_IN_USE) {
      console.log("That email address is already in use!")
    }

    if (e.code === FIREBASE_AUTH_ERROR.INVALID_EMAIL) {
      console.log("That email address is invalid!")
    }

    return {
      success: false,
      error: {
        code: e.code,
        message: e.message,
      },
    }
  }
}

export const _signInWithEmailAndPassword = async (email: string, password: string): Promise<FirebaseAuthResponse> => {
  try {
    const credential = await auth().signInWithEmailAndPassword(email, password)

    console.log("auth@signInWithEmailAndPassword: signed user in successfully")

    return credential
  } catch (e) {
    return {
      success: false,
      error: {
        code: e.code,
        message: e.message,
      },
    }
  }
}

export const _appleSignIn = async (): Promise<FirebaseAuthResponse> => {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  })

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    return {
      success: false,
      error: {
        code: FIREBASE_AUTH_ERROR.APPLE_SIGN_IN_MISSING_IDENTITY_TOKEN,
        message: "Apple Sign-In failed - missing identify token",
      },
    }
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse
  const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential)
}

export const _googleSignIn = async (): Promise<FirebaseAuthResponse> => {
  try {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential)
  } catch (e) {
    return {
      success: false,
      error: {
        code: e.code,
        message: e.message,
      },
    }
  }
}
