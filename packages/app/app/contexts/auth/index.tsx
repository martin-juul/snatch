import React, { createContext, useContext, useEffect, useState } from "react"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { AuthState } from "./interfaces"
import { useLanguage } from "../language"
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
  const lang = useLanguage()

  useEffect(() => {
    async function makeReady() {
      await auth().setLanguageCode(lang?.currentLanguage ?? 'en')

      if (!isReady) setIsReady(true)
    }

    makeReady()
  }, [])

  function onAuthStateChanged(user) {
    setUser(user)
    if (initializing) setInitializing(false)

    console.log("auth@onAuthStateChanged:", user)
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
