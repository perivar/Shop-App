import React, { useState, useCallback, useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions, Button, FlatList, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { useSelector, useDispatch} from 'react-redux'
import YourProduct from '../components/YourProduct'
import Animated, { Easing } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'

const {width,height} = Dimensions.get('window')
const headerHeight = Platform.OS == 'ios' ? 120 : 70+StatusBar;
const scrollY = new Animated.Value(0)
const headerY = Animated.interpolate(scrollY, {
  inputRange:[0, headerHeight],
  outputRange:[0,-headerHeight]
})
const height_logo = height * 0.4 * 0.4

const OwnListing = props => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const product = useSelector(state => state.allProducts.products)
  const userProducts = useSelector(state => state.allProducts.userProducts);

  const renderItems = itemData => {
    return(
        <YourProduct
        name={itemData.item.name}
        price={itemData.item.price}
        img={itemData.item.url}
        description={itemData.item.description}
        navgiation={itemData}
        onSelectProduct = {() => {
            props.navigation.navigate({
            routeName: 'EditListings',
            params: {
              productId: itemData.item.id,
              name: itemData.item.name,
              price: itemData.item.price,
              user: itemData.item.userId,
              url: itemData.item.url,
              description: itemData.item.description
            }
          });
        }}
        onDeleteProduct={() => {
          return itemData.item.id
        }}
        />
    )
  }

  if(userProducts.length === 0){
    return(
    <View style={styles.screen}>
      <Animatable.View
        animation="fadeInDown"
        duration={800}
        style={styles.topInfo}>
        <View style={styles.leftTop}>
          <Animatable.Text
            animation="fadeIn"
            delay={400}
            duration={800}
            style={styles.summaryTitle}>
            You have {userProducts.length} products for sale
          </Animatable.Text>
        </View>
      </Animatable.View>
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          No products found
        </Text>
      </View>
    </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Animated.View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          left: 0,
          right: 0,
          top: 0,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: headerHeight * 1.2,
          backgroundColor: '#c6f1e7',
          zIndex: 1000,
          elevation:1000,
          transform: [{ translateY: headerY }],
          alignItems: 'center',
          justifyContent: 'center',
        }}
       >
           <LinearGradient
                start={[0.6,-0.4]}
               colors={['#c2e9fb', '#C6F1E7']}
               style={{
                 flex:1,
                 borderBottomLeftRadius: 20,
                 borderBottomRightRadius: 20,
                 // height: height / 3
               }}
             />
         <Animatable.Text
           animation="fadeInDown"
           duration={700}
           style={styles.welcomeText}>
           Your listings
        </Animatable.Text>
          <Animatable.Text
            animation="fadeInLeft"
            duration={500}
            style={styles.summaryTitle}>
            You have {userProducts.length} products for sale
          </Animatable.Text>
         <View style={styles.header}>
         </View>
       </Animated.View>
      {/* <Animatable.View
        animation="fadeInDown"
        duration={800}
        style={styles.topInfo}>

      </Animatable.View> */}
      <FlatList
        contentContainerStyle={{ flex:1, marginTop: headerHeight * 2.1}}
        refreshing={isRefreshing}
        numColumns={1}
        data={userProducts}
        renderItem={renderItems}
        keyExtractor={(item, index) => item.id}/>
    </View>
  )
}

OwnListing.navigationOptions = (data) => {
  return{
    headerTitle: 'Your Listings',
    headerShown: false,
    // headerRight: (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item title="ios-add" iconName="ios-add-circle-outline" onPress={() => {
    //       data.navigation.navigate('NewListing')
    //     }} />
    //   </HeaderButtons>
    // ),
    headerStyle: {
      backgroundColor: '#c6f1e7',
      shadowRadius: 0,
      shadowOffset: {
          height: 0,
        },
    },
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  }
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    backgroundColor: '#F5E9EA',
  },
  topInfo:{
    flexDirection: 'row',
    backgroundColor: '#c6f1e7',
    height: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  leftTop:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeText:{
    flex:1,
    textAlign: 'center',
    width: '100%',
    fontSize: width / 13,
    fontWeight: 'bold',
    opacity: 1,
    color: '#254053',
    top: 55,
    left: 0,
    position: 'absolute'
  },
  summaryTitle:{
    flex:1,
    textAlign: 'center',
    width: '100%',
    fontSize: width / 22,
    fontWeight: 'bold',
    opacity: 0.8,
    color: '#254053',
    top: height / 8,
    left: 0,
    position: 'absolute'
  },
})

export default OwnListing;
