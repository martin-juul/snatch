import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {RestaurantStoreModel} from '../restaurant-store/restaurant-store';

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model('RootStore').props({
  restaurantStore: types.optional(RestaurantStoreModel, {} as any),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
