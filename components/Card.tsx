import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

const Card: React.FC<{ style: StyleProp<ViewStyle> }> = props => {
  return (
    <View style={[{ ...styles.card }, props.style]}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
});

export default Card;
