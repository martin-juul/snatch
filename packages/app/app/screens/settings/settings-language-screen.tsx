import React from "react"
import { Screen, Text } from "../../components"
import { FlatList, StyleSheet } from "react-native"
import { AppTranslation, LOCALES } from "../../i18n"
import { ListItem, View } from "react-native-ui-lib"
import { useLanguage } from "../../contexts/language"

export const SettingsLanguageScreen = () => {
  const lang = useLanguage()

  const setLanguage = (identifier: string) => {
    lang.setLanguage(identifier)
  }

  const renderRow = (item: AppTranslation) => (
    <View>
      <ListItem
        style={{ borderBottomWidth: StyleSheet.hairlineWidth }}
        onPress={() => setLanguage(item.identifier)}
      >
        <ListItem.Part>
          <Text>{item.label}</Text>
        </ListItem.Part>
      </ListItem>
    </View>
  )

  return (
    <Screen testID="SettingsLanguageScreen">

      <View style={{ marginHorizontal: 12 }}>
        <FlatList<AppTranslation>
          data={LOCALES}
          renderItem={({ item }) => renderRow(item)}
          keyExtractor={item => item.identifier}
        />
      </View>

    </Screen>
  )
}
