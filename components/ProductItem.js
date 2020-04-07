import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Platform, TouchableNativeFeedback, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/actions/products'

const ProductItem = props => {
  const dispatch = useDispatch()

  return(
    <View style={styles.productItem}>
      <TouchableOpacity onPress={props.onSelectProduct} style={styles.touchableOp}>
      <View style={styles.imageWrap}>
        <ImageBackground source={{uri: props.url}} style={styles.bgImg}>
        </ImageBackground>
      </View>
      <View style={styles.bottomOfCard}>
        <View style={styles.left}>
          <Text numberOfLines={1} style={styles.title}>{props.name}</Text>
          <Text numberOfLines={1} style={styles.price}>{props.price} NOK</Text>
        </View>

        <View style={styles.right}>
          <TouchableOpacity style={styles.cartWrapper} onPress={() => {
            const productId = props.onAddToCart();
            let objectReturn = addToCart(productId);
            dispatch(objectReturn);
          }}>
            <MaterialIcons name="add-shopping-cart" size={32} color="#254053"/>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  productItem:{
    height: 250,
    width:'45%',
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 6,
  },
  touchableOp:{
    flex:1,
  },
  imageWrap:{
    height:170,
    backgroundColor: '#FFFF',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  bottomOfCard:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f4f4f4'
  },
  left:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  right:{
    flex:0.35,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#d8eff9',
    borderLeftWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  cartWrapper:{
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight:5
  },
  title:{
    fontSize: 20,
    fontWeight: '900'
  },
  price:{
    fontSize: 14,
    fontWeight: '300'
  },
  bgImg:{
  width: '100%',
  height: '100%',
  justifyContent: 'flex-end',
  },
})

export default ProductItem;
