import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Order from '../models/order';
import Product from '../models/product';
import { RootStackScreenProps } from '../navigation/ShopNavigation';
import { fetchOrders } from '../redux/methods/products';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';

const PlacedOrderScreen = (props: RootStackScreenProps<'PlacedOrders'>) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.allProducts.orders);

  useEffect(() => {
    setIsLoading(true);
    let objectReturn = fetchOrders();
    dispatch(objectReturn).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const renderOrder: ListRenderItem<Order> = itemData => {
    const indexNumber = itemData.index + 1;
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>{indexNumber}</Text>
          <Text style={styles.text}>Total: {itemData.item.totalAmount}</Text>
          <View style={styles.textContainer}>
            {itemData.item.items.map((cartItem: Product) => (
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
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No orders found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        numColumns={1}
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    margin: 5,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  infoWrapper: {
    flex: 1,
  },
  nameWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  list: {},
});

export default PlacedOrderScreen;
