import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

export interface OrderItemModel {
  itemRef: string
  itemPrice: number
  name: string
  options?: { [key: string]: string }
  quantity: number
}

export type OrderStatus = "pending" | "driver_lookup" | "preparing" | "driver_pickup" | "delivering" | "delivered" | "cancelled"

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
  createdAt: FirebaseFirestoreTypes.Timestamp
}
