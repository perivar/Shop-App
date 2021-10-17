import { combineReducers } from '@reduxjs/toolkit';

import auth from './auth';
import products from './products';

const rootReducer = combineReducers({
  allProducts: products,
  auth,
});

export default rootReducer;
