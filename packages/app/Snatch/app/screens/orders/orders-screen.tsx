import React from 'react';
import {observer} from 'mobx-react-lite';
import {FlatList, Pressable, ViewStyle} from 'react-native';
import {Screen, Text} from '../../components';
import {Orders} from './mock-data';
import FastImage from 'react-native-fast-image';

const ROOT: ViewStyle = {
  flex: 1,
};

export const OrdersScreen = observer(function OrdersScreen() {
  return (
    <Screen testID="OrdersScreen" style={ROOT} preset="fixed">
      <Text preset="header" text="Orders" />

      <FlatList
        keyExtractor={item => item.id.toString()}
        data={[...Orders]}
        renderItem={({item}) => (
          <Pressable style={{flexDirection: 'row'}}>
            <FastImage
              style={{width: 100, height: 100}}
              source={{uri: item.items[0].image}}
              resizeMode={FastImage.resizeMode.contain}
            />

            <Text text={`Order ID: #${item.id}`} />
            <Text text={item.createdAt.toLocaleDateString()} />
          </Pressable>
        )}
      />
    </Screen>
  );
});
