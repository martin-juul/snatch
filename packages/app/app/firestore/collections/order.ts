export interface OrderItemModel {
  itemRef: string
  itemPrice: number
  options?: { [key: string]: string }
  quantity: number
}

export type OrderStatus = "driver_lookup" | "preparing" | "driver_pickup" | "delivering" | "delivered" | "cancelled"

export interface OrderModel {
  id: string
  // Ref: /customers/:id
  customerId: string
  // Ref: /drivers/:id
  driverId: string
  // Ref: /restaurants/:id
  restaurantId: string
  status: OrderStatus
  items: OrderItemModel[]
  deliveryFee: number
  // defined in meters
  deliveryDistance: number
  deliveryLocation: { latitude: number, longitude: number }
  deliveredAt?: Date
  createdAt: Date
}
