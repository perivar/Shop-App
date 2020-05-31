import { PRODUCTS } from '../../data/dummy-data';
import { ADD_CART } from '../actions/products'
import { DELETE_CART } from '../actions/products'
import { DEL_LISTING } from '../actions/products'
import { NEW_LISTING } from '../actions/products'
import { EDIT_LISTING } from '../actions/products'
import { SET_PRODUCTS } from '../actions/products'
import { SET_ORDERS } from '../actions/products'
import { PLACE_ORDER } from '../actions/products'
import { SET_CART } from '../actions/products'
import Product from '../../models/product'
import Order from '../../models/order';

const initialState = {
  products: [],
  cart: [],
  counter: [],
  sumCart: 0,
  orders: [],
  userProducts: []
}

const productReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_CART:
      const productToAdd = state.products.find(product => product.id === action.productId);
      const isInCart = state.cart.some(product => product === productToAdd);

      if(isInCart === true){
        const newNum = state.counter.find(product => product.product === productToAdd.id)
        const objIndex = state.counter.findIndex(product => product.product === productToAdd.id)

        const updatedCounter = [...state.counter]
        updatedCounter[objIndex].number += 1
        const price = productToAdd.price;

        return {...state, counter: updatedCounter, sumCart: state.sumCart += price}
      }
      else{
        const price = productToAdd.price;
        return { ...state, cart: state.cart.concat(productToAdd), counter: state.counter.concat({product: productToAdd.id, number: 1}), sumCart: state.sumCart += price}
      }

    case DELETE_CART:
      const productToRemove = state.cart.find(product => product.id === action.productId);
      const objIndex = state.counter.findIndex(product => product.product === productToRemove.id);
      const price = productToRemove.price

      if(state.counter[objIndex].number >= 2){
        //Updating counter
        const updatedCounter = [...state.counter]
        updatedCounter[objIndex].number -= 1

        return { ...state, counter: updatedCounter, sumCart: state.sumCart -= price}
      }
      else{
        //Updating counter
        const updateCount = [...state.counter]
        updateCount[objIndex].number -= 1
        //Updating cart
        const updatedCounter = [...state.cart]
        const updatedcounterIndex = updatedCounter.findIndex(product => product.id === productToRemove.id)
        updatedCounter.splice(updatedcounterIndex, 1)

        return { ...state, cart: updatedCounter, sumCart: state.sumCart -= price, counter: updateCount}
      }

    case DEL_LISTING:
      const copyProducts = [...state.products]
      const copyUser = [...state.userProducts]

      const yourProductToDelete = copyProducts.find(product => product.id === action.productId)
      const userProdToDelete = copyUser.find(product => product.id === action.productId)

      const index = copyProducts.findIndex(product => product.id === yourProductToDelete.id)
      const prod = copyUser.findIndex(product => product.id === userProdToDelete.id)

      copyProducts.splice(index, 1)
      copyUser.splice(prod, 1)

      return {...state, products: copyProducts, userProducts: copyUser}

    case EDIT_LISTING:
      const productToEdit = state.products.find(product => product.id === action.productId)
      const copyState = [...state.products]
      const productIndex = copyState.findIndex(product => product.id === productToEdit.id)

      const updatedProduct = copyState[productIndex]
      console.log(updatedProduct);
      updatedProduct.name = action.name
      updatedProduct.description = action.description
      updatedProduct.location = action.location
      updatedProduct.price = action.price
      updatedProduct.url = action.url

      copyState.splice(productIndex, 1, updatedProduct);

      return { ...state, products: copyState }

    case NEW_LISTING:
      const currState = [...state.products]

      const newProduct = new Product(
      action.productId,
      action.ownerId,
      action.seller,
      action.name,
      action.url,
      action.description,
      action.price,
      action.location,
      action.profilePic)

      currState.push(newProduct)

      return { ...state, products: state.products.concat(newProduct), userProducts: state.userProducts.concat(newProduct)}

    case SET_PRODUCTS:
      return {
      products: action.products,
      counter: action.counter,
      cart: action.cart,
      sumCart: action.sumCart,
      orders: [],
      userProducts: action.userProducts
    }
    case SET_CART:
      return {...state, cart: action.cart}

    case SET_ORDERS:
      return { ...state, orders: action.orders }

    case PLACE_ORDER:
      const newOrder = new Order(
              action.orderData.id,
              action.orderData.items,
              action.orderData.amount,
              action.orderData.date
            );
            return {
              ...state,
              orders: state.orders.concat(newOrder),
              cart: [],
              sumCart: 0,
              counter: []
            };
            // const productsToOrder = [...state.cart]
            // const orders = [...state.orders]
            // const updatedOrder = orders.concat(productsToOrder)
            // return { ...state, orders: updatedOrder, cart: [], sumCart: 0, counter: [] }

  }
  return state;
}

export default productReducer;
