import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { FoodMenuItemModel } from "../food-menu-item/food-menu-item"

/**
 * Model description here for TypeScript hints.
 */
export const FoodMenuItemStoreModel = types
  .model("FoodMenuItemStore")
  .props({
    foodMenuItems: types.array(FoodMenuItemModel),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type FoodMenuItemStoreType = Instance<typeof FoodMenuItemStoreModel>

export interface FoodMenuItemStore extends FoodMenuItemStoreType {
}

type FoodMenuItemStoreSnapshotType = SnapshotOut<typeof FoodMenuItemStoreModel>

export interface FoodMenuItemStoreSnapshot extends FoodMenuItemStoreSnapshotType {
}

export const createFoodMenuItemStoreDefaultModel = () => types.optional(FoodMenuItemStoreModel, {})
