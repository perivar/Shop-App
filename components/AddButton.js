import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Animated } from 'react-native'
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';

export default class AddButton extends React.Component {
  mode = new Animated.Value(0);

  handlePress = () => {
          Animated.sequence([
              Animated.timing(this.mode, {
                  toValue: this.mode._value === 0 ? 1 : 0
              })
          ]).start();
      };

  render(){
    const rotation = this.mode.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "45deg"]
    });

    return(
      <View style={{position: 'absolute', alignItems: 'center'}}>
        <Animated.View style={[styles.button]}>
          <TouchableHighlight onPress={this.handlePress} underlayColor="#e56767">
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <FontAwesome5 name="plus" size={15} color="white" />
            </Animated.View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: "#e56767",
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 36,
    top:-5,
    position: 'absolute',
    shadowColor: "#893D3D",
    shadowRadius: 5,
    shadowOffset: {height:5},
    shadowOpacity: 0.3
  },
})
