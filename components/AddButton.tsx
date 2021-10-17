import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, TouchableHighlight, View } from 'react-native';

const AddButton = () => {
  return (
    <View style={{ position: 'absolute', alignItems: 'center' }}>
      <Animated.View style={[styles.button]}>
        <TouchableHighlight underlayColor="#e56767">
          <Animated.View>
            <FontAwesome5 name="plus" size={15} color="white" />
          </Animated.View>
        </TouchableHighlight>
      </Animated.View>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e56767',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 36,
    top: -5,
    position: 'absolute',
    shadowColor: '#893D3D',
    shadowRadius: 5,
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 0.3,
  },
});
