import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite"
import { FlatList, Pressable, View, ViewStyle } from 'react-native';
import { Header, Screen, Text } from '../../components';
import { MOCK_RESTAURANTS, Restaurant } from './mock';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const FULL: ViewStyle = { flex: 1 }

export const RestaurantListScreen = observer(() => {
  const navigation = useNavigation()

  const [items, setItems] = useState<Restaurant[]>([])

  useEffect(() => {
    setItems(MOCK_RESTAURANTS)
  }, [])

  const goToRestaurant = () => {
    navigation.navigate('restaurant')
  }

  return (
    <View testID="RestaurantListScreen" style={FULL}>
      <Screen preset="fixed" statusBar="dark-content">
        <Header
          headerText="Restaurants"
        />

        <View style={{ marginHorizontal: 20, marginBottom: 100 }}>
          <FlatList
            data={[...items]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable onPress={() => goToRestaurant()}>
                <FastImage
                  style={{ width: "100%", height: 200 }}
                  source={{ uri: item.image }}
                  resizeMode={FastImage.resizeMode.contain}
                />

                <Text text={item.name} />
                <Text text={item.description} />
              </Pressable>
            )}
          />
        </View>
      </Screen>
    </View>
  )
})
