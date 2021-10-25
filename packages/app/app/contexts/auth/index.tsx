import React, { createContext, useContext, useEffect, useState } from "react"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import crashlytics from "@react-native-firebase/crashlytics"
import { AuthState } from "./interfaces"
import { useSettings } from "../settings"
import { _appleSignIn, _createUserWithEmailAndPassword, _googleSignIn, _signInWithEmailAndPassword } from "./methods"

const AuthContext = createContext<AuthState>({} as any)
AuthContext.displayName = "AuthContext"

interface Props {
  children: React.ReactElement
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<FirebaseAuthTypes.User>()
  const [isReady, setIsReady] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const settings = useSettings()

  useEffect(() => {
    async function makeReady() {
      await auth().setLanguageCode(settings.value.language.currentLanguage ?? "en")

      if (!isReady) setIsReady(true)
    }

    makeReady()
  }, [settings.value?.language?.currentLanguage])

  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user)
    if (initializing) setInitializing(false)

    const attributes = {
      displayName: user.displayName,
      email: user.email,
      isAnonymous: String(user.isAnonymous),
      providerId: user.providerId,
      uid: user.uid,
    }

    if (__DEV__) {
      console.log("auth@onAuthStateChanged:", JSON.stringify(attributes, null, 2))
    }

    await Promise.all([
      crashlytics().setUserId(user.uid),
      crashlytics().setAttributes(attributes),
    ])
  }

  useEffect(() => {
    let subscriber

    if (isReady) {
      subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    }

    return () => {
      if (subscriber) {
        return subscriber // unsubscribe on unmount
      }
    }
  }, [isReady])


  const signOut = () => {
    auth().signOut()
      .then(() => {
        console.log("auth@signOut: signed out successfully")
      })
  }

  return (
    <AuthContext.Provider value={{
      user,
      initializing,
      signOut,
      authenticate: {
        signInWithEmailAndPassword: _signInWithEmailAndPassword,
        createUserWithEmailAndPassword: _createUserWithEmailAndPassword,
        appleSignIn: _appleSignIn,
        googleSignIn: _googleSignIn,
      },
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
