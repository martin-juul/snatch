import React, { createContext, useContext, useEffect, useState } from "react"
import { DeviceLanguageContext } from "./interfaces"
import * as Localization from "expo-localization"

const LanguageContext = createContext<DeviceLanguageContext>({} as any)
LanguageContext.displayName = "LanguageContext"

interface LanguageProviderProps {
  children: React.ReactElement
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [context, setContext] = useState<DeviceLanguageContext>()

  useEffect(() => {
    const ctx: DeviceLanguageContext = {
      currentLanguage: "en",
      iso639_1: Localization.locale.split("-")[0],
    }

    setContext(ctx)
  }, [])

  return <LanguageContext.Provider value={context}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
