import React, { useState } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import Animated from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler'

const {width,height} = Dimensions.get('window')
const height_logo = height * 0.6 * 0.4

export default class StartScreen extends React.Component{
  render(){
    return(
      <View style={{flex:1, backgroundColor: 'white', justifyContent: 'flex-end'}}>
          <View style={{position: 'absolute',top: 0,bottom: 0,left: 0,right: 0, }}>
            <Image
              source={require('../assets/bg.jpg')}
              style={styles.bgImg}
            />
          </View>
          <View style={styles.header}>
            <Animatable.Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode={"stretch"}
              animation="bounceIn"
              duration={1500}
            />
          </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={styles.buttonWrapper}>
          <Text style={styles.titleText}>Sell products, save enviorment, earn money</Text>
          {/* <View > */}
            <TouchableOpacity
              onPress={() => {this.props.navigation.navigate("login")}}
              style={{...styles.button, backgroundColor: '#e56767', flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Log in</Text>
              <MaterialIcons name="navigate-next" size={26} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {this.props.navigation.navigate("signup")}}
              style={{...styles.button, borderWidth: 2,backgroundColor: 'rgba(229,	103,	103, 0)', borderColor: '#e56767', flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>Sign up</Text>
              <MaterialIcons name="navigate-next" size={26} color="black"/>
            </TouchableOpacity>
          {/* </View> */}
        </Animatable.View>
      </View>
    )
  }
}

StartScreen.navigationOptions = {
  headerShown: false
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  top:{
    flex:1,
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height / 5
  },
  logo:{
    width: height_logo,
    height: height_logo,
    borderRadius: height_logo / 2,
  },
  buttonWrapper:{
    height: height / 2.5,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 1,
  },
  titleText:{
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3c8b80',
    marginHorizontal: 30,
    marginBottom: 25
  },
  button:{
    backgroundColor: 'white',
    height: 60,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
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
