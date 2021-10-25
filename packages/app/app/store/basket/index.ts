import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { OrderItemModel } from "../../firestore/collections"

export interface BasketState {
  restaurantId: string | null
  deliveryLocation: { latitude: number, longitude: number } | null
  items: OrderItemModel[]
}

const initialState: BasketState = {
  restaurantId: null,
  deliveryLocation: null,
  items: [],
}

const basket = createSlice({
  name: "basket",
  initialState,
  reducers: {
    clearBasket: (state) => {
      state.restaurantId = null
      state.deliveryLocation = null
      state.items = []
    },
    setBasketRestaurantId: (state, action: PayloadAction<string>) => {
      state.restaurantId = action.payload
    },
    addItemToBasket: (state, action: PayloadAction<OrderItemModel>) => {
      if (state.items.findIndex(x => x.itemRef === action.payload.itemRef) > 0) {
        updateBasketItemQuantity({ itemRef: action.payload.itemRef, quantity: action.payload.quantity })
      } else {
        state.items.push(action.payload)
      }
    },
    updateBasketItemQuantity: (state, action: PayloadAction<{ itemRef: string, quantity: number }>) => {
      const idx = state.items.findIndex(x => x.itemRef === action.payload.itemRef)
      state.items[idx].quantity = action.payload.quantity
    },
    removeItemFromBasket: (state, action: PayloadAction<string>) => {
      state.items.splice(state.items.findIndex(x => x.itemRef === action.payload), 1)
    },
    setDeliveryLocation: (state, action: PayloadAction<{ latitude: number, longitude: number }>) => {
      state.deliveryLocation = action.payload
    },
  },
})

export const {
  clearBasket,
  setBasketRestaurantId,
  addItemToBasket,
  updateBasketItemQuantity,
  removeItemFromBasket,
  setDeliveryLocation,
} = basket.actions

export default basket.reducer
