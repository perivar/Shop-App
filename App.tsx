import './config.ts';

import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';

import ShopNavigator from './navigation/ShopNavigation';
import store from './redux/store';

LogBox.ignoreAllLogs();

// const fetchFonts = () => {
//   const fontLoad = Font.loadAsync({
//     blackjack: require('./assets/fonts/blackjack.otf'),
//     // 'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
//   });
//   const imgLoad = Asset.loadAsync([require('./assets/bg.jpg')]);
//   return fontLoad, imgLoad;
// };

export default function App() {
  // const [fontLoaded, setFontLoaded] = useState(false);
  // const [pictureLoaded, setPictureLoaded] = useState(false);

  //  if (!fontLoaded || !pictureLoaded) {
  //    return (
  //      <AppLoading
  //        startAsync={fetchFonts}
  //        onFinish={() => {
  //          setFontLoaded(true);
  //          setPictureLoaded(true)
  //        }}
  //      />
  //    );
  //  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
