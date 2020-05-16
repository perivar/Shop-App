import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'

const SettingsScreen = props => {
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        The Settings screen
      </Text>
      <Button title="Log out" color="#FF1654" onPress={() => {
        dispatch(logout())
        props.navigation.navigate('Auth')
      }}/>
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

export default SettingsScreen;
