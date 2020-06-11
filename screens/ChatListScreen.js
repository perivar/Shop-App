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
import { db } from '../config'
import ChatItem from '../components/ChatItem'
import { LinearGradient } from 'expo-linear-gradient'

const {width,height} = Dimensions.get('window')
const headerHeight = Platform.OS == 'ios' ? 120 : 70+StatusBar;
const scrollY = new Animated.Value(0)
const headerY = Animated.interpolate(scrollY, {
  inputRange:[0, headerHeight],
  outputRange:[0,-headerHeight]
})
const height_logo = height * 0.4 * 0.4

var database = firebase.database();

const ChatList = props => {
  const [user, setUser] = useState()
  const [user2, setUser2] = useState()
  const [user2Img, setUser2Img] = useState()
  const [animationState, setAnimationState] = useState("fadeInDown")
  const [user2Id, setUser2Id] = useState()
  const [chats, setChats] = useState([])

  const fetchUserData = async () => {
    try {
        const user = await firebase.auth().currentUser;
        if (user != null) {
          setUser(user.uid);
          await firebase.database().ref("messages" + '/' + user.uid).once("value")
          .then(function(snapshot) {

            for (var key in snapshot.val()) {
              const obj = snapshot.val()[key]
              let name = null
              let img = null
              for (var keys in obj){
                name = obj[keys].name;
                img = obj[keys].img
              }
              setChats(oldArray => [...oldArray, [key, name, img]])
            }
          });
        }

      } catch (error) {
        // Error retrieving data
      }
  }

  const renderProducts = (itemData) => {
    return(
       <ChatItem
        name={itemData.item[1]}
        img={itemData.item[2]}
        uid={itemData.item[0]}
        onSelectChat={() => {
          props.navigation.navigate("Chats", {
            uid: itemData.item[0],
            seller: itemData.item[1],
            img: itemData.item[2],
          });
        }}
        />
    );
  };

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
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: headerHeight / 1.2,
          backgroundColor: '#c6f1e7',
          zIndex: 1000,
          elevation:1000,
          transform: [{ translateY: headerY }],
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
       >

           <LinearGradient
                start={[0.45,-0.5]}
               colors={['#fff5e8', '#cbf2e9']}
               style={{
                 borderBottomLeftRadius: 20,
                 borderBottomRightRadius: 20,
                 height: '100%',
                 width: '100%'
               }}
             />

         <Animatable.Text
           animation={animationState}
           duration={900}
           style={styles.welcomeText}>
           Chats
        </Animatable.Text>
         <View style={styles.header}>
         </View>
       </Animated.View>
       <FlatList
         contentContainerStyle={{ flex:1, marginTop: headerHeight}}
         scrollEventThrottle={16}
         numColumns={1}
         data={chats}
         renderItem={renderProducts}
         keyExtractor={(item, index) => item.id}
       />
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
    fontSize: width / 15,
    fontWeight: 'bold',
    opacity: 1,
    color: '#254053',
    top: 55,
    left: 0,
    position: 'absolute'
  }
})

export default ChatList;
