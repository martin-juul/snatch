import { FoodMenuItem } from '../../models/food-menu-item/food-menu-item';
import { MOCK_FOOD_ITEMS, MOCK_RESTAURANT, Restaurant } from '../restaurant/mock';

export interface Order {
  id: number;
  restaurants: Restaurant;
  items: FoodMenuItem[];
  totalPrice: number;
  createdAt: Date;
}

export const Orders: Order[] = [
  {
    id: 1,
    restaurants: MOCK_RESTAURANT,
    items: [
      ...MOCK_FOOD_ITEMS,
    ],
    totalPrice: 20343,
    createdAt: new Date(),
  },
];
