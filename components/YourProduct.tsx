import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { removeListing } from '../redux/methods/products';
import { useAppDispatch } from '../redux/store/hooks';

const { width, height } = Dimensions.get('window');

const YourProduct: React.FC<{
  name: string;
  price: number;
  img: string;
  description: string;
  onDeleteProduct(): string;
  onSelectProduct(event: GestureResponderEvent): void;
}> = props => {
  const [animation, setAnimation] = useState<string>();

  const dispatch = useAppDispatch();

  const deleteHandler = (productToDelete: string) => {
    Alert.alert(
      props.name,
      'Are your sure you want to delete ' + props.name + '?',
      [
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            await fadeoutItem();
            let objReturn = removeListing(productToDelete);
            dispatch(objReturn);
          },
        },
        { text: 'No', style: 'default' },
      ],
      { cancelable: true }
    );
  };

  const fadeoutItem = () => {
    setAnimation('fadeOutLeft');
  };

  return (
    <Animatable.View
      animation="fadeInRight"
      duration={800}
      style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.top}>
          <View style={styles.pictureWrap}>
            <Image source={{ uri: props.img }} style={styles.productImg} />
          </View>
          <View style={styles.middle}>
            <Text style={styles.middleText}>{props.name}</Text>
            <View style={styles.middlecontent}>
              <Text style={styles.price}>{props.price} NOK</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            // animation={animation}
            style={styles.leftBottom}
            onPress={() => {
              const productId = props.onDeleteProduct();
              deleteHandler(productId);
            }}>
            <MaterialIcons
              style={styles.trashIcon}
              name="delete-forever"
              size={25}
            />
            <Text style={styles.removeText}>REMOVE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rightBottom}
            onPress={props.onSelectProduct}>
            <MaterialIcons
              style={styles.trashIcon}
              name="mode-edit"
              size={20}
            />
            <Text style={styles.productText}>EDIT LISTING</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: height / 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'column',
    backgroundColor: '#fbf7f7',
    height: height / 4.5,
    paddingTop: 23,
    paddingHorizontal: 23,
    width: '96%',
    borderRadius: 5,
    marginVertical: 10,
    shadowColor: '#e1dede',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  pictureWrap: {
    flex: 1,
    maxWidth: 100,
    maxHeight: 100,
    borderRadius: 5,
    overflow: 'hidden',
  },
  productImg: {
    height: '100%',
    width: '100%',
    opacity: 1,
  },
  top: {
    flexDirection: 'row',
  },
  middle: {
    flex: 1,
  },
  middleText: {
    flex: 1,
    marginLeft: 20,
    marginTop: 2,
    fontWeight: '900',
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#23211f',
  },
  middlecontent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 5,
    marginLeft: 20,
  },
  price: {
    fontSize: 18,
    opacity: 0.9,
    marginRight: 15,
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
  },
  leftBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeText: {
    opacity: 0.6,
    marginLeft: 5,
    fontSize: 14,
    color: '#254053',
    fontWeight: 'bold',
  },
  trashIcon: {
    opacity: 0.6,
    color: '#e56767',
  },
  productText: {
    opacity: 0.6,
    marginLeft: 5,
    fontSize: 14,
    color: '#254053',
    fontWeight: 'bold',
  },
  rightBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default YourProduct;
