import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Button, FlatList, TouchableOpacity, Platform, TouchableNativeFeedback, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../store/actions/products'

const CartItem = props =>  {
  const dispatch = useDispatch()

  const cart = useSelector(state => state.allProducts.cart)
  
  const numberOfProduct = useSelector(state => state.allProducts.counter)
  const findProduct = numberOfProduct.find(product => product.product === props.id)
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>

        <View style={styles.top}>
          <View style={styles.pictureWrap}>
            <Image source={{uri: props.image}} style={styles.productImg}/>
          </View>
          <View style={styles.middle}>
            <Text style={styles.middleText}>
              {props.name}
            </Text>
            <View style={styles.middlecontent}>
              <Text style={styles.price}>
                {props.price}
              </Text>
              <Text style={styles.times}>
                x
              </Text>
              <View>
                <Text style={styles.counter}>
                   {findProduct.number}
                </Text>
              </View>
              <Text style={styles.totalPrice}>
                {props.price}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottom}>

            <TouchableOpacity style={styles.leftBottom} onPress={() => {
              const productId = props.onDeleteItem();
              let objectReturn = removeFromCart(productId);
              dispatch(objectReturn);
            }}>
              <MaterialIcons style={styles.trashIcon} name="delete-forever" size={25} color="#254053" />
              <Text style={styles.removeText}>
                REMOVE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rightBottom} onPress={() => {console.log("product")}}>
              <Text style={styles.productText}>
                SEE PRODUCT
              </Text>
              <Ionicons style={styles.trashIcon} name="ios-arrow-dropright" size={20} color="#254053" />
            </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 container:{
   flex:1,
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
 },
 itemContainer:{
   flexDirection: 'column',
   backgroundColor: '#f5f5f5',
   height: 200,
   paddingTop: 23,
   paddingHorizontal: 23,
   width:'96%',
   borderRadius: 5,
   margin: 4,
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
 pictureWrap:{
   flex:1,
   maxWidth: 100,
   maxHeight: 100,
   borderRadius: 5,
   overflow: 'hidden',
 },
 productImg:{
   height: '100%',
   width: '100%',
   opacity: 1
 },
 top:{
   flexDirection: 'row',
 },
 middle:{
   flex:1,
 },
 middleText:{
   flex:1,
   marginLeft: 20,
   marginTop: 2,
   fontWeight: '900',
   textTransform: 'uppercase',
   fontSize: 20,
   color: '#23211f',
 },
 middlecontent:{
   flex:1,
   flexDirection: 'row',
   alignItems: 'flex-end',
   paddingBottom: 5,
   marginLeft: 20,
 },
 price:{
   fontSize: 16,
   opacity: 0.5,
   marginRight: 15
 },
 times:{
   fontSize: 16,
   opacity: 0.5,
   marginBottom: 1.5,
   marginRight: 15
 },
 totalPrice:{
   fontSize: 16,
   opacity: 1,
   fontWeight: 'bold',
 },
 counter:{
   fontSize: 16,
   opacity: 0.7,
   marginRight: 25,
   borderWidth: 0.5,
   borderColor: '#254053',
   paddingHorizontal: 10,
   borderRadius: 3
 },
 bottom:{
   flex:1,
   flexDirection: 'row',
 },
 leftBottom:{
   flex:1,
   flexDirection: 'row',
   alignItems: 'center',
 },
 removeText:{
   opacity: 0.6,
   marginLeft: 5,
   fontSize: 14,
   color: '#254053'
 },
 trashIcon:{
   opacity: 0.6
 },
 productText:{
   opacity: 0.6,
   marginRight: 5,
   fontSize: 14,
   color: '#254053'
 },
 rightBottom:{
   flex:1,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'flex-end'
 },
})

export default CartItem;
