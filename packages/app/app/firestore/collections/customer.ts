import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { NotFoundError } from "../../errors"

export interface Customer {
  userId: string
  id?: string
  name: string
  address: string
  zipCode: string
  city: string
  location: FirebaseFirestoreTypes.GeoPoint
}

export const findCustomerById = async (customerId: string) => {
  const customer = await firestore().doc<Customer>(`/customers/${customerId}/`).get()

  if (!customer.exists) {
    throw new NotFoundError("Customer")
  }

  return customer
}
