import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'

const ChatScreen = props => {
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        The Chat screen
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    color: 'black'
  },
  buttonStyle:{

  }
})

export default ChatScreen;