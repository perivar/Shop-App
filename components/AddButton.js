import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Animated } from 'react-native'
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';

export default class AddButton extends React.Component {
  render(){
    return(
      <View style={{position: 'absolute', alignItems: 'center'}}>
        <Animated.View style={[styles.button]}>
          <TouchableHighlight underlayColor="#e56767" onPress={() => console.log('hei')}>
            <Animated.View>
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
