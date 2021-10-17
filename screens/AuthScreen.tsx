import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import { signup } from '../store/actions/auth'
import { login } from '../store/actions/auth'
import Animated from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler'

import Input from '../components/Input'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isSignup, setIsSignup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
   inputValues: {
    email: '',
    password: ''
   },
   inputValidities: {
     email: false,
     password: false
   },
   formIsValid: false
 });

 useEffect(() => {
   if(error){
     Alert.alert('An error occured', error, [{text: 'Okay'}])
   }
 }, [error])

 const authHandler = async () => {
     let action;
     if (isSignup) {
       action = signup(
         formState.inputValues.email,
         formState.inputValues.password
       );
     } else {
       action = login(
         formState.inputValues.email,
         formState.inputValues.password
       );
     }
     setError(null)
     setIsLoading(true)
     try{
      await dispatch(action);
      props.navigation.navigate('Shop')
    } catch (err){
      setError(err.message)
      setIsLoading(false)
    }
   };

   const inputChangeHandler = useCallback(
     (inputIdentifier, inputValue, inputValidity) => {
       dispatchFormState({
         type: FORM_INPUT_UPDATE,
         value: inputValue,
         isValid: inputValidity,
         input: inputIdentifier
       });
     },
     [dispatchFormState]
   );

  return(
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-200}
      style={styles.screen}>
         <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
           <View style={styles.authContainer}>
              <ScrollView>
              <Input
                id="email"
                label="E-Mail"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="plase enter valid email"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="plase enter valid password"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <View style={styles.buttonContainerTop}>
                {isLoading ? (
                <ActivityIndicator size="small"/>)
                : (
                <Button
                title={isSignup ? 'Sign Up' : 'Login'}
                color="#FF1654"
                onPress={authHandler}/>)}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color="#FF1654"
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}/>
              </View>
            </ScrollView>
          </View>
         </LinearGradient>
     </KeyboardAvoidingView>

  )
}

AuthScreen.navigationOptions = {
  headerShown: false
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  // buttonWrapper:{
  //   height: height / 3,
  //   justifyContent: 'center',
  //   backgroundColor: 'white',
  //   borderTopLeftRadius: 30,
  //   borderTopRightRadius: 30,
  //   opacity: 1
  // },
  button:{
    backgroundColor: 'white',
    height: 60,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  },
  bgImg:{
    flex:1,
    height: null,
    width: null
  },
  buttonContainerTop:{
    marginTop: 30
  },
  buttonContainer:{
    marginTop: 15
  },
  gradient:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer:{
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  }
})

export default AuthScreen;
