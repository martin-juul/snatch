import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { FoodMenuItem } from "../../models/food-menu-item/food-menu-item"
import { Restaurant } from "../../models/restaurant/restaurant"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type GetRestaurantsResult = { kind: "ok", restaurants: Restaurant[] } | GeneralApiProblem
export type GetFoodItemsResult = { kind: "ok", items: FoodMenuItem[] } | GeneralApiProblem
