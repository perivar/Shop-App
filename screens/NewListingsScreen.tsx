import React from 'react';

import NewItem from '../components/NewItem';
import { RootStackScreenProps } from '../navigation/ShopNavigation';

// use the Form prop since we are forwarding the props to NewItem
const NewListingsScreen = (props: RootStackScreenProps<'Form'>) => {
  return <NewItem {...props} />;
};

export default NewListingsScreen;
