import React from "react"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { SignInScreen } from "../../screens"
import { RouteProp } from "@react-navigation/native"

export enum AuthRoute {
  SignIn = "SignIn",
}

export type AuthParamList = {
  [AuthRoute.SignIn]: undefined
}

export type AuthNavigationProp<RouteName extends keyof AuthParamList> = StackNavigationProp<AuthParamList,
  RouteName>
export type AuthRouteProp<RouteName extends keyof AuthParamList> = RouteProp<AuthParamList, RouteName>

export interface AuthProps<RouteName extends keyof AuthParamList> {
  navigation: AuthNavigationProp<RouteName>
  route: AuthRouteProp<RouteName>
}

export const AuthStack = createStackNavigator<AuthParamList>()

export const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name={AuthRoute.SignIn} component={SignInScreen} />
  </AuthStack.Navigator>
)
