import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { useSelector } from 'react-redux'
import ProductList from '../components/ProductList'

const HomeScreen = props => {
  return <ProductList navigation={props}/>
}

HomeScreen.navigationOptions = (data) => {
  return {
    headerTitle: 'Market',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="settings" iconName="ios-settings" onPress={() => {
          data.navigation.navigate('Settings')
        }} />
      </HeaderButtons>
    )
  }
}

export default HomeScreen;
