import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem'

const OrderScreen = props => {
  const productsInCart = useSelector(state => state.allProducts.cart);
  const numberOfProducts = useSelector(state => state.allProducts.counter)
  const sumCart = useSelector(state => state.allProducts.sumCart);
  var rounded = Math.round(sumCart * 10) / 10

  let totalProducts = 0;

  for(let x = 0; x < numberOfProducts.length; x++){
    totalProducts += numberOfProducts[x].number
  }

  const renderCart = itemData => {
    return (
        <CartItem
          id={itemData.item.id}
          name={itemData.item.name}
          price={itemData.item.price}
          image={itemData.item.url}
          onDeleteItem={() => {
            return itemData.item.id
          }}
          />
    )
  }

  return (
    <View style={styles.priceSummary}>
      <View style={styles.topInfo}>
        <View style={styles.leftTop}>
          <Text style={styles.summaryTitle}>
            Your Summary
          </Text>
        </View>
        <View style={styles.textWrapper}>
          <View style={styles.centeringLeftText}>
            <Text style={styles.itemText}>
              {totalProducts} items
            </Text>
            <Text style={styles.priceText}>
              {rounded} NOK
            </Text>
          </View>
        </View>
      </View>
      <FlatList style={styles.list} numColumns={1} data={productsInCart} renderItem={renderCart} keyExtractor={(item, index) => item.id}/>
    </View>
    )
}

OrderScreen.navigationOptions = (data) => {
  return {
    headerTitle: 'Cart',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="settings" iconName="ios-settings" onPress={() => {
          data.navigation.navigate('Settings')
        }} />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  topInfo:{
    flexDirection: 'row',
    backgroundColor: '#d8eff9',
  },
  priceSummary:{
    flex:1
  },
  textWrapper:{
    flexDirection: 'column',
    height: 50,
    alignItems: 'flex-end',
    paddingRight: 20,
    marginTop: 20,
  },
  itemText:{
    fontSize: 14,
    opacity: 0.6,
    marginRight: 5,
    color: '#254053',
  },
  priceText:{
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.9,
    marginRight: 5,
    color: '#254053'
  },
  centeringLeftText:{
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  leftTop:{
    flex:1,
    justifyContent: 'center'
  },
  summaryTitle:{
    fontSize: 20,
    fontWeight: '900',
    opacity: 0.8,
    color: '#254053',
    paddingLeft: 20
  },
})

export default OrderScreen;
