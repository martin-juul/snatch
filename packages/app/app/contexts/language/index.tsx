import React, { createContext, useContext, useEffect, useState } from "react"
import { DeviceLanguageContext } from "./interfaces"
import i18n from "i18n-js"
import { loadString, saveString } from "../../utils/storage"

const LanguageContext = createContext<DeviceLanguageContext>({} as any)
LanguageContext.displayName = "LanguageContext"

interface LanguageProviderProps {
  children: React.ReactElement
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.currentLocale())

  useEffect(() => {
    saveString('app_lang', currentLanguage)
  }, [currentLanguage])

  useEffect(() => {
    loadString('app_lang').then(lang => {
      if (lang) {
        setCurrentLanguage(lang)
      }
    })
  }, [])

  const setLanguage = (lang: string) => {
    i18n.locale = lang
    setCurrentLanguage(lang)
    i18n.reset()
  }

  return <LanguageContext.Provider value={{
    currentLanguage,
    setLanguage,
  }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
