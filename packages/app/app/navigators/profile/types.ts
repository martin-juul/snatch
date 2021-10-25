import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import { ProfileParamList } from "./profile-navigator"

export enum ProfileRoute {
  Detail = "Detail",
}

export type ProfileNavigationProp<RouteName extends keyof ProfileParamList> = StackNavigationProp<ProfileParamList, RouteName>
export type ProfileRouteProp<RouteName extends keyof ProfileParamList> = RouteProp<ProfileParamList, RouteName>

export interface ProfileProps<RouteName extends keyof ProfileParamList> {
  navigation: ProfileNavigationProp<RouteName>
  route: ProfileRouteProp<RouteName>
}
