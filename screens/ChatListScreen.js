import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { AsyncStorage } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import { View, Alert, Text, Dimensions, StatusBar, StyleSheet, ActivityIndicator, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'
import Animated, { Easing } from 'react-native-reanimated';
import * as Permissions from 'expo-permissions'
import * as firebase from 'firebase'
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons } from '@expo/vector-icons';

const {width,height} = Dimensions.get('window')
const headerHeight = Platform.OS == 'ios' ? 120 : 70+StatusBar;
const scrollY = new Animated.Value(0)
const headerY = Animated.interpolate(scrollY, {
  inputRange:[0, headerHeight],
  outputRange:[0,-headerHeight]
})
const height_logo = height * 0.4 * 0.4

const ChatList = props => {
  const [user, setUser] = useState()
  const [animationState, setAnimationState] = useState("fadeInDown")

  const fetchUserData = async () => {
    try {
        const user = await firebase.auth().currentUser;
        if (user != null) {
          // console.log(user);
          setUser(user);
        }

      } catch (error) {
        // Error retrieving data
      }
  }

  const handlePress = () => {
    props.navigation.navigate("Chats", {
      name: "Ida Emilie"
    })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return(
    <View style={{flex:1, backgroundColor: '#F5E9EA',}}>
      <Animated.View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          left: 0,
          right: 0,
          top: 0,
          borderBottomLeftRadius: 100,
          borderBottomRightRadius: 100,
          height: headerHeight,
          backgroundColor: '#c6f1e7',
          zIndex: 1000,
          elevation:1000,
          transform: [{ translateY: headerY }],
          alignItems: 'center',
          justifyContent: 'center',
        }}
       >
         <Animatable.Text
           animation={animationState}
           duration={900}
           style={styles.welcomeText}>
           Chats
        </Animatable.Text>
         <View style={styles.header}>
         </View>
       </Animated.View>
      <View style={{flex:1, top: headerHeight + 30}}>
        <TouchableOpacity
          onPress={handlePress}
          style={{height: height / 12, backgroundColor: '#fbf7f7', borderRadius: 100, marginHorizontal: 20, flexDirection: 'row'}}>
          <View style={{justifyContent: 'center'}}>
            <Image
              style={{width: 70, height: height / 12, borderRadius: 100}}
              source={{uri: 'https://firebasestorage.googleapis.com/v0/b/rental-app-743c0.appspot.com/o/profilePictures%2F799482BE-12C0-4AAF-B26F-CD28DD5F0BDC?alt=media&token=b3e207eb-847f-46f5-93c8-aac8d0246281'}} />
          </View>
          <View style={{justifyContent: 'center', paddingLeft: 30}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Ida Emilie</Text>
          </View>
          <View style={{justifyContent: 'center', marginLeft: 100}}>
            <MaterialIcons name="navigate-next" size={26} color="black"/>
          </View>
        </TouchableOpacity>
      </View>
      <Text>
      </Text>
    </View>
  )
}

ChatList.navigationOptions = (data) => {
  return{
    headerShown: false
  }
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#F5E9EA',
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: headerHeight + height_logo / 3,
    shadowColor: "#8aa8a1",
    shadowRadius: 5,
    shadowOffset: {height:5},
    shadowOpacity: 0.2,
    paddingTop: 30
  },
  logo:{
    top:height / 6,
    width: height_logo,
    height: height_logo,
    borderRadius: height_logo / 2,
  },
  welcomeText:{
    flex:1,
    textAlign: 'center',
    width: '100%',
    fontSize: width / 20,
    fontWeight: 'bold',
    opacity: 1,
    color: '#254053',
    top: 55,
    left: 0,
    position: 'absolute'
  }
})

export default ChatList;
