import * as Localization from "expo-localization"
import i18n from "i18n-js"
import en from "./en.json"
import da from "./da.json"
import { loadString } from "../utils/storage"

i18n.fallbacks = true
i18n.translations = { en, da }

loadString("app_lang").then(lang => {
  if (lang) {
    i18n.locale = lang
    return
  }

  i18n.locale = Localization.locale || "en"
})

/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof en
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & string]

export interface AppTranslation {
  identifier: string
  label: string
}

export const LOCALES: AppTranslation[] = [
  { identifier: "da", label: "Dansk" },
  { identifier: "en", label: "English" },
]
