import "./i18n"
import "./utils/ignore-warnings"
import React, { useEffect, useRef, useState } from "react"
import { NavigationContainerRef } from "@react-navigation/native"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import { store } from "./store"
import * as storage from "./utils/storage"
import { useBackButtonHandler, RootNavigator, canExit, setRootNavigation, useNavigationPersistence } from "./navigators"
import { PermissionsProvider } from "./contexts/permissions"
import { LanguageProvider } from "./contexts/language"
import { bootstrap } from "./bootstrap"
import { Text } from "./components"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const navigationRef = useRef<NavigationContainerRef<any>>()
  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
     //  await initFonts()
      await bootstrap()

      setIsLoading(true)
    })()
  }, [])

  if (isLoading) {
    <Text>Loading...</Text>
  }

  // otherwise, we're ready to render the app
  return (
    <LanguageProvider>
      <Provider store={store}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <PermissionsProvider>
            <RootNavigator
              ref={navigationRef}
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </PermissionsProvider>
        </SafeAreaProvider>
      </Provider>
    </LanguageProvider>
  )
}

export default App
