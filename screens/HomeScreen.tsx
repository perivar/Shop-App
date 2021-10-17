import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { useSelector } from 'react-redux'
import ProductList from '../components/ProductList'

const HomeScreen = props => {
  return (<ProductList navigation={props}/>)
}

HomeScreen.navigationOptions = (data) => {
  return {
    headerTitle: 'Shop App',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="settings" iconName="ios-settings" onPress={() => {
          data.navigation.navigate('Settings')
        }} />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: '#D6A5AB',
      shadowRadius: 0,
      shadowOffset: {
          height: 0,
      },
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 30,
      fontFamily: 'blackjack'
    },
    headerShown: false
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})

export default HomeScreen;
