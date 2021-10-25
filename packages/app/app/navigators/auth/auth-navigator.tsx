import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { SignInScreen } from "../../screens"
import { AuthRoute } from "./types"

export type AuthParamList = {
  [AuthRoute.SignIn]: undefined
}

export const AuthStack = createStackNavigator<AuthParamList>()

export const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name={AuthRoute.SignIn} component={SignInScreen} />
  </AuthStack.Navigator>
)
