import React, { createContext, ReactElement, useContext, useEffect, useState } from "react"
import { Customer } from "../../firestore/collections/customer"
import { useAuth } from "../auth"
import firestore from "@react-native-firebase/firestore"

interface IUserContext {
  customer?: Customer
}

const UserContext = createContext<IUserContext>({} as any)
UserContext.displayName = "CustomerContext"

export function UserProvider({ children }: { children: ReactElement }) {
  const auth = useAuth()
  const [value, setValue] = useState<IUserContext>()

  useEffect(() => {
    async function fetchData() {
      const res = await firestore().collection<Customer>("customers").where("userId", "==", auth.user?.uid).get()
      const doc = res.docs[0]
      if (!doc.exists) {
        throw new Error("This user does not exist")
      }

      const customer = doc.data()

      setValue(prev => {
        customer.id = res.docs[0].id
        if (prev) {
          prev.customer = customer
        } else {
          prev = { customer }
        }

        return prev
      })
    }

    if (auth.user?.uid) {
      fetchData()
    }
  }, [auth.user])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
