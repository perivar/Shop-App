import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Button, FlatList, ActivityIndicator, SafeAreaView, Platform, StatusBar, Dimensions} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from './ProductItem'
import { fetchProducts } from '../store/actions/products'
import { useFonts } from '@use-expo/font';
import Animated, { Easing } from 'react-native-reanimated';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const headerHeight = Platform.OS == 'ios' ? 120 : 70+StatusBar;
const scrollY = new Animated.Value(0)
const headerY = Animated.interpolate(scrollY, {
  inputRange:[0, headerHeight],
  outputRange:[0,-headerHeight]
})

const {width,height} = Dimensions.get('window')
const height_logo = height * 0.4 * 0.4

const ProductList = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const [username, setUsername] = useState(null)
  const [animationState, setAnimationState] = useState("bounceIn")

  const allProducts = useSelector(state => state.allProducts.products);

  const dispatch = useDispatch()

  const loadProducts = useCallback(async () => {
    setIsRefreshing(true)
    setError(null)
    try {
      await dispatch(fetchProducts())
      const value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          const response = await JSON.parse(value)
          setUsername(response.displayName)
        }
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false)
  }, [dispatch, setIsLoading, setError])

  // useEffect(() => {
  //   const willFocusSub = props.navigation.navigation.addListener('willFocus', loadProducts)
  //
  //   return () => {
  //     willFocusSub.remove();
  //   }
  // }, [loadProducts])

  useEffect(() => {
    setIsLoading(true)
    loadProducts().then(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  const renderProducts = (itemData) => {
    return(
       <ProductItem
        name={itemData.item.name}
        price={itemData.item.price}
        url={itemData.item.url}
        description={itemData.item.description}
        location={itemData.item.location}
        onAddToCart = {() => {
          return itemData.item.id;
        }}
        onSelectProduct = {() => {
            props.navigation.navigation.navigate({
            routeName: 'ProductScreen',
            params: {
              productId: itemData.item.id,
              name: itemData.item.name,
              price: itemData.item.price,
              user: itemData.item.userId,
              url: itemData.item.url,
              seller: itemData.item.seller,
              description: itemData.item.description,
              location: itemData.item.location
            }
          });
        }}
        />
    );
  };

  if (error) {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>An error occured</Text>
        <Button title="try again" onPress={loadProducts} />
      </View>
    )
  }

  if (isLoading) {
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }

  if (!isLoading && allProducts.length === 0) {
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No products found</Text>
      </View>
    )
  }

  return(
    <View style={styles.screen}>
        <View>
          <Animated.View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              left: 0,
              right: 0,
              top: 0,
              height: headerHeight,
              backgroundColor: '#c6f1e7',
              zIndex: 1000,
              elevation:1000,
              transform: [{ translateY: headerY }],
              alignItems: 'center',
              justifyContent: 'center',
            }}
           >
             <Animatable.Text
               animation={animationState}
               duration={900}
               onAnimationEnd={() => {
                 setTimeout(() => {
                   setAnimationState("bounceOut")
                 }, 2000)
               }}
               style={styles.welcomeText}>
             Welcome {username}!
            </Animatable.Text>
             <View style={styles.header}>

               <Animatable.Image
                 source={require('../assets/logo.png')}
                 style={styles.logo}
                 resizeMode={"stretch"}
                 animation="fadeInDown"
                 duration={600}
                 delay={4000}
               />
             </View>
             <MaterialIcons onPress={() => {console.log(props.navigation.navigation.navigate("Settings"))}} name="settings" size={24} style={{position: 'absolute', top: 53 ,right: 13}}/>
           </Animated.View>
          <AnimatedFlatList
            contentContainerStyle={{ paddingTop: headerHeight + height_logo / 3 }}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {
              nativeEvent: { contentOffset: { y: scrollY }}
              }
          ],{ useNativeDriver: true })}
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            numColumns={2}
            data={allProducts}
            renderItem={renderProducts}
            keyExtractor={(item, index) => item.id}
          />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5E9EA',
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: headerHeight + height_logo / 3,
    shadowColor: "#8aa8a1",
    shadowRadius: 5,
    shadowOffset: {height:5},
    shadowOpacity: 0.2,
    paddingTop: 30
  },
  logo:{
    top:height / 6,
    width: height_logo,
    height: height_logo,
    borderRadius: height_logo / 2,
  },
  welcomeText:{
    flex:1,
    textAlign: 'center',
    width: '100%',
    fontSize: width / 20,
    fontWeight: '600',
    opacity: 0.8,
    color: '#254053',
    top: 70,
    left: 0,
    position: 'absolute'
  }
})

export default ProductList;
