import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Order from '../../models/order';
import Product from '../../models/product';
import { RootState } from '../store';

export interface ProductAction {
  productId: string;
  ownerId?: string;
  seller?: string;
  name?: string;
  url?: string;
  description?: string;
  price?: number;
  location?: string;
  profilePic?: string;
}

export interface OrderData {
  id: string;
  items: Product[];
  amount: number;
  date: Date;
}

export interface OrderAction {
  orderData: OrderData;
}

export interface OrdersAction {
  orders: Order[];
}

export interface CartAction {
  cart: Product[];
}

export interface ProductsAction {
  products: Product[];
  counter: CartCounter[];
  cart: Product[];
  sumCart: number;
  userProducts: Product[];
}

export interface CartCounter {
  product: string; // product id
  number: number;
}

export interface ProductState {
  products: Product[];
  cart: Product[];
  counter: CartCounter[];
  sumCart: number;
  orders: Order[];
  userProducts: Product[];
}

const initialState: ProductState = {
  products: [],
  cart: [],
  counter: [],
  sumCart: 0,
  orders: [],
  userProducts: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCartReducer(state, action: PayloadAction<{ productId: string }>) {
      const productToAdd = state.products.find(
        product => product.id === action.payload.productId
      );
      const isInCart = state.cart.some(product => product === productToAdd);

      if (isInCart === true) {
        // const newNum = state.counter.find(
        //   product => product.product === productToAdd.id
        // );
        const objIndex = state.counter.findIndex(
          product => product.product === productToAdd.id
        );

        const updatedCounter = [...state.counter];
        updatedCounter[objIndex].number += 1;
        const price = productToAdd.price;

        state.counter = updatedCounter;
        state.sumCart += price;
      } else {
        const price = productToAdd.price;

        state.cart = state.cart.concat(productToAdd);
        state.counter = state.counter.concat({
          product: productToAdd.id,
          number: 1,
        });
        state.sumCart += price;
      }
    },
    removeFromCartReducer(state, action: PayloadAction<{ productId: string }>) {
      const productToRemove = state.cart.find(
        product => product.id === action.payload.productId
      );
      const objIndex = state.counter.findIndex(
        product => product.product === productToRemove.id
      );
      const price = productToRemove.price;

      if (state.counter[objIndex].number >= 2) {
        // Updating counter
        const updatedCounter = [...state.counter];
        updatedCounter[objIndex].number -= 1;

        state.counter = updatedCounter;
        state.sumCart -= price;
      } else {
        // Updating counter
        const updateCount = [...state.counter];
        updateCount[objIndex].number -= 1;

        // Updating cart
        const updatedCart = [...state.cart];
        const updatedCartIndex = updatedCart.findIndex(
          product => product.id === productToRemove.id
        );
        updatedCart.splice(updatedCartIndex, 1);

        state.cart = updatedCart;
        state.sumCart -= price;
        state.counter = updateCount;
      }
    },
    deleteListingReducer(state, action: PayloadAction<ProductAction>) {
      const copyProducts = [...state.products];
      const copyUser = [...state.userProducts];

      const yourProductToDelete = copyProducts.find(
        product => product.id === action.payload.productId
      );
      const userProdToDelete = copyUser.find(
        product => product.id === action.payload.productId
      );

      const productIndex = copyProducts.findIndex(
        product => product.id === yourProductToDelete.id
      );
      const userIndex = copyUser.findIndex(
        product => product.id === userProdToDelete.id
      );

      copyProducts.splice(productIndex, 1);
      copyUser.splice(userIndex, 1);

      state.products = copyProducts;
      state.userProducts = copyUser;
    },
    editListingReducer(state, action: PayloadAction<ProductAction>) {
      const productToEdit = state.products.find(
        product => product.id === action.payload.productId
      );
      const copyProducts = [...state.products];
      const productIndex = copyProducts.findIndex(
        product => product.id === productToEdit.id
      );

      const updatedProduct = copyProducts[productIndex];
      updatedProduct.name = action.payload.name;
      updatedProduct.description = action.payload.description;
      updatedProduct.location = action.payload.location;
      updatedProduct.price = action.payload.price;
      updatedProduct.url = action.payload.url;

      copyProducts.splice(productIndex, 1, updatedProduct);

      state.products = copyProducts;
    },
    newListingReducer(state, action: PayloadAction<ProductAction>) {
      const newProduct = new Product(
        action.payload.productId,
        action.payload.ownerId,
        action.payload.seller,
        action.payload.name,
        action.payload.url,
        action.payload.description,
        action.payload.price,
        action.payload.location,
        action.payload.profilePic
      );

      state.products = state.products.concat(newProduct);
      state.userProducts = state.userProducts.concat(newProduct);
    },
    setProductsReducer(state, action: PayloadAction<ProductsAction>) {
      state.products = action.payload.products;
      state.counter = action.payload.counter;
      state.cart = action.payload.cart;
      state.sumCart = action.payload.sumCart;
      state.orders = [];
      state.userProducts = action.payload.userProducts;
    },
    setCartReducer(state, action: PayloadAction<CartAction>) {
      state.cart = action.payload.cart;
    },
    setOrdersReducer(state, action: PayloadAction<OrdersAction>) {
      state.orders = action.payload.orders;
    },
    placeOrderReducer(state, action: PayloadAction<OrderAction>) {
      const newOrder = new Order(
        action.payload.orderData.id,
        action.payload.orderData.items,
        action.payload.orderData.amount,
        action.payload.orderData.date
      );

      state.orders = state.orders.concat(newOrder);
      state.cart = [];
      state.sumCart = 0;
      state.counter = [];
    },
  },
});

// Actions generated from the slice
export const {
  addToCartReducer,
  removeFromCartReducer,
  deleteListingReducer,
  editListingReducer,
  newListingReducer,
  setProductsReducer,
  setCartReducer,
  setOrdersReducer,
  placeOrderReducer,
} = productSlice.actions;

// export cart selector to get the slice in any component
export const productsSelector = (state: RootState) => state.allProducts;

// export the reducer
const productReducer = productSlice.reducer;
export default productReducer;
