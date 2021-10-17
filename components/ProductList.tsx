import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Dimensions,
  FlatList,
  ListRenderItem,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Animated from 'react-native-reanimated';

import Product from '../models/product';
import { RootStackScreenProps } from '../navigation/ShopNavigation';
import { fetchProducts } from '../redux/methods/products';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import ProductItem from './ProductItem';

// TODO: PIN
// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const headerHeight = Platform.OS === 'ios' ? 120 : 70 + StatusBar.currentHeight;
const scrollY = new Animated.Value(0);
const headerY = Animated.interpolateNode(scrollY, {
  inputRange: [0, headerHeight],
  outputRange: [0, -headerHeight],
});

const { width, height } = Dimensions.get('window');
const height_logo = height * 0.4 * 0.4;

const ProductList: React.FC<{
  navigation: RootStackScreenProps<'Home'>;
}> = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [username, setUsername] = useState(null);
  const [animationState, setAnimationState] = useState('bounceIn');

  const allProducts = useAppSelector(state => state.allProducts.products);

  const dispatch = useAppDispatch();

  const loadProducts = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await dispatch(fetchProducts());
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        const response = await JSON.parse(value);
        setUsername(response.displayName);
      }
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  // useEffect(() => {
  //   const willFocusSub = props.navigation.navigation.addListener('willFocus', loadProducts)
  //
  //   return () => {
  //     willFocusSub.remove();
  //   }
  // }, [loadProducts])

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const renderProducts: ListRenderItem<Product> = itemData => {
    return (
      <ProductItem
        name={itemData.item.name}
        price={itemData.item.price}
        url={itemData.item.url}
        description={itemData.item.description}
        location={itemData.item.location}
        onAddToCart={() => {
          return itemData.item.id;
        }}
        onSelectProduct={() => {
          props.navigation.navigation.navigate('Product', {
            productId: itemData.item.id,
            name: itemData.item.name,
            price: itemData.item.price,
            uid: itemData.item.userId,
            url: itemData.item.url,
            seller: itemData.item.seller,
            description: itemData.item.description,
            location: itemData.item.location,
            profilePic: itemData.item.profilePic,
          });
        }}
      />
    );
  };

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>An error occurred</Text>
        <Button title="try again" onPress={loadProducts} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoading && allProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No products found</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View>
        <Animated.View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            left: 0,
            right: 0,
            top: 0,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            height: headerHeight,
            backgroundColor: '#c6f1e7',
            zIndex: 1000,
            elevation: 1000,
            transform: [{ translateY: headerY }],
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LinearGradient
            start={[0.45, -0.3]}
            colors={['#f8f3e2', '#C6F1E7']}
            style={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              height: height / 3,
            }}
          />
          <Animatable.Text
            animation={animationState}
            duration={900}
            onAnimationEnd={() => {
              setTimeout(() => {
                setAnimationState('bounceOut');
              }, 2000);
            }}
            style={styles.welcomeText}>
            Welcome {username}!
          </Animatable.Text>
          <View style={styles.header}>
            <Animatable.Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode={'stretch'}
              animation="fadeInDown"
              duration={600}
              delay={3500}
            />
          </View>
          <MaterialIcons
            onPress={() => {
              props.navigation.navigation.navigate('Settings');
            }}
            name="settings"
            size={24}
            style={{ position: 'absolute', top: 53, right: 13 }}
          />
        </Animated.View>
        <FlatList
          contentContainerStyle={{ paddingTop: headerHeight + height_logo / 3 }}
          scrollEventThrottle={16}
          // onScroll={Animated.event(
          //   [
          //     {
          //       nativeEvent: { contentOffset: { y: scrollY } },
          //     },
          //   ],
          //   { useNativeDriver: true }
          // )}
          onRefresh={loadProducts}
          refreshing={isRefreshing}
          numColumns={2}
          data={allProducts}
          renderItem={renderProducts}
          keyExtractor={(item: Product, index) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#F5E9EA',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginBottom: headerHeight + height_logo / 3,
    shadowColor: '#8aa8a1',
    shadowRadius: 5,
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 0.2,
    paddingTop: 30,
  },
  logo: {
    top: height / 35,
    width: height_logo,
    height: height_logo,
    borderRadius: height_logo / 2,
  },
  welcomeText: {
    flex: 1,
    textAlign: 'center',
    width: '100%',
    fontSize: width / 20,
    fontWeight: '600',
    opacity: 0.8,
    color: '#254053',
    top: 70,
    left: 0,
    position: 'absolute',
  },
});

export default ProductList;
