import * as Firestore from "@react-native-firebase/firestore"
import { StringMap } from "../../interfaces"

export interface RestaurantModel {
  id?: string
  name: string
  type: string
  image?: string
  location: Firestore.FirebaseFirestoreTypes.GeoPoint
}

export interface RestaurantMenuItem {
  id?: string
  name: string
  // key=ISO 639-1 value=language specific description
  description: StringMap
  image?: string
  price: number
  // key=ISO 639-1 value=language specific description
  type: StringMap
  productCode?: string
}
