import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
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

import YourProduct from '../components/YourProduct';
import Product from '../models/product';
import { RootStackScreenProps } from '../navigation/ShopNavigation';
import { useAppSelector } from '../redux/store/hooks';

const { width, height } = Dimensions.get('window');
const headerHeight = Platform.OS === 'ios' ? 120 : 70 + StatusBar.currentHeight;
const scrollY = new Animated.Value(0);
const headerY = Animated.interpolateNode(scrollY, {
  inputRange: [0, headerHeight],
  outputRange: [0, -headerHeight],
});

const OwnListing = (props: RootStackScreenProps<'OwnListings'>) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // const product = useAppSelector(state => state.allProducts.products);
  const userProducts = useAppSelector(state => state.allProducts.userProducts);

  const renderItems: ListRenderItem<Product> = itemData => {
    return (
      <YourProduct
        name={itemData.item.name}
        price={itemData.item.price}
        img={itemData.item.url}
        description={itemData.item.description}
        // navigation={itemData}
        onSelectProduct={() => {
          props.navigation.navigate('EditListings', {
            productId: itemData.item.id,
            name: itemData.item.name,
            price: itemData.item.price,
            user: itemData.item.userId,
            url: itemData.item.url,
            description: itemData.item.description,
          });
        }}
        onDeleteProduct={() => {
          return itemData.item.id;
        }}
      />
    );
  };

  if (userProducts.length === 0) {
    return (
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
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No products found</Text>
        </View>
      </View>
    );
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
          elevation: 1000,
          transform: [{ translateY: headerY }],
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LinearGradient
          start={[0.6, -0.4]}
          colors={['#c2e9fb', '#C6F1E7']}
          style={{
            flex: 1,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
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
        <View style={styles.header}></View>
      </Animated.View>
      <FlatList
        contentContainerStyle={{ flex: 1, marginTop: headerHeight * 2.1 }}
        refreshing={isRefreshing}
        numColumns={1}
        data={userProducts}
        renderItem={renderItems}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

// OwnListing.navigationOptions = data => {
//   return {
//     headerTitle: 'Your Listings',
//     headerShown: false,
//     // headerRight: (
//     //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
//     //     <Item title="ios-add" iconName="ios-add-circle-outline" onPress={() => {
//     //       data.navigation.navigate('NewListing')
//     //     }} />
//     //   </HeaderButtons>
//     // ),
//     headerStyle: {
//       backgroundColor: '#c6f1e7',
//       shadowRadius: 0,
//       shadowOffset: {
//         height: 0,
//       },
//     },
//     headerTitleStyle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//     },
//   };
// };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5E9EA',
  },
  topInfo: {
    flexDirection: 'row',
    backgroundColor: '#c6f1e7',
    height: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  leftTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    flex: 1,
    textAlign: 'center',
    width: '100%',
    fontSize: width / 13,
    fontWeight: 'bold',
    opacity: 1,
    color: '#254053',
    top: 55,
    left: 0,
    position: 'absolute',
  },
  summaryTitle: {
    flex: 1,
    textAlign: 'center',
    width: '100%',
    fontSize: width / 22,
    fontWeight: 'bold',
    opacity: 0.8,
    color: '#254053',
    top: height / 8,
    left: 0,
    position: 'absolute',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OwnListing;
