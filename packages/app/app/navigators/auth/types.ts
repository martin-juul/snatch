import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import { AuthParamList } from "./auth-navigator"

export enum AuthRoute {
  SignIn = "SignIn",
}

export type AuthNavigationProp<RouteName extends keyof AuthParamList> = StackNavigationProp<AuthParamList,
  RouteName>
export type AuthRouteProp<RouteName extends keyof AuthParamList> = RouteProp<AuthParamList, RouteName>

export interface AuthProps<RouteName extends keyof AuthParamList> {
  navigation: AuthNavigationProp<RouteName>
  route: AuthRouteProp<RouteName>
}
