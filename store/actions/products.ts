import Product from '../../models/product'
import Order from '../../models/order'

export const ADD_CART = "ADD_CART";
export const DELETE_CART = "DELETE_CART"
export const NEW_LISTING = "NEW_LISTING"
export const DEL_LISTING = "DEL_LISTING"
export const EDIT_LISTING = "EDIT_LISTING"
export const SET_PRODUCTS = "SET_PRODUCTS"
export const PLACE_ORDER = "PLACE_ORDER"
export const SET_ORDERS = "SET_ORDERS"
export const SET_CART = "SET_CART"

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId
    try {
      const response = await fetch(`https://rental-app-743c0.firebaseio.com/orders/${userId}.json`);
    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const resData = await response.json();
    const loadedOrders = [];

    for (const key in resData) {
      loadedOrders.push(new Order(
        key, resData[key].cartItems, resData[key].totalAmount, new Date(resData[key].date)
      )
    )
    }
    // console.log(loadedOrders);
    dispatch({ type: SET_ORDERS, orders: loadedOrders })
    } catch (err) {
      throw err;
    }
  }
}

export const fetchMessages = (user2, user, userImg) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`https://rental-app-743c0.firebaseio.com/chats/${user}/${user2}.json`);
    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const resData = await response.json();

    const loadedMessages = [];
    // console.log(text);

    for (const key in resData) {
      const text = resData[key].text
      console.log(text);
      console.log(key);
    }
    for (let value of Object.values(resData)) {
      // console.log(value);
      const text = value.text
      // const timestamp = Object.keys(resData)[0];
      // console.log(timestamp);
    //   loadedOrders.push(new Order(
    //     key, resData[key].cartItems, resData[key].totalAmount, new Date(resData[key].date)
    //   )
    // )
    }
    }catch (err) {
          throw err;
      }
  }
}

export const fetchProducts = () => {
    return async (dispatch, getState) => {
      const updatedCart = getState().allProducts["cart"].map(prod => prod);
      const updatedCounter = getState().allProducts["counter"].map(prod => prod);
      const updatedSumCart = getState().allProducts["sumCart"];

      const userId = getState().auth.userId
      try {
        const response = await fetch('https://rental-app-743c0.firebaseio.com/products.json');

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await response.json();
      const loadedProducts = [];


      for (const key in resData) {
        loadedProducts.push(new Product(key, resData[key].ownerId, resData[key].seller, resData[key].name, resData[key].imgUrl, resData[key].description, resData[key].price, resData[key].location, resData[key].profilePic))
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts, userProducts: loadedProducts.filter(prod => prod.userId === userId), cart: updatedCart, counter: updatedCounter, sumCart: updatedSumCart})
    } catch (err) {
      throw err;
    }
  }
}

export const fetchCart = (cartstate) => {
  return async (dispatch, getState) => {
    const cart = getState()
    console.log(cart);
  }
}

export const addToCart = (productId) => {
  return { type: ADD_CART, productId: productId }
}

export const placeOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const userId = getState().auth.userId
    const date = new Date();
    const response = await fetch(`https://rental-app-743c0.firebaseio.com/orders/${userId}.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const resData = await response.json();

    dispatch({ type: PLACE_ORDER, orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date
      }})
  }
}

export const removeFromCart = (productId) => {
  return { type: DELETE_CART, productId: productId}
}

export const addListing = (name, description, price, imgUrl, location, seller, profilePic) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const userId = getState().auth.userId
    const response = await fetch(`https://rental-app-743c0.firebaseio.com/products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description,
        imgUrl,
        name,
        ownerId: userId,
        price,
        location,
        seller,
        profilePic
      })
    });

    const resData = await response.json();

    dispatch({ type: NEW_LISTING, productId: resData.name, name: name, description: description, price: price, url: imgUrl, ownerId: userId, location: location, seller: seller, profilePic: profilePic})
  }
}

export const removeListing = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const response = await fetch(`https://rental-app-743c0.firebaseio.com/products/${productId}.json?auth=${token}`, {
      method: 'DELETE',
    });

    if(!response.ok){
      throw new Error("Something went wrong")
    }

    dispatch({ type: DEL_LISTING, productId: productId })
  }
}

export const editListing = (productId, name, description, location, price, imgUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const response = await fetch(`https://rental-app-743c0.firebaseio.com/products/${productId}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        imgUrl,
        location,
        price
      })
    });

    if(!response.ok) {
      throw new Error("Something went wrong")
    }

    dispatch({ type: EDIT_LISTING, productId: productId, name: name, description: description, location: location, price: price, url: imgUrl})
  }
}
