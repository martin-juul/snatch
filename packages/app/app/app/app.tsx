import "./i18n"
import "./utils/ignore-warnings"
import React, { useEffect, useRef } from "react"
import { NavigationContainerRef } from "@react-navigation/native"
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context"
import { initFonts } from "./theme/fonts"
import { Provider } from "react-redux"
import { store } from "./store"
import * as storage from "./utils/storage"
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from "./navigators"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import { enableScreens } from "react-native-screens"
import { PermissionsProvider } from "./contexts/permissions"

enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

function App() {
  const navigationRef = useRef<NavigationContainerRef<any>>()
  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } =
    useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    (async () => {
      await initFonts()
    })()
  }, [])

  // otherwise, we're ready to render the app
  return (
    <ToggleStorybook>
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
    </ToggleStorybook>
  )
}

export default App
