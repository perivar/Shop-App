import { AsyncStorage } from 'react-native'
import firebase from 'firebase';

let config = {
  apiKey: "AIzaSyCngPfFt7-u-cmGhsj86-rB-OP9inA411k",
  authDomain: "rental-app-743c0.firebaseapp.com",
  databaseURL: "https://rental-app-743c0.firebaseio.com",
  projectId: "rental-app-743c0",
  storageBucket: "rental-app-743c0.appspot.com",
  messagingSenderId: "180411019322",
  appId: "1:180411019322:web:2771c8901e15b9717ac503",
  measurementId: "G-R4WDX7DJPS"
};

export const LOGOUT = "LOGOUT"
export const AUTHENTICATE = "AUTHENTICATE"

export const authenticate = (userId, token) => {
  return dispatch => {
    // dispatch(setLogoutTimer(expiryTime))
    dispatch({ type: AUTHENTICATE, userId: userId, token: token })
  }
}

export const signup = (email, password, name, picture) => {
  return async dispatch => {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
    const user = await firebase.auth().currentUser;

    const idToken = await user.getIdToken()

    const updateUser = await user.updateProfile({
      displayName: name,
      photoURL: picture
    })
    
    // const response = await fetch(
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCngPfFt7-u-cmGhsj86-rB-OP9inA411k'
    // , {
    //   method: 'POST',
    //   headers:{
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //     returnSecureToken: true
    //   })
    // })

    // if(!response.ok){
    //   const errorResData = await response.json()
    //   const errorId = errorResData.error.message
    //   let message = 'Something went wrong'
    //   if(errorId === 'EMAIL_EXISTS'){
    //     message = 'This email already exists'
    //   }
    //   throw new Error(message)
    // }
    // const resData = await response.json()

    // const updateUser = await fetch(
    //   'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCngPfFt7-u-cmGhsj86-rB-OP9inA411k',
    //   {
    //     method: 'POST',
    //     headers:{
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       idToken: resData.idToken,
    //       displayName: name,
    //       // photoUrl: picture
    //       returnSecureToken: true
    //     })
    //   }
    // )
    // if(!updateUser.ok){
    //   const errorRes = await updateUser.json()
    //   const errorIds = errorRes.error.message
    //   let errorMessage = 'Something went wrong'
    //   if(errorIds === 'INVALID_ID_TOKEN'){
    //     errorMessage = 'Did you type the same password?'
    //   }
    //   throw new Error(errorMessage)
    // }
    // const updateData = await updateUser.json()
    dispatch(authenticate(user.uid, idToken))
    saveDataToStorage(idToken, user.uid, user.displayName)
  }
}

export const login = (email, password) => {
  return async dispatch => {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)

    const user = await firebase.auth().currentUser;
    const idToken = await user.getIdToken()

    // const response = await fetch(
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCngPfFt7-u-cmGhsj86-rB-OP9inA411k'
    // , {
    //   method: 'POST',
    //   headers:{
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //     returnSecureToken: true
    //   })
    // })
    // if(!response){
    //   const errorResData = await response.json()
    //   const errorId = errorResData.error.message
    //   let message = 'Something went wrong'
    //   if(errorId === 'EMAIL_NOT_FOUND'){
    //     message = 'This email is not valid'
    //   } else if(errorId === 'INVALID_PASSWORD'){
    //     message = 'Password is incorrect'
    //   }
    //   throw new Error(message)
    // }

    // const resData = await response.json()

    dispatch(authenticate(user.uid, idToken))
    saveDataToStorage(idToken, user.uid, user.displayName)
  }
}

export const logout = () => {
  // clearLogoutTimer()
  AsyncStorage.removeItem('userData')
  return { type: LOGOUT }
}

// const clearLogoutTimer = () => {
//   if(timer){
//     clearTimeout(timer)
//   }
// }

// const setLogoutTimer = expirationTime => {
//   return dispatch => {
//     timer = setTimeout(() => {
//       dispatch(logout())
//     }, expirationTime / 1000)
//   }
// }

//Storing data on the harddrive to be able to have auto login
const saveDataToStorage = (token, userId, displayName) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    displayName: displayName
  }))
}
