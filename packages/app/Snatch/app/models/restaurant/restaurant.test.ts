import {RestaurantModel} from './restaurant';

test('can be created', () => {
  const instance = RestaurantModel.create({});

  expect(instance).toBeTruthy();
});
