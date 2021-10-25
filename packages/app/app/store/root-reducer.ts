import { combineReducers } from "redux"

import basketReducer from "./basket"
import ordersReducer from "./orders"

export const rootReducer = combineReducers({
  basket: basketReducer,
  orders: ordersReducer,
})
