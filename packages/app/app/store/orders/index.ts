import { OrderModel } from "./model"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface OrdersState {
  orders: OrderModel[]
  selected: OrderModel | null
}

const initialState: OrdersState = {
  orders: [],
  selected: null,
}

const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSelected(state, action: PayloadAction<OrderModel | null>) {
      state.selected = action.payload
    },
  },
})

export const { setSelected } = orders.actions

export default orders.reducer
