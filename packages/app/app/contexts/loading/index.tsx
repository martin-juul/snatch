import React, { createContext, useContext, useState } from "react"
import { LoadingState } from "./interfaces"
import { AppLoader } from "../../components"


const LoadingContext = createContext<LoadingState>({} as any)
LoadingContext.displayName = "LoadingContext"

export interface LoadingProviderProps {
  children: React.ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loading, setLoading] = useState(false)

  const show = () => setLoading(true)
  const hide = () => setLoading(false)

  return (
    <LoadingContext.Provider
      value={{ loading, show, hide }}
    >
      <>
        {loading
          ?
          <AppLoader />
          : children
        }
      </>
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)
