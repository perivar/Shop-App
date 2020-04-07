import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { useSelector } from 'react-redux'
import YourProduct from '../components/YourProduct'

const OwnListing = props => {
  const product = useSelector(state => state.allProducts.products)
  const userProducts = []
  for(let x = 0; x < product.length; x++){
    if(product[x].userId === 'u1'){
      userProducts.push(product[x])
    }
  }

  const renderItems = itemData => {
    return(
        <YourProduct
        name={itemData.item.name}
        price={itemData.item.price}
        img={itemData.item.url}
        description={itemData.item.description}
        navgiation={itemData}
        onSelectProduct = {() => {
            props.navigation.navigate({
            routeName: 'EditListings',
            params: {
              productId: itemData.item.id,
              name: itemData.item.name,
              price: itemData.item.price,
              user: itemData.item.userId,
              url: itemData.item.url,
              description: itemData.item.description
            }
          });
        }}
        onDeleteProduct={() => {
          return itemData.item.id
        }}
        />
    )
  }

  return (
    <View style={styles.screen}>
      <View style={styles.topInfo}>
        <View style={styles.leftTop}>
          <Text style={styles.summaryTitle}>
            You have {userProducts.length} products for sale
          </Text>
        </View>
      </View>
      <FlatList numColumns={1} data={userProducts} renderItem={renderItems} keyExtractor={(item, index) => item.id}/>
    </View>
  )
}

OwnListing.navigationOptions = (data) => {
  return{
    headerTitle: 'Your Listings',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="ios-add" iconName="ios-add-circle-outline" onPress={() => {
          data.navigation.navigate('NewListing')
        }} />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  screen:{
    flex:1
  },
  topInfo:{
    flexDirection: 'row',
    backgroundColor: '#d8eff9',
    height: 60
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

export default OwnListing;
