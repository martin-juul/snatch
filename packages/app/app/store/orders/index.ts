import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { OrderModel } from "../../firestore/collections"

export interface OrdersState {
  orders: OrderModel[]
}

const initialState: OrdersState = {
  orders: [],
}

const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrders: (state, action: PayloadAction<OrderModel[]>) => {
      state.orders = action.payload
    },
  },
})

export const {
  addOrders,
} = orders.actions

export default orders.reducer
