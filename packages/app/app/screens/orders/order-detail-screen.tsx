import React from "react"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const OrderDetailScreen: React.FC = () => {
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen testID="OrderDetailScreen" style={ROOT} preset="scroll">
      <Text preset="header" text="Order Detail" />
    </Screen>
  )
}
