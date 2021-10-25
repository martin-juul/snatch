import { Platform, TextStyle } from "react-native"
import { color, typography } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  fontSize: 15,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: {
    ...BASE,
    fontFamily: Platform.select({
      ios: "OpenSans-Bold",
      android: "OpenSans-Bold",
    }),
    fontWeight: "bold",
  } as TextStyle,

  /**
   * Large headers.
   */
  header: {
    ...BASE,
    fontFamily: Platform.select({
      ios: "OpenSans-Bold",
      android: "OpenSans-Bold",
    }),
    fontSize: 24,
    fontWeight: "bold",
  } as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: {
    ...BASE,
    fontFamily: Platform.select({
      ios: "OpenSans-SemiBold",
      android: "OpenSans-SemiBold",
    }),
    fontSize: 13,
    color: color.dim,
  } as TextStyle,

  /**
   * A smaller piece of secondary information.
   */
  secondary: { ...BASE, fontSize: 13, color: color.dim } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets
