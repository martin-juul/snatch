import React, {useEffect} from 'react';
import {FlatList, Pressable, View, ViewStyle} from 'react-native';
import {Screen, Text} from '../../components';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const FULL: ViewStyle = {flex: 1};

export const RestaurantListScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
     // await restaurantStore.getRestaurants();
    }

    fetchData();
  }, []);

  const goToRestaurant = () => {
    navigation.navigate('RestaurantDetail');
  };

  return (
    <View testID="RestaurantListScreen" style={FULL}>
      <Screen preset="fixed" statusBar="dark-content">
        <View style={{marginHorizontal: 20}}>
          <FlatList
            data={[]}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <Pressable onPress={() => goToRestaurant()}>
                <FastImage
                  style={{width: '100%', height: 200}}
                  source={{uri: item.image}}
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
  );
}
