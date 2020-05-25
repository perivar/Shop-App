import React, { useState, useCallback, useEffect} from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { useSelector, useDispatch} from 'react-redux'
import YourProduct from '../components/YourProduct'
import Animated, { Easing } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';

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
            animation="fadeInDown"
            delay={200}
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
      <Animatable.View
        animation="fadeInLeft"
        duration={800}
        style={styles.topInfo}>
        <View style={styles.leftTop}>
          <Text
            style={styles.summaryTitle}>
            You have {userProducts.length} products for sale
          </Text>
        </View>
      </Animatable.View>
      <FlatList
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
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="ios-add" iconName="ios-add-circle-outline" onPress={() => {
          data.navigation.navigate('NewListing')
        }} />
      </HeaderButtons>
    ),
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
    backgroundColor: '#F5E9EA'
  },
  topInfo:{
    flexDirection: 'row',
    backgroundColor: '#c6f1e7',
    height: 60,
  },
  leftTop:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  summaryTitle:{
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.8,
    color: '#254053',
    paddingLeft: 20
  },
})

export default OwnListing;
