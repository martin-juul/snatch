import { TextStyle, ViewStyle } from "react-native"
import { color, spacing } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[3],
  paddingHorizontal: spacing[3],
  borderRadius: 30,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets: Record<string, ViewStyle> = {
  /**
   * A smaller piece of secondary information.
   */
  primary: {
    ...BASE_VIEW,
    backgroundColor: color.palette.green,
  } as ViewStyle,

  secondary: {
    ...BASE_VIEW,
    backgroundColor: color.background,
    borderColor: color.palette.green,
    borderWidth: 2,
  },

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,
}

export const textPresets: Record<ButtonPresetNames, TextStyle> = {
  primary: {
    ...BASE_TEXT,
    color: color.palette.white,
    fontFamily: "OpenSans-Bold",
    fontSize: 22,
  } as TextStyle,

  secondary: {
    ...BASE_TEXT,
    color: color.palette.green,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 14,
  } as TextStyle,

  link: {
    ...BASE_TEXT,
    color: color.text,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
