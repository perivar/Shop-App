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
import store, { AppDispatch } from '../store';

// methods
export const fetchOrders = () => {
  return async (dispatch: AppDispatch) => {
    const userId = store.getState().auth.userId;
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

// export const fetchMessages = (user2: string, user: string, userImg: string) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       const response = await fetch(
//         `https://rental-app-743c0.firebaseio.com/chats/${user}/${user2}.json`
//       );
//       if (!response.ok) {
//         console.log('fetching messages failed', response);
//         throw new Error('Something went wrong');
//       }

//       const resData = await response.json();

//       const loadedMessages = [];
//       // console.log(text);

//       for (const key in resData) {
//         const text = resData[key].text;
//         console.log(text);
//         console.log(key);
//       }
//       for (let value of Object.values(resData)) {
//         // console.log(value);
//         const text = value.text;
//         // const timestamp = Object.keys(resData)[0];
//         // console.log(timestamp);
//         //   loadedOrders.push(new Order(
//         //     key, resData[key].cartItems, resData[key].totalAmount, new Date(resData[key].date)
//         //   )
//         // )
//       }
//     } catch (err) {
//       throw err;
//     }
//   };
// };

export const fetchProducts = () => {
  return async (dispatch: AppDispatch) => {
    const updatedCart = store.getState().allProducts.cart.map(prod => prod);
    const updatedCounter = store
      .getState()
      .allProducts.counter.map(prod => prod);
    const updatedSumCart = store.getState().allProducts.sumCart;

    const userId = store.getState().auth.userId;
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
  return async (dispatch: AppDispatch) => {
    // do nothing
  };
};

export const placeOrder = (cartItems: Product[], totalAmount: number) => {
  return async (dispatch: AppDispatch) => {
    const token = store.getState().auth.token;
    const userId = store.getState().auth.userId;
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
  return async (dispatch: AppDispatch) => {
    dispatch(addToCartReducer({ productId: productId }));
  };
};

export const removeFromCart = (productId: string) => {
  return async (dispatch: AppDispatch) => {
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
  return async (dispatch: AppDispatch) => {
    const token = store.getState().auth.token;
    const userId = store.getState().auth.userId;

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
  return async (dispatch: AppDispatch) => {
    const token = store.getState().auth.token;
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
  return async (dispatch: AppDispatch) => {
    const token = store.getState().auth.token;

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
