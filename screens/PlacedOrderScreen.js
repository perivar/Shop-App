import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch} from 'react-redux'

const PlacedOrderScreen = props => {

  const orders = useSelector(state => state.allProducts.orders);

  const renderOrder = itemData => {
    return (
        <View>
          <Text>
            {itemData.item.name}
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
})

export default PlacedOrderScreen;
