import { FoodMenuItem } from "../../models/food-menu-item/food-menu-item"

export interface Restaurant {
  name: string
  description: string
  image: string
}

export const MOCK_RESTAURANT: Restaurant = {
  name: "Baan Tom Yum",
  description: "E-San",
  image: "https://via.placeholder.com/800x400",
}

export const MOCK_FOOD_ITEMS: FoodMenuItem[] = [
  {
    id: 1,
    name: "Tom yom",
    type: "Soup",
    image: "https://via.placeholder.com/400x400",
    price: 3900,
  },
  {
    id: 2,
    name: "Somtum",
    type: "Salad",
    image: "https://via.placeholder.com/400x400",
    price: 4200,
  },
  {
    id: 3,
    name: "Larb Moo",
    type: "Salad",
    image: "https://via.placeholder.com/400x400",
    price: 5600,
  },
  {
    id: 4,
    name: "Namtok",
    type: "Salad",
    image: "https://via.placeholder.com/400x400",
    price: 3450,
  },
  {
    id: 5,
    name: "Sundried beef",
    type: "Beef",
    image: "https://via.placeholder.com/400x400",
    price: 8600,
  },
  {
    id: 6,
    name: "Sticky rice",
    type: "Sides",
    image: "https://via.placeholder.com/400x400",
    price: 4200,
  },
]
