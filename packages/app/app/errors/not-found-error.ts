import { translate } from "../i18n"
import crashlytics from "@react-native-firebase/crashlytics"

export class NotFoundError extends Error {
  public static CODE = "ENTITY_DOES_NOT_EXIST"

  constructor(entity: string) {
    const suffix = translate("errors.notFound", { defaultValue: "does not exist" })

    super(`${entity} ${suffix}`)

    crashlytics().recordError(this, "NotFoundError")
  }

}
