import { Api } from "./api"
import { ApiResponse } from "apisauce"
import { GetFoodItemsResult, GetRestaurantsResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 30
const BASE_URL = "https://mock.test/api"

export class SnatchApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
    this.api.apisauce.setBaseURL(BASE_URL)
  }

  async getRestaurants(): Promise<GetRestaurantsResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get("/restaurants", { perPage: API_PAGE_SIZE })

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const restaurants = response.data.data

      return { kind: "ok", restaurants }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getFoodItems(restaurantId: number): Promise<GetFoodItemsResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        `/restaurants/${restaurantId}/items`,
        { perPage: API_PAGE_SIZE },
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const items = response.data.data

      return { kind: "ok", items }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

}
