import { SettingsModel } from "./interfaces"
import i18n from "i18n-js"

export const defaultSettings: SettingsModel = {
  language: {
    currentLanguage: i18n.currentLocale(),
  },
  privacy: {
    enableCrashlytics: true,
  },
}
