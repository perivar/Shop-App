import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ShopNavigator from './navigation/ShopNavigation'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import productReducer from './store/reducers/products'
import ReduxThunk from 'redux-thunk'
import authReducer from './store/reducers/auth'

const rootReducer = combineReducers({
  allProducts: productReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (<Provider store={store}><ShopNavigator /></Provider>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
