import React, { createContext, useContext, useEffect, useState } from "react"
import { Settings, SettingsContextMethods, SettingsLanguageModel, SettingsPrivacyModel } from "./interfaces"
import i18n from "i18n-js"
import { restoreDefaultSettings, loadSettings, storeSettings } from "./methods"
import crashlytics from "@react-native-firebase/crashlytics"
import { defaultSettings } from "./defaults"

const SettingsContext = createContext<Settings>({} as any)
SettingsContext.displayName = "SettingsContext"

interface SettingsProviderProps {
  children: React.ReactElement
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [language, setLanguage] = useState<SettingsLanguageModel>(defaultSettings.language)
  const [privacy, setPrivacy] = useState<SettingsPrivacyModel>(defaultSettings.privacy)

  const run = async () => {
    console.log("[SettingsProvider](storeSettings): begin")
    if (__DEV__) {
      console.log({
        language,
        privacy,
      })
    }

    await storeSettings({
      language,
      privacy,
    })

    console.log("[SettingsProvider](storeSettings): end")
  }

  useEffect(() => {
    loadSettings()
      .then(model => {
        setLanguage(model.language)
        setPrivacy(model.privacy)

        setIsLoaded(true)
      })
  }, [])

  const setLanguageModel = (model: SettingsLanguageModel) => {
    setLanguage(prev => ({ ...prev, ...model }))

    if (model.currentLanguage !== language.currentLanguage) {
      i18n.locale = model.currentLanguage
      i18n.reset()
    }

    run()
  }

  useEffect(() => {
    if (privacy) {
      crashlytics().setCrashlyticsCollectionEnabled(privacy.enableCrashlytics)
        .then(() => {
          console.log(`[settings](privacy): crashlytics ${privacy.enableCrashlytics ? "enabled" : "disabled"}`)
        })
    }
  }, [privacy?.enableCrashlytics])

  const setPrivacyModel = (model: SettingsPrivacyModel) => {
    setPrivacy(prev => ({ ...prev, ...model }))

    run()
  }

  const methods: SettingsContextMethods = {
    setLanguage: setLanguageModel,
    setPrivacy: setPrivacyModel,
    restoreDefaultSettings: restoreDefaultSettings,
  }

  return <SettingsContext.Provider value={{
    value: {
      language,
      privacy,
    },
    isLoaded,
    methods,
  }}>
    {children}
  </SettingsContext.Provider>
}

export function useSettings() {
  return useContext(SettingsContext)
}
