export interface OrderItemModel {
  id: string
  name: string
  image?: string
  price: number
  options?: { [key: string]: string }
  productCode: string
  quantity: number
}

export type OrderStatus = "driver_lookup" | "preparing" | "driver_pickup" | "delivering" | "delivered" | "cancelled"

export interface OrderModel {
  id: string
  restaurantId: string
  status: OrderStatus
  items: OrderItemModel[]
  driverId: string
  deliveryFee: number
  deliveryDistance: number
  deliveryLocation: { latitude: number, longitude: number }
  deliveredAt: Date
  createdAt: Date
}
