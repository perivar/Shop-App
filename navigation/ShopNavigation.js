import React from 'react'
import { View, Text, Button, Platform } from 'react-native'
import 'react-native-gesture-handler';

import HomeScreen from '../screens/HomeScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen'
import OwnListingScreen from '../screens/OwnListingScreen'
import SettingsScreen from '../screens/SettingsScreen'
import EditListingsScreen from '../screens/EditListingsScreen'
import OrdersScreen from '../screens/OrdersScreen'
import NewListingsScreen from '../screens/NewListingsScreen'
import PlacedOrderScreen from '../screens/PlacedOrderScreen'
import AuthScreen from '../screens/AuthScreen'
import StartUpScreen from '../screens/StartUpScreen'
import ChatScreen from '../screens/ChatScreen'
import StartScreen from '../screens/StartScreen'
import LogInScreen from '../screens/LogInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import PictureScreen from '../screens/PictureScreen'
import ImagePicker from '../components/ImagePicker'
import NewItem from '../components/NewItem'
import AddButton from '../components/AddButton'

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

const ShopNavigator = createStackNavigator({
  Homescreen: {
    screen: HomeScreen,
  },
  ProductScreen: {
    screen: ProductDetailScreen,
  },
  Settings: {
    screen: SettingsScreen
  },
});

const ChatNav = createStackNavigator({
  Chat: {
    screen: ChatScreen
  },
});

const ProfileNavigator = createStackNavigator({
  OwnListings:{
    screen: OwnListingScreen,
  },
  EditListings: {
    screen: EditListingsScreen
  },
  NewListing:{
    screen: NewListingsScreen
  }
})

const NewListingNavigator = createStackNavigator({
  Picture: {
    screen: ImagePicker
  },
  Form: {
    screen: NewItem
  }
})

const OrdersNavigator = createStackNavigator({
  Orders:{
    screen:OrdersScreen
  },
  Settings: {
    screen: SettingsScreen
  },
  PlacedOrders: {
    screen: PlacedOrderScreen
  }
})

const tabScreenConfig = {
    Market: {
      screen: ShopNavigator,
      navigationOptions:{
        tabBarIcon: () => {
            return <Ionicons name="ios-list" size={24}/>
          },
          tabBarColor: '#4baea0'
      }
    },
    Yours: {
      screen: ProfileNavigator,
      navigationOptions:{
        tabBarIcon: () => {
          return <Ionicons name="ios-person" size={24}/>
        },
        tabBarColor: '#4baea0'
      }
    },
    Add: {
      screen: NewListingNavigator,
      navigationOptions:{
        tabBarIcon: <AddButton />,
        labeled: false,
        // shifting: false,
        tabBarColor: '#4baea0'
      }
    },

    Cart:{
      screen: OrdersNavigator,
      navigationOptions:{
        tabBarIcon: () => {
          return <Ionicons name="ios-cart" size={24} />
        },
        tabBarColor: '#4baea0'
      }
    },
    Chat:{
      screen: ChatNav,
      navigationOptions:{
        tabBarIcon: () => {
          return <Ionicons name="ios-chatbubbles" size={24} />
        },
        tabBarColor: '#4baea0'
      }
    },
  }

const BottomNavigator = createMaterialBottomTabNavigator(tabScreenConfig, {
  initialRouteName: 'Market',
      activeColor: '#f0edf6',
      inactiveColor: '#3e2465',
      barStyle: { backgroundColor: '#2a9d8f' },
      shifting: true
});

const AuthNavigator = createStackNavigator({
  start: StartScreen,
  login: LogInScreen,
  signup: SignUpScreen
})

const MainNavigator = createSwitchNavigator({
  StartUp: StartUpScreen,
  Auth: AuthNavigator,
  Shop: BottomNavigator
})

// const mainNavigator = createDrawerNavigator({
//   ActivityFavs: {
//     screen: bottomNavigator,
//     navigationOptions: {
//     drawerLabel: "Shop"
//     }
//   },
//   Settings:{
//     screen: SettingsNavigator,
//     navigationOptions:{
//       drawerLabel: "Settings"
//     }
//   }
// })

let Navigation = createAppContainer(MainNavigator);
export default () => <Navigation />
