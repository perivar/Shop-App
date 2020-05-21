import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ShopNavigator from './navigation/ShopNavigation'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import productReducer from './store/reducers/products'
import ReduxThunk from 'redux-thunk'
import authReducer from './store/reducers/auth'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';

const rootReducer = combineReducers({
  allProducts: productReducer,
  auth: authReducer
});

const fetchFonts = () => {
  const fontLoad = Font.loadAsync({
    'blackjack': require('./assets/fonts/blackjack.otf'),
    // 'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
  const imgLoad = Asset.loadAsync([require('./assets/bg.jpg')])
  return fontLoad, imgLoad
};

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [pictureLoaded, setPictureLoaded] = useState(false)

  if (!fontLoaded || !pictureLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
          setPictureLoaded(true)
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
