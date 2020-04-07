import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity} from 'react-native';
import NewItem from '../components/NewItem'

const NewListingsScreen = props => {
  return (
    <NewItem navigation={props.navigation}/>
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
})

export default NewListingsScreen;
