import * as yup from "yup"
import { translate as t } from "./translate"

export function buildYupLocale(): void {
  yup.setLocale({
    mixed: {
      required: t("validation.mixed.required.key"),
    },
    number: {
      min: t("validation.number.min.key"),
    },
    string: {
      email: t("validation.string.email.key"),
      max: t("validation.string.max.key"),
    },
  })
}
