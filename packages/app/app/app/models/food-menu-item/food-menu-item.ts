import {Instance, SnapshotOut, types} from 'mobx-state-tree';

/**
 * Model description here for TypeScript hints.
 */
export const FoodMenuItemModel = types
  .model('FoodMenuItem')
  .props({
    id: types.identifierNumber,
    restaurantId: types.identifierNumber,
    name: types.maybe(types.string),
    type: types.maybe(types.string),
    image: types.maybe(types.string),
    price: types.maybe(types.number),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})); // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type FoodMenuItemType = Instance<typeof FoodMenuItemModel>;

export interface FoodMenuItem extends FoodMenuItemType {}

type FoodMenuItemSnapshotType = SnapshotOut<typeof FoodMenuItemModel>;

export interface FoodMenuItemSnapshot extends FoodMenuItemSnapshotType {}

export const createFoodMenuItemDefaultModel = () =>
  types.optional(FoodMenuItemModel, {});
