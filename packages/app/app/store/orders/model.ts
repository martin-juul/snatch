export interface OrderItemModel {
  id: number
  title: string
  image: string
  price: number
}

export interface OrderModel {
  id: number
  driverId: number
  restaurantId: number
  items: OrderItemModel[]
  createdAt: Date
  deliveredAt: Date | null
}
