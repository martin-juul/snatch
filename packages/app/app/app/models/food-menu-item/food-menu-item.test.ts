import { FoodMenuItemModel } from "./food-menu-item"

test("can be created", () => {
  const instance = FoodMenuItemModel.create({})

  expect(instance).toBeTruthy()
})
