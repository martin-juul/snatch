import React from "react"
import { Button, Screen, Text } from "../../components"
import { FlatList, StyleSheet, ViewStyle } from "react-native"
import { useAuth } from "../../contexts/auth"
import { color } from "../../theme"
import { SettingsProps, SettingsRoute } from "../../navigators/settings"
import { ListItem, View } from "react-native-ui-lib"
import Ionicons from "react-native-vector-icons/Ionicons"
import { TxKeyPath } from "../../i18n"

interface SettingsView {
  labelTx: TxKeyPath
  route: string
  icon: React.ReactElement
}

const ICON_SIZE = 18

const SETTINGS: SettingsView[] = [
  { labelTx: "settings.language", route: "Language", icon: <Ionicons name="language" size={ICON_SIZE} /> },
]

interface Props extends SettingsProps<SettingsRoute.List> {
}

export const SettingsScreen = ({ navigation }: Props) => {
  const auth = useAuth()

  const renderRow = (row: SettingsView) => (
    <View style={{ marginHorizontal: 12 }}>
      <ListItem
        onPress={() => navigation.navigate(row.route as SettingsRoute)}
        style={{ borderBottomWidth: StyleSheet.hairlineWidth }}
        height={48}
      >
        <ListItem.Part left>
          {row.icon}
        </ListItem.Part>

        <ListItem.Part containerStyle={{ marginLeft: 25 }}>
          <Text tx={row.labelTx} />
        </ListItem.Part>
      </ListItem>
    </View>
  )

  return (
    <Screen style={ROOT}>

      <FlatList<SettingsView>
        data={SETTINGS}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={(item) => item.labelTx}
      />

      <Button
        preset="link"
        onPress={() => auth.signOut()}
        text="Sign out"
        textStyle={{ color: color.palette.blue }}
        style={{ alignSelf: "center" }}
      />
    </Screen>
  )
}

const ROOT: ViewStyle = {
  flex: 1,
}
