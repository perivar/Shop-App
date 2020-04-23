import Product from '../../models/product'

export const ADD_CART = "ADD_CART";
export const DELETE_CART = "DELETE_CART"
export const NEW_LISTING = "NEW_LISTING"
export const DEL_LISTING = "DEL_LISTING"
export const EDIT_LISTING = "EDIT_LISTING"
export const SET_PRODUCTS = "SET_PRODUCTS"
export const PLACE_ORDER = "PLACE_ORDER"

export const fetchProducts = () => {
    return async dispatch => {
      try {
        const response = await fetch('https://rental-app-743c0.firebaseio.com/products.json');

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(new Product(key, 'u1', 'Alfred Johnsen', resData[key].name, resData[key].imgUrl, resData[key].description, resData[key].price))
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts })
    } catch (err) {
      throw err;
    }
  }
}

export const addToCart = (productId) => {
  return { type: ADD_CART, productId: productId }
}

export const placeOrder = (cartItems, totalAmount) => {
  console.log(cartItems);
  return async dispatch => {
    const date = new Date();
    const response = await fetch('https://rental-app-743c0.firebaseio.com/orders/u1.json', {
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

    dispatch({ type: PLACE_ORDER, id: resData.name, date: date})
  }
}

export const removeFromCart = (productId) => {
  return { type: DELETE_CART, productId: productId}
}

export const addListing = (name, description, price, imgUrl) => {
  return async dispatch => {
    const response = await fetch('https://rental-app-743c0.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        price,
        imgUrl
      })
    });

    const resData = await response.json();

    dispatch({ type: NEW_LISTING, productId: resData.name, name: name, description: description, price: price, url: imgUrl})
  }
}

export const removeListing = (productId) => {
  return async dispatch => {
    const response = await fetch(`https://rental-app-743c0.firebaseio.com/products/${productId}.json`, {
      method: 'DELETE',
    });

    if(!response.ok){
      throw new Error("Something went wrong")
    }

    dispatch({ type: DEL_LISTING, productId: productId})
  }
}

export const editListing = (productId, name, description) => {
  return async dispatch => {
    const response = await fetch(`https://rental-app-743c0.firebaseio.com/products/${productId}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
      })
    });

    if(!response.ok) {
      throw new Error("Something went wrong")
    }

    dispatch({ type: EDIT_LISTING, productId: productId, name: name, description: description})
  }
}
