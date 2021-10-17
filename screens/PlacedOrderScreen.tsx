import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch} from 'react-redux'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { fetchOrders } from '../store/actions/products'

const PlacedOrderScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const orders = useSelector(state => state.allProducts.orders);

  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchOrders()).then(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  const renderOrder = itemData => {
    const indexNumber = itemData.index + 1
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>{indexNumber}</Text>
          <Text style={styles.text}>Total: {itemData.item.totalAmount}</Text>
          <View style={styles.textContainer}>
              {itemData.item.items.map(cartItem => (
                <View style={styles.infoWrapper}>
                  <View style={styles.nameWrap}>
                    <Text style={styles.text}>{cartItem.name}</Text>
                    <Text style={styles.text}>{cartItem.price}</Text>
                  </View>
                </View>
          ))}
          </View>
        </View>
      </View>
    )
  }

  if(isLoading) {
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if(orders.length === 0){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          No orders found
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList style={styles.list} numColumns={1} data={orders} renderItem={renderOrder} keyExtractor={(item, index) => item.id}/>
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
  container:{
    flex:1,
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  itemContainer:{
    flex:1,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 10,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
     width: 0,
     height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 3,
  },
  textContainer:{
    flex: 1
  },
  middleText:{
    marginLeft: 20,
    marginTop: 2,
    fontWeight: '900',
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#23211f',
  },
  infoWrapper:{
    flex:1,
  },
  nameWrap:{
    flex:1,
    flexDirection: 'row'
  },
  text:{
    fontSize: 16,
    margin: 5
  }
})

export default PlacedOrderScreen;
