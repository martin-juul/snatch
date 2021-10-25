import { FirebaseAuthTypes } from "@react-native-firebase/auth"

export type FirebaseAuthResponse = FirebaseAuthTypes.UserCredential | FirebaseAuthError

export interface AuthState {
  initializing: boolean
  user: FirebaseAuthTypes.User | undefined
  signOut: () => void
  authenticate: {
    createUserWithEmailAndPassword: (email: string, password: string) => Promise<FirebaseAuthResponse>
    signInWithEmailAndPassword: (email: string, password: string) => Promise<FirebaseAuthResponse>
    appleSignIn: () => Promise<FirebaseAuthResponse>
    googleSignIn: () => Promise<FirebaseAuthResponse>
  }
}

export interface FirebaseAuthError {
  success: false
  error?: {
    code: string
    message: string
  }
}
