import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { useSelector, useDispatch} from 'react-redux'
import CartItem from '../components/CartItem'
import { placeOrder } from '../store/actions/products'
import { fetchCart } from '../store/actions/products'

const OrderScreen = props => {

  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    const result = fetchCart()
  })

  const productsInCart = useSelector(state => state.allProducts.cart);

  const numberOfProducts = useSelector(state => state.allProducts.counter)

  const sumCart = useSelector(state => state.allProducts.sumCart);
  var rounded = Math.round(sumCart * 10) / 10

  let totalProducts = 0;

  for(let x = 0; x < numberOfProducts.length; x++){
    totalProducts += Math.round(numberOfProducts[x].number * 10) / 10
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

  const orderHandler = useCallback(async () => {
    const prodNames = productsInCart.map(product => {return product})
    setIsLoading(true)
    let objectReturn = await placeOrder(prodNames, rounded)
    await dispatch(objectReturn)
    setIsLoading(false)
  }, [dispatch, productsInCart])

  return (
    <View style={styles.priceSummary}>
      <SafeAreaView style={styles.topInfo}>
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
      </SafeAreaView>
      <FlatList style={styles.list} numColumns={1} data={productsInCart} renderItem={renderCart} keyExtractor={(item, index) => item.id}/>
        <TouchableOpacity style={styles.orderButton} onPress={orderHandler}>
        {isLoading ? <ActivityIndicator size="small" color="#fff"/> : <Text style={styles.buttonText}>Place Order</Text> }
        </TouchableOpacity>
    </View>
    )
}

OrderScreen.navigationOptions = (data) => {
  return {
    headerTitle: 'Cart',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="settings" iconName="ios-rocket" onPress={() => {
          data.navigation.navigate('PlacedOrders')
        }} />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: '#c6f1e7',
      shadowRadius: 0,
      shadowOffset: {
          height: 0,
        },
    },
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  }
}

const styles = StyleSheet.create({
  topInfo:{
    flexDirection: 'row',
    backgroundColor: '#c6f1e7',
  },
  priceSummary:{
    flex:1,
    backgroundColor: '#F5E9EA'
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
  buttonWrap:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  orderButton:{
    justifyContent: 'center',
    width: '70%',
    bottom: 20,
    right: 50,
    position: 'absolute',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    paddingBottom: 12,
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderColor: '#e56767',
    backgroundColor: '#e56767',
    shadowColor: "#893D3D",
    shadowOffset: {
    	width: 0,
    	height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 2,
  },
  buttonText:{
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  }
})

export default OrderScreen;
