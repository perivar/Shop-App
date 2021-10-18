import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import Order from '../../models/order';
import Product from '../../models/product';
import {
  addToCartReducer,
  deleteListingReducer,
  editListingReducer,
  newListingReducer,
  placeOrderReducer,
  removeFromCartReducer,
  setOrdersReducer,
  setProductsReducer,
} from '../slices/products';
import { RootState } from '../store';

// action methods
export const fetchOrders = () => {
  return async (
    dispatch: ThunkDispatch<RootState, never, AnyAction>,
    getState: () => RootState
  ) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://rental-app-743c0.firebaseio.com/orders/${userId}.json`
      );
      if (!response.ok) {
        console.log('fetching orders failed', response);
        throw new Error('Something went wrong');
      }

      const resData = await response.json();
      const loadedOrders: Order[] = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch(setOrdersReducer({ orders: loadedOrders }));
    } catch (err) {
      throw err;
    }
  };
};

export const fetchProducts = () => {
  return async (
    dispatch: ThunkDispatch<RootState, never, AnyAction>,
    getState: () => RootState
  ) => {
    const updatedCart = getState().allProducts.cart.map(prod => prod);
    const updatedCounter = getState().allProducts.counter.map(prod => prod);
    const updatedSumCart = getState().allProducts.sumCart;

    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://rental-app-743c0.firebaseio.com/products.json'
      );

      if (!response.ok) {
        console.log('fetching products failed', response);
        throw new Error('Something went wrong');
      }

      const resData = await response.json();
      const loadedProducts: Product[] = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].seller,
            resData[key].name,
            resData[key].imgUrl,
            resData[key].description,
            Number(resData[key].price),
            resData[key].location,
            resData[key].profilePic
          )
        );
      }
      dispatch(
        setProductsReducer({
          products: loadedProducts,
          userProducts: loadedProducts.filter(prod => prod.userId === userId),
          cart: updatedCart,
          counter: updatedCounter,
          sumCart: updatedSumCart,
        })
      );
    } catch (err) {
      throw err;
    }
  };
};

export const fetchCart = () => {
  return async (
    dispatch: ThunkDispatch<RootState, never, AnyAction>,
    getState: () => RootState
  ) => {
    // do nothing
  };
};

export const placeOrder = (cartItems: Product[], totalAmount: number) => {
  return async (
    dispatch: ThunkDispatch<RootState, never, AnyAction>,
    getState: () => RootState
  ) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://rental-app-743c0.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      console.log('place order failed', response);
      throw new Error('Something went wrong');
    }

    const resData = await response.json();

    dispatch(
      placeOrderReducer({
        orderData: {
          id: resData.name,
          items: cartItems,
          amount: totalAmount,
          date: date,
        },
      })
    );
  };
};

export const addToCart = (productId: string) => {
  return async (
    dispatch: ThunkDispatch<RootState, never, AnyAction>,
    getState: () => RootState
  ) => {
    dispatch(addToCartReducer({ productId: productId }));
  };
};

export const removeFromCart = (productId: string) => {
  return async (
    dispatch: ThunkDispatch<RootState, never, AnyAction>,
    getState: () => RootState
  ) => {
    dispatch(removeFromCartReducer({ productId: productId }));
  };
};

export const addListing = (
  name: string,
  description: string,
  price: number,
  imgUrl: string,
  location: string,
  seller: string,
  profilePic: string
) => {
  return async (
    dispatch: ThunkDispatch<RootState, never, AnyAction>,
    getState: () => RootState
  ) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const body = JSON.stringify({
      description,
      imgUrl,
      name,
      ownerId: userId,
      price,
      location,
      seller,
      profilePic,
    });

    const response = await fetch(
      `https://rental-app-743c0.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }
    );

    const resData = await response.json();

    dispatch(
      newListingReducer({
        productId: resData.name,
        name: name,
        description: description,
        price: price,
        url: imgUrl,
        ownerId: userId,
        location: location,
        seller: seller,
        profilePic: profilePic,
      })
    );
  };
};

export const removeListing = (productId: string) => {
  return async (
    dispatch: ThunkDispatch<RootState, never, AnyAction>,
    getState: () => RootState
  ) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rental-app-743c0.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      console.log('remove listing failed', response);
      throw new Error('Something went wrong');
    }

    dispatch(deleteListingReducer({ productId: productId }));
  };
};

export const editListing = (
  productId: string,
  name: string,
  description: string,
  location: string,
  price: number,
  imgUrl: string
) => {
  return async (
    dispatch: ThunkDispatch<RootState, never, AnyAction>,
    getState: () => RootState
  ) => {
    const token = getState().auth.token;

    const body = JSON.stringify({
      name,
      description,
      imgUrl,
      location,
      price,
    });

    const response = await fetch(
      `https://rental-app-743c0.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }
    );

    if (!response.ok) {
      console.log('edit listing failed', response);
      throw new Error('Something went wrong');
    }

    dispatch(
      editListingReducer({
        productId: productId,
        name: name,
        description: description,
        location: location,
        price: price,
        url: imgUrl,
      })
    );
  };
};
