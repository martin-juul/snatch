import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RestaurantsNavigator} from './restaurant/restaurant-navigator';
import {OrderNavigator} from './order/order-navigator';
import {OrderTrackingScreen} from '../screens';

export type PrimaryParamList = {
  Restaurant: undefined;
  OrderTracking: undefined;
  Orders: undefined;
};

const {Navigator, Screen} = createBottomTabNavigator<PrimaryParamList>();

export const MainNavigator = () => (
  <Navigator
    initialRouteName="Restaurant"
    screenOptions={{headerShown: false}}>
    <Screen name="Restaurant" component={RestaurantsNavigator} />
    <Screen name="OrderTracking" component={OrderTrackingScreen} />
    <Screen name="Orders" component={OrderNavigator} />
  </Navigator>
);

const exitRoutes = ['Restaurant', 'OrderTracking', 'Orders'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
