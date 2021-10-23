import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import firebase from '../../firebase';
import { AppDispatch, RootState } from '../store';

export interface AuthState {
  token: string;
  userId: string;
}

const initialState: AuthState = {
  token: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateReducer: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logoutReducer: () => {
      return initialState;
    },
  },
});

// Actions generated from the slice
export const { authenticateReducer, logoutReducer } = authSlice.actions;

// export user selector to get the slice in any component
export const authSelector = (state: RootState) => state.auth;

// export the reducer
const userReducer = authSlice.reducer;
export default userReducer;

// methods
export const authenticate = (
  userId: string,
  token: string,
  expirationTime?: number
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authenticateReducer({ userId: userId, token: token }));
  };
};

export const signup = (
  email: string,
  password: string,
  name?: string,
  picture?: string
) => {
  return async (dispatch: AppDispatch) => {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const user = await firebase.auth().currentUser;

    const idToken = await user.getIdToken();

    const updateUser = await user.updateProfile({
      displayName: name,
      photoURL: picture,
    });

    dispatch(authenticate(user.uid, idToken));
    saveDataToStorage(idToken, user.uid, user.displayName);
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const user = await firebase.auth().currentUser;
    const idToken = await user.getIdToken();

    dispatch(authenticate(user.uid, idToken));
    saveDataToStorage(idToken, user.uid, user.displayName);
  };
};

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    AsyncStorage.removeItem('userData');
    return dispatch(logoutReducer());
  };
};

//Storing data on the harddrive to be able to have auto login
const saveDataToStorage = (
  token: string,
  userId: string,
  displayName: string
) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      displayName: displayName,
    })
  );
};
