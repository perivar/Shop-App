import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import { signup } from '../store/actions/auth'
import { login } from '../store/actions/auth'
import Animated from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Input from '../components/Input'

const {width,height} = Dimensions.get('window')

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

const LogInScreen = props => {
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
      let action = login(
         formState.inputValues.email,
         formState.inputValues.password
       );

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
      <LinearGradient
          colors={['#80d0c7', '#13547a']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: height
          }}
        />
      <View style={{flex:1, justifyContent: 'flex-end'}}>
        <View style={styles.arrowWrap}>
          <MaterialIcons onPress={() => {props.navigation.navigate("start")}} name="navigate-before" color="white" size={35}/>
        </View>
        <View style={styles.header}>
          <Text
            style={styles.headerText}>
            Hey, let's sign you in
          </Text>
        </View>

        <Animatable.View
          animation="fadeInUpBig"
          style={styles.buttonWrapper}>
          <ScrollView style={styles.form}>
          <Text style={styles.inputTitle}>Email</Text>
          <View style={styles.inputcontainer}>
            <View style={styles.iconcont}>
              <MaterialIcons name="person-outline" size={30} color="#3c8b80"/>
            </View>
            <Input
              id="email"
              placeholder='Your email'
              containerStyle={styles.input}
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="plase enter valid email"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </View>

          <View style={{height: height / 25}}></View>

          <View style={styles.cont}>
            <View style={styles.titlecont}>
              <Text style={styles.inputTitle}>Password</Text>
            </View>
            <View style={styles.inputcontainer}>
              <View style={styles.iconcont}>
                <MaterialIcons name="lock-outline" size={30} color="#3c8b80"/>
              </View>
                <Input
                  id="password"
                  placeholder='Your password'
                  keyboardType="default"
                  secureTextEntry
                  required
                  minLength={5}
                  autoCapitalize="none"
                  errorText="plase enter valid password"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
            </View>
          </View>
          <View style={styles.buttonContainerTop}>
            {isLoading ? (
              <TouchableOpacity
                onPress={authHandler}
                style={{...styles.button, backgroundColor: '#e56767', flexDirection: 'row', justifyContent: 'center'}}>
                <ActivityIndicator size="small" color="white"/>
              </TouchableOpacity>
            )
            : (
            <TouchableOpacity
              onPress={authHandler}
              style={{...styles.button, backgroundColor: '#e56767', flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Log in</Text>
              <MaterialIcons name="navigate-next" size={26} color="white"/>
            </TouchableOpacity>
            )}
          </View>
          <View style={{height: height / 50}}></View>
          <View style={styles.buttonContainer}>
            <Button
            title='Sign Up'
            color="#e56767"
            onPress={() => {
              props.navigation.navigate("signup")
            }}/>
          </View>
        </ScrollView>
        </Animatable.View>
      </View>
     </KeyboardAvoidingView>

  )
}

LogInScreen.navigationOptions = {
  headerShown: false
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  arrowWrap:{
    top: height / 20,
    flex:1,
  },
  cont:{
    flex:1,
    flexDirection: 'column',
  },
  header:{
    marginBottom: height / 13,
    paddingHorizontal: 15,
  },
  headerText:{
    fontSize: 30,
    color: "white",
    fontWeight: 'bold',
  },
  inputcontainer:{
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c8b80',
    top: 15
  },
  iconcont:{
    flexDirection: 'column',
    paddingRight: 10,
  },
  buttonWrapper:{
    height: height / 1.4,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 1,
    paddingVertical: 35,
    paddingHorizontal: 20
  },
  button:{
    backgroundColor: 'white',
    height: 60,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45
  },
})

export default LogInScreen;
