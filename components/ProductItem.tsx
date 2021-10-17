import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ProductItem: React.FC<{
  url: string;
  price: number;
  name: string;
  location: string;
  description: string;
  onSelectProduct(event: GestureResponderEvent): void;
  onAddToCart(): void;
}> = props => {
  return (
    <View style={styles.productItem}>
      <TouchableOpacity
        onPress={props.onSelectProduct}
        style={styles.touchableOp}>
        <View style={styles.imageWrap}>
          <ImageBackground source={{ uri: props.url }} style={styles.bgImg}>
            <Text numberOfLines={1} style={styles.price}>
              {props.price} NOK
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.bottomOfCard}>
          <View style={styles.left}>
            <Text numberOfLines={1} style={styles.title}>
              {props.name}
            </Text>
            {/* <Text numberOfLines={1} style={styles.price}>{props.price} NOK</Text> */}
          </View>
          <Text style={styles.location}>{props.location}</Text>
          <View style={styles.right}>
            {/* <TouchableOpacity style={styles.cartWrapper} onPress={() => {
            const productId = props.onAddToCart();
            let objectReturn = addToCart(productId);
            dispatch(objectReturn);
          }}>
            <MaterialIcons name="add-shopping-cart" size={32} color="#254053"/>
          </TouchableOpacity> */}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    height: 200,
    width: '45%',
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
  touchableOp: {
    flex: 1,
  },
  imageWrap: {
    height: height / 5.5,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  bottomOfCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fbf7f7',
  },
  left: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  right: {},
  location: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
    fontSize: 11,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    fontWeight: '300',
    alignSelf: 'flex-start',
    color: 'white',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  bgImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
});

export default ProductItem;
