import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

export interface Customer {
  userId: string
  id?: string
  name: string
  address: string
  zipCode: string
  city: string
  location: FirebaseFirestoreTypes.GeoPoint
}
