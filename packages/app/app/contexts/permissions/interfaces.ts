import { NotificationSettings, PermissionStatus } from "react-native-permissions"

export interface Notifications {
  status: PermissionStatus | null
  settings: NotificationSettings | null
}

export interface IPermissionsContext {
  notifications: {
    state: Notifications
    request: () => void
  }
}
