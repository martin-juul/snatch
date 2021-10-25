import { SettingsModel } from "./interfaces"
import { SettingsSaveError, SettingsSaveTooManyTriesError } from "../../errors"
import { load, save } from "../../utils/storage"
import { delay } from "../../utils/delay"
import { defaultSettings } from "./defaults"

const SETTINGS_STORAGE_KEY = "snatch_settings"

let isSaving = false
let saveAttempt = 0
const maxTries = 5

export async function restoreDefaultSettings() {
  await storeSettings(defaultSettings)
}

export async function loadSettings(): Promise<SettingsModel> {
  let model = await load(SETTINGS_STORAGE_KEY)

  if (!model) {
    model = defaultSettings
    storeSettings(model)
  }

  return model
}

export async function storeSettings(model: SettingsModel): Promise<void> {
  ++saveAttempt

  if (saveAttempt > maxTries) {
    throw new SettingsSaveTooManyTriesError()
  }


  if (isSaving) {
    // ensure we don't clash saves
    await delay(1000)
  }

  const success = await save(SETTINGS_STORAGE_KEY, model)

  if (success) {
    isSaving = false
    saveAttempt = 0

    return
  }

  throw new SettingsSaveError()
}
