import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SnatchApi } from "../../services/api/snatch-api"
import { withEnvironment } from "../extensions/with-environment"
import { RestaurantModel, RestaurantSnapshot } from "../restaurant/restaurant"

/**
 * Model description here for TypeScript hints.
 */
export const RestaurantStoreModel = types
  .model("RestaurantStore")
  .props({
    restaurants: types.optional(types.array(RestaurantModel), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .extend(withEnvironment)
  .actions((self) => ({
    saveRestaurants: (snapshots: RestaurantSnapshot[]) => {
      self.restaurants.replace(snapshots)
    },
  }))
  .actions((self) => ({
    getRestaurants: async () => {
      const snatchApi = new SnatchApi(self.environment.api)
      const result = await snatchApi.getRestaurants()

      if (result.kind === "ok") {
        self.saveRestaurants(result.restaurants)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type RestaurantStoreType = Instance<typeof RestaurantStoreModel>
export interface RestaurantStore extends RestaurantStoreType {}
type RestaurantStoreSnapshotType = SnapshotOut<typeof RestaurantStoreModel>
export interface RestaurantStoreSnapshot extends RestaurantStoreSnapshotType {}
export const createRestaurantStoreDefaultModel = () => types.optional(RestaurantStoreModel, {})
