import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CartItem from '../components/CartItem';
import Product from '../models/product';
import { RootStackScreenProps } from '../navigation/ShopNavigation';
import { fetchCart, placeOrder } from '../redux/methods/products';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';

const OrdersScreen = (props: RootStackScreenProps<'Orders'>) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const result = fetchCart();
  });

  const productsInCart = useAppSelector(state => state.allProducts.cart);

  const numberOfProducts = useAppSelector(state => state.allProducts.counter);

  const sumCart = useAppSelector(state => state.allProducts.sumCart);
  var rounded = Math.round(sumCart * 10) / 10;

  let totalProducts = 0;

  for (let x = 0; x < numberOfProducts.length; x++) {
    totalProducts += Math.round(numberOfProducts[x].number * 10) / 10;
  }

  const renderCart: ListRenderItem<Product> = itemData => {
    return (
      <CartItem
        id={itemData.item.id}
        name={itemData.item.name}
        price={itemData.item.price}
        image={itemData.item.url}
        onDeleteItem={() => {
          return itemData.item.id;
        }}
      />
    );
  };

  const orderHandler = useCallback(async () => {
    const prodNames = productsInCart.map(product => {
      return product;
    });
    setIsLoading(true);
    let objectReturn = await placeOrder(prodNames, sumCart);
    await dispatch(objectReturn);
    setIsLoading(false);
  }, [dispatch, productsInCart]);

  return (
    <View style={styles.priceSummary}>
      <SafeAreaView style={styles.topInfo}>
        <View style={styles.leftTop}>
          <Text style={styles.summaryTitle}>Your Summary</Text>
        </View>
        <View style={styles.textWrapper}>
          <View style={styles.centeringLeftText}>
            <Text style={styles.itemText}>{totalProducts} items</Text>
            <Text style={styles.priceText}>{rounded} NOK</Text>
          </View>
        </View>
      </SafeAreaView>
      <FlatList
        style={styles.list}
        numColumns={1}
        data={productsInCart}
        renderItem={renderCart}
        keyExtractor={(item, index) => item.id}
      />
      <TouchableOpacity style={styles.orderButton} onPress={orderHandler}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Place Order</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

// OrdersScreen.navigationOptions = data => {
//   return {
//     headerTitle: 'Cart',
//     headerRight: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="settings"
//           iconName="ios-rocket"
//           onPress={() => {
//             data.navigation.navigate('PlacedOrders');
//           }}
//         />
//       </HeaderButtons>
//     ),
//     headerStyle: {
//       backgroundColor: '#c6f1e7',
//       shadowRadius: 0,
//       shadowOffset: {
//         height: 0,
//       },
//     },
//     headerTitleStyle: {
//       fontSize: width / 15,
//       fontWeight: 'bold',
//     },
//   };
// };

const styles = StyleSheet.create({
  topInfo: {
    flexDirection: 'row',
    backgroundColor: '#c6f1e7',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  priceSummary: {
    flex: 1,
    backgroundColor: '#F5E9EA',
  },
  textWrapper: {
    flexDirection: 'column',
    height: 50,
    alignItems: 'flex-end',
    paddingRight: 20,
    marginTop: 20,
  },
  itemText: {
    fontSize: 14,
    opacity: 0.6,
    marginRight: 5,
    color: '#254053',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.9,
    marginRight: 5,
    color: '#254053',
  },
  centeringLeftText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  leftTop: {
    flex: 1,
    justifyContent: 'center',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '900',
    opacity: 0.8,
    color: '#254053',
    paddingLeft: 20,
  },
  orderButton: {
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
    shadowColor: '#893D3D',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  list: {},
});

export default OrdersScreen;
