import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import { SettingsParamList } from "./settings-navigator"

export enum SettingsRoute {
  List = "Settings",
  Language = "Language",
}

export type SettingsNavigationProp<RouteName extends keyof SettingsParamList> = StackNavigationProp<SettingsParamList, RouteName>
export type SettingsRouteProp<RouteName extends keyof SettingsParamList> = RouteProp<SettingsParamList, RouteName>

export interface SettingsProps<RouteName extends keyof SettingsParamList> {
  navigation: SettingsNavigationProp<RouteName>
  route: SettingsRouteProp<RouteName>
}
