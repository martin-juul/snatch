import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { NotFoundError } from "../../errors"

export interface OrderItemModel {
  itemRef: string
  itemPrice: number
  name: string
  options?: { [key: string]: string }
  quantity: number
}

export type OrderStatus =
  "pending"
  | "driver_lookup"
  | "preparing"
  | "driver_pickup"
  | "delivering"
  | "delivered"
  | "cancelled"

export interface OrderModel {
  id?: string
  // Ref: /customers/:id
  customerId: FirebaseFirestoreTypes.DocumentReference
  // Ref: /drivers/:id
  driverId?: FirebaseFirestoreTypes.DocumentReference
  // Ref: /restaurants/:id
  restaurantId: FirebaseFirestoreTypes.DocumentReference
  status: OrderStatus
  items: OrderItemModel[]
  deliveryFee: number
  // defined in meters
  deliveryDistance: number
  deliveryLocation: { latitude: number, longitude: number }
  deliveredAt?: FirebaseFirestoreTypes.Timestamp
  createdAt: FirebaseFirestoreTypes.Timestamp | Date
}

export const findOrdersByCustomerId = async (customerId: string) => {
  const res = await firestore()
    .collection<OrderModel>("/orders/")
    .where("customerId", "==", customerId)
    .get()

  const items: OrderModel[] = []

  for (const item of res.docs) {
    items.push({
      id: item.id,
      ...item.data(),
    })
  }

  return items
}

export const findOrderById = async (orderId: string) => {
  const order = await firestore()
    .doc<OrderModel>(`/orders/${orderId}/`)
    .get()

  if (!order.exists) {
    throw new NotFoundError("Order")
  }

  return order
}
