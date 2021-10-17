import React from 'react';

import ProductList from '../components/ProductList';
import { RootStackScreenProps } from '../navigation/ShopNavigation';

const HomeScreen = (props: RootStackScreenProps<'Home'>) => {
  return <ProductList navigation={props} />;
};

// HomeScreen.navigationOptions = data => {
//   return {
//     headerTitle: 'Shop App',
//     headerRight: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="settings"
//           iconName="ios-settings"
//           onPress={() => {
//             data.navigation.navigate('Settings');
//           }}
//         />
//       </HeaderButtons>
//     ),
//     headerStyle: {
//       backgroundColor: '#D6A5AB',
//       shadowRadius: 0,
//       shadowOffset: {
//         height: 0,
//       },
//     },
//     headerTitleStyle: {
//       fontWeight: 'bold',
//       fontSize: 30,
//       fontFamily: 'blackjack',
//     },
//     headerShown: false,
//   };
// };

export default HomeScreen;
