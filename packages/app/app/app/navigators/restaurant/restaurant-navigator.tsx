import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  RestaurantItemScreen,
  RestaurantListScreen,
  RestaurantScreen,
} from '../../screens';

export type RestaurantParamList = {
  RestaurantList;
  RestaurantDetail;
  RestaurantOrder;
};

const RestaurantStack = createStackNavigator<RestaurantParamList>();

export const RestaurantsNavigator = () => (
  <RestaurantStack.Navigator>
    <RestaurantStack.Screen
      options={{headerShown: false}}
      name="RestaurantList"
      component={RestaurantListScreen}
    />
    <RestaurantStack.Screen
      options={{headerShown: false}}
      name="RestaurantDetail"
      component={RestaurantScreen}
    />
    <RestaurantStack.Screen
      name="RestaurantOrder"
      component={RestaurantItemScreen}
    />
  </RestaurantStack.Navigator>
);
