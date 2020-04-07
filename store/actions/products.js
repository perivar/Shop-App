export const ADD_CART = "ADD_CART";
export const DELETE_CART = "DELETE_CART"
export const NEW_LISTING = "NEW_LISTING"
export const DEL_LISTING = "DEL_LISTING"
export const EDIT_LISTING = "EDIT_LISTING"

export const addToCart = (productId) => {
  return { type: ADD_CART, productId: productId }
}

export const removeFromCart = (productId) => {
  return { type: DELETE_CART, productId: productId}
}

export const addListing = (productId, name, description) => {
  return { type: NEW_LISTING, productId: productId, name: name, description: description }
}

export const removeListing = (productId) => {
  return { type: DEL_LISTING, productId: productId}
}

export const editListing = (productId, nameHolder, descriptionHolder) => {
  return { type: EDIT_LISTING, productId: productId, name: nameHolder, description: descriptionHolder}
}
