export interface SettingsLanguageModel {
  currentLanguage: string
}

export interface SettingsPrivacyModel {
  enableCrashlytics: boolean
}

export interface SettingsModel {
  language: SettingsLanguageModel
  privacy: SettingsPrivacyModel
}

export interface SettingsContextMethods {
  // Restores default settings
  restoreDefaultSettings: () => void
  setLanguage: (model: SettingsLanguageModel) => void
  setPrivacy: (model: SettingsPrivacyModel) => void
}

export interface Settings {
  isLoaded: boolean
  value: SettingsModel
  methods: SettingsContextMethods
}
