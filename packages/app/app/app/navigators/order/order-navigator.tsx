import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OrderDetailScreen, OrdersScreen } from '../../screens';

export type OrderParamList = {
  OrdersList
  OrderDetail
}

const OrderStack = createStackNavigator<OrderParamList>();

export const OrderNavigator = () => (
  <OrderStack.Navigator>
    <OrderStack.Screen options={{ headerShown: false }} name="OrdersList" component={OrdersScreen}/>
    <OrderStack.Screen options={{ headerShown: false }} name="OrderDetail" component={OrderDetailScreen}/>
  </OrderStack.Navigator>
);
