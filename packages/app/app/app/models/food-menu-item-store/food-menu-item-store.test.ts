import {FoodMenuItemStoreModel} from './food-menu-item-store';

test('can be created', () => {
  const instance = FoodMenuItemStoreModel.create({});

  expect(instance).toBeTruthy();
});
