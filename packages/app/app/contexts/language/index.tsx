import React, { createContext, useContext, useEffect, useState } from "react"
import { DeviceLanguageContext } from "./interfaces"
import { getDeviceLanguage } from "../../utils/device-language"

const LanguageContext = createContext<DeviceLanguageContext>({} as any)
LanguageContext.displayName = "LanguageContext"

interface LanguageProviderProps {
  children: React.ReactElement
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [context, setContext] = useState<DeviceLanguageContext>()

  useEffect(() => {
    const ctx: DeviceLanguageContext = {
      currentLanguage: 'en',
      iso639_1: getDeviceLanguage(),
    }

    setContext(ctx)
  }, [])

  return (
    <LanguageContext.Provider value={context}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
