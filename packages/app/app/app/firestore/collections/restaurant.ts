import * as Firestore from "@react-native-firebase/firestore"

export interface RestaurantModel {
  id: number
  name: string
  type: string
  image: string
  location: Firestore.FirebaseFirestoreTypes.GeoPoint
}
