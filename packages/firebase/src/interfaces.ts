export interface Order {
  id: string
  restaurantId: string
  driverId?: string
  userId: string
  items: any[]
}
