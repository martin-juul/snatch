import * as React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react-lite';
import {flatten} from 'ramda';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const CONTAINER: ViewStyle = {
  justifyContent: 'center',
};
export interface MapProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Describe your component here
 */
export const Map = observer(function Map(props: MapProps) {
  const {style} = props;
  const styles = flatten([CONTAINER, style]);

  return <View style={styles} />;
});
