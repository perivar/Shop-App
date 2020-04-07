import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useSelector } from 'react-redux'
import ProductItem from './ProductItem'

const ProductList = props => {
  const allProducts = useSelector(state => state.allProducts.products);
  const cart = useSelector(state => state.allProducts.cart);
  const renderProducts = (itemData) => {
    return(
      <ProductItem
        name={itemData.item.name}
        price={itemData.item.price}
        url={itemData.item.url}
        description={itemData.item.description}
        onAddToCart = {() => {
          return itemData.item.id;
        }}
        onSelectProduct = {() => {
            props.navigation.navigation.navigate({
            routeName: 'ProductScreen',
            params: {
              productId: itemData.item.id,
              name: itemData.item.name,
              price: itemData.item.price,
              user: itemData.item.userId,
              url: itemData.item.url,
              seller: itemData.item.seller,
              description: itemData.item.description
            }
          });
        }}
        />
    );
  };

  return(
    <View style={styles.screen}>
      <FlatList numColumns={2} data={allProducts} renderItem={renderProducts} keyExtractor={(item, index) => item.id}/>
    </View>
  )
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})

export default ProductList;
