import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {
  FlatList,
  ImageStyle,
  Pressable,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Header, Screen, Text} from '../../components';
import {color, spacing} from '../../theme';
import {MOCK_FOOD_ITEMS, MOCK_RESTAURANT, Restaurant} from './mock';
import {FoodMenuItem} from '../../models/food-menu-item/food-menu-item';
import {useNavigation} from '@react-navigation/native';

const FULL: ViewStyle = {flex: 1};

const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
};
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: 'bold',
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: 'center',
};

const CONTAINER: ViewStyle = {
  backgroundColor: color.background,
};

const LIST_CONTAINER: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  paddingVertical: 10,
};
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
};
const LIST_TEXT: TextStyle = {
  fontWeight: '600',
  marginLeft: 10,
};
const LIST_SUB_TEXT: TextStyle = {
  color: color.dim,
  fontWeight: '500',
  marginLeft: 10,
};
const LIST_PRICE_TEXT: TextStyle = {
  textAlign: 'right',
  marginTop: -20,
};
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
};
export const RestaurantScreen = observer(() => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const [restaurant, setRestaurant] = useState<Restaurant>(MOCK_RESTAURANT);
  const [items, setItems] = useState<FoodMenuItem[]>([]);

  useEffect(() => {
    setItems(MOCK_FOOD_ITEMS);
  }, []);

  return (
    <View testID="RestaurantScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" statusBar="dark-content">
        <Header
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />

        <View>
          <FastImage
            style={{width: '100%', height: 200}}
            source={{
              uri: restaurant.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        <View style={{paddingHorizontal: 20}}>
          <Text preset="header" text={restaurant.name} />

          <View style={{marginTop: 5}}>
            <Text text={restaurant.description} preset="fieldLabel" />
          </View>
        </View>

        <FlatList
          contentContainerStyle={FLAT_LIST}
          data={[...items]}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Pressable onPress={() => navigation.navigate('RestaurantOrder')}>
              <View style={LIST_CONTAINER}>
                <FastImage source={{uri: item.image}} style={IMAGE} />

                <View style={{alignItems: 'stretch', width: '80%'}}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={LIST_TEXT}>{item.name}</Text>
                    <Text style={LIST_SUB_TEXT}>{item.type}</Text>
                  </View>

                  <Text style={LIST_PRICE_TEXT}>
                    {(item.price / 100).toString().replace('.', ',')} kr.
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </Screen>
    </View>
  );
});
