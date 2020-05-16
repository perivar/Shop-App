import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from './ProductItem'
import { fetchProducts } from '../store/actions/products'

const ProductList = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()

  const allProducts = useSelector(state => state.allProducts.products);

  const dispatch = useDispatch()

  const loadProducts = useCallback(async () => {
    setIsRefreshing(true)
    setError(null)
    try {
      await dispatch(fetchProducts())
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false)
  }, [dispatch, setIsLoading, setError])

  useEffect(() => {
    const willFocusSub = props.navigation.navigation.addListener('willFocus', loadProducts)

    return () => {
      willFocusSub.remove();
    }
  }, [loadProducts])

  useEffect(() => {
    setIsLoading(true)
    loadProducts().then(() => {
      setIsLoading(false)
    })
  }, [dispatch])

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

  if (error) {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>An error occured</Text>
        <Button title="try again" onPress={loadProducts} />
      </View>
    )
  }

  if (isLoading) {
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }

  if (!isLoading && allProducts.length === 0) {
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No products found</Text>
      </View>
    )
  }

  return(
    <View style={styles.screen}>
      <FlatList onRefresh={loadProducts} refreshing={isRefreshing} numColumns={2} data={allProducts} renderItem={renderProducts} keyExtractor={(item, index) => item.id}/>
    </View>
  )
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

export default ProductList;
