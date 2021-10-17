import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  CompositeScreenProps,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';

import AddButton from '../components/AddButton';
import ImagePicker from '../components/ImagePicker';
import NewItem from '../components/NewItem';
import ChatListScreen from '../screens/ChatListScreen';
import ChatScreen from '../screens/ChatScreen';
import EditListingsScreen from '../screens/EditListingsScreen';
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';
import NewListingsScreen from '../screens/NewListingsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OwnListingScreen from '../screens/OwnListingScreen';
import PlacedOrderScreen from '../screens/PlacedOrderScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import StartScreen from '../screens/StartScreen';
import StartUpScreen from '../screens/StartUpScreen';

export type RootStackParamList = {
  // shop
  Home: undefined;
  Product: {
    productId: string;
    name: string;
    price: number;
    uid: string;
    url: string;
    seller: string;
    description: string;
    location: string;
    profilePic: string;
  };
  Settings: undefined;

  // chat
  List: undefined;
  Chats: {
    uid: string;
    seller: string;
    img: string;
  };

  // profile
  OwnListings: undefined;
  EditListings: {
    productId: string;
    name: string;
    price: number;
    user: string;
    url: string;
    description: string;
  };

  // New Listing forwards the props to Form, therefore they need to have the same props
  NewListing: {
    img: string;
  };
  Form: {
    img: string;
  };

  // new listing
  Picture: undefined;

  // orders
  Orders: undefined;
  PlacedOrders: undefined;

  // auth
  Start: undefined;
  Login: undefined;
  SignUp: undefined;

  // main
  StartUp: undefined;
  Auth: undefined;
  Shop: undefined;

  // tabs
  Market: undefined;
  Yours: undefined;
  Add: undefined;
  Cart: undefined;
  Chat: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

const ShopStack = createNativeStackNavigator<RootStackParamList>();
const ShopNavigator = () => (
  <ShopStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <ShopStack.Screen name="Home" component={HomeScreen} />
    <ShopStack.Screen name="Product" component={ProductDetailScreen} />
    <ShopStack.Screen name="Settings" component={SettingsScreen} />
  </ShopStack.Navigator>
);

const ChatStack = createNativeStackNavigator<RootStackParamList>();
const ChatNavigator = () => (
  <ChatStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <ChatStack.Screen name="List" component={ChatListScreen} />
    <ChatStack.Screen name="Chats" component={ChatScreen} />
  </ChatStack.Navigator>
);

const ProfileStack = createNativeStackNavigator<RootStackParamList>();
const ProfileNavigator = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <ProfileStack.Screen name="OwnListings" component={OwnListingScreen} />
    <ProfileStack.Screen name="EditListings" component={EditListingsScreen} />
    <ProfileStack.Screen name="NewListing" component={NewListingsScreen} />
    <ProfileStack.Screen
      name="Form"
      component={NewItem}
      options={{ gestureEnabled: false }}
    />
  </ProfileStack.Navigator>
);

const NewListingStack = createNativeStackNavigator<RootStackParamList>();
const NewListingNavigator = () => (
  <NewListingStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <NewListingStack.Screen name="Picture" component={ImagePicker} />
  </NewListingStack.Navigator>
);

const OrdersStack = createNativeStackNavigator<RootStackParamList>();
const OrdersNavigator = () => (
  <OrdersStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <OrdersStack.Screen name="Orders" component={OrdersScreen} />
    <OrdersStack.Screen name="Settings" component={SettingsScreen} />
    <OrdersStack.Screen name="PlacedOrders" component={PlacedOrderScreen} />
  </OrdersStack.Navigator>
);

export type RootTabParamList = {
  // default tabs
  Market: undefined;
  Yours: undefined;
  Add: undefined;
  Cart: undefined;
  Chat: undefined;
};

const BottomTab = createMaterialBottomTabNavigator<RootTabParamList>();
const BottomTabNavigator = () => (
  <BottomTab.Navigator
    initialRouteName="Market"
    activeColor="#f0edf6"
    inactiveColor="#3e2465"
    barStyle={{ backgroundColor: '#2a9d8f' }}
    labeled={true}>
    <BottomTab.Screen
      name="Market"
      component={ShopNavigator}
      options={(props: RootTabScreenProps<'Market'>) => ({
        tabBarIcon: () => {
          return <Ionicons name="ios-list" size={24} />;
        },
      })}
    />
    <BottomTab.Screen
      name="Yours"
      component={ProfileNavigator}
      options={(props: RootTabScreenProps<'Yours'>) => ({
        tabBarIcon: () => {
          return <Ionicons name="ios-person" size={24} />;
        },
      })}
    />
    <BottomTab.Screen
      name="Add"
      component={NewListingNavigator}
      options={(props: RootTabScreenProps<'Add'>) => ({
        tabBarLabel: '',
        tabBarIcon: () => {
          return <AddButton />;
        },
      })}
    />
    <BottomTab.Screen
      name="Cart"
      component={OrdersNavigator}
      options={(props: RootTabScreenProps<'Cart'>) => ({
        tabBarIcon: () => {
          return <Ionicons name="ios-cart" size={24} />;
        },
      })}
    />
    <BottomTab.Screen
      name="Chat"
      component={ChatNavigator}
      options={(props: RootTabScreenProps<'Chat'>) => ({
        tabBarIcon: () => {
          return <Ionicons name="ios-chatbubbles" size={24} />;
        },
      })}
    />
  </BottomTab.Navigator>
);

const AuthStack = createNativeStackNavigator<RootStackParamList>();
const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AuthStack.Screen name="Start" component={StartScreen} />
    <AuthStack.Screen name="Login" component={LogInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

const MainStack = createNativeStackNavigator<RootStackParamList>();
const MainNavigator = () => {
  // const isSignedIn = useAppSelector(state => !!state.auth.token);

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="StartUp" component={StartUpScreen} />
      <MainStack.Screen name="Auth" component={AuthNavigator} />
      <MainStack.Screen name="Shop" component={BottomTabNavigator} />

      <MainStack.Screen name="Market" component={ShopNavigator} />
      <MainStack.Screen name="Yours" component={ProfileNavigator} />
      <MainStack.Screen name="Add" component={NewListingNavigator} />
      <MainStack.Screen name="Cart" component={OrdersNavigator} />
      <MainStack.Screen name="Chat" component={ChatNavigator} />

      {/* {isSignedIn ? (
        <>
          <MainStack.Screen name="Auth" component={AuthNavigator} />
        </>
      ) : (
        <>
          <MainStack.Screen name="Shop" component={BottomTabNavigator} />
        </>
      )} */}
    </MainStack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
