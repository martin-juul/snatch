/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import React, { useEffect } from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { MainNavigator } from "./main-navigator"
import { usePermissions } from "../contexts/permissions"
import { useAuth } from "../contexts/auth"
import { AuthNavigator } from "./auth/auth-navigator"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

export enum RootRoute {
  AuthStack = "authStack",
  MainStack = "mainStack"
}

export type RootParamList = {
  [RootRoute.AuthStack]: undefined
  [RootRoute.MainStack]: undefined
}

const { Navigator, Screen } = createStackNavigator<RootParamList>()

const RootStack = () => {
  const auth = useAuth()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {auth.user
        ? (
          <Screen
            name={RootRoute.MainStack}
            component={MainNavigator}
            options={{
              headerShown: false,
            }}
          />)
        : (
          <Screen
            name={RootRoute.AuthStack}
            component={AuthNavigator}
          />
        )
      }
    </Navigator>
  )
}

export const RootNavigator = React.forwardRef<NavigationContainerRef<any>,
  Partial<React.ComponentProps<typeof NavigationContainer>>>((props, ref) => {
  const permissions = usePermissions()

  useEffect(() => {
    if (!permissions.notifications.state) {
      permissions.notifications.request()
    }
  }, [permissions])

  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
