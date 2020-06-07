import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { AsyncStorage } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import { View, Animated, Alert, Platform, Keyboard, Dimensions, TextInput, KeyboardAvoidingView, Text, StyleSheet, ActivityIndicator, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'
import * as Permissions from 'expo-permissions'
import * as firebase from 'firebase'
import * as Progress from 'react-native-progress';
import { fetchMessages } from '../store/actions/products'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { db } from '../config'

var database = firebase.database();

const {width,height} = Dimensions.get('window')

const isIOS = Platform.OS === 'ios'

const ChatScreen= props => {

  const dispatch = useDispatch()

  const [user, setUser] = useState()
  const [userName, setUserName] = useState()
  const [userPic, setUserPic] = useState()
  const [userMessageTo, setUserMessageTo] = useState()
  const [sellerName, setSellerName] = useState()
  const [sellerPic, setSellerPic] = useState()

  const [messages, setMessages] = useState([])
  const [messageText, setMessage] = useState()
  const [messageList, setMessageList] = useState([])

  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const bottomPadding = useRef(new Animated.Value(60)).current;
  const listRef = useRef(null);

  const sendMessage = async () => {
    if( messageText.length > 0 ){
      let msgId = firebase.database().ref("messages").child(user).child(userMessageTo).push().key
      let updates = {}

      let message ={
        name: sellerName,
        img: sellerPic,
        message: messageText,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: user
      }
      let message2 ={
        name: userName,
        img: userPic,
        message: messageText,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: user
      }

      updates['messages/'+user+'/'+userMessageTo+'/'+msgId] = message;
      updates['messages/'+userMessageTo+'/'+user+'/'+msgId] = message2;

      firebase.database().ref().update(updates)

      setMessage("")
    }
  }

  const convertTime = (time) => {
    let d = new Date(time)
    let c = new Date()
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':'
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
    if(c.getDay() !== d.getDay()) {
      result = d.getDay() + '.' + d.getMonth() + ' - ' + result
    }
    return result
  }

  const fetchUserData = async () => {
    try {
        const user = await firebase.auth().currentUser;
        const userImg = user.photoURL
        const user2 = await props.navigation.getParam("uid");
        const img = await props.navigation.getParam("img");
        const seller = await props.navigation.getParam("seller");

        if (user != null) {
          setUser(user.uid);
          setUserPic(userImg)
          setUserName(user.displayName)
          setUserMessageTo(user2)
          setSellerName(seller)
          setSellerPic(img)

          await firebase.database().ref("messages").child(user.uid).child(user2)
            .on('child_added', (value) => {
              setMessageList(prevState => {
                return [...prevState, value.val()]
              });
            })
        }

      } catch (error) {
        // Error retrieving data
      }
  }

  const renderRow = (itemData) => {
    return(
      <Animatable.View
        animation="fadeInRight"
        duration={600}
        delay={300}
        style={{
        flexDirection: 'column',
        maxWidth: '70%',
        minWidth: '20%',
        padding: 2,
        alignSelf: itemData.item.from===user ? 'flex-end' : 'flex-start',
        backgroundColor: '#44bda1',
        borderRadius: 5,
        margin: 10}}>
        <Text style={{color:"#fff", padding: 7, fontSize: 16}}>
          {itemData.item.message}
        </Text>
        <Text style={{color:"#eee", opacity: 0.7, padding:3, fontSize: 12}}>
          {convertTime(itemData.item.time)}
        </Text>
      </Animatable.View>
    )
  }

  const keyboardEvent = (event, isShow) => {
    let heightOS = isIOS ? 0 : 80
    let bottomOS = isIOS ? 90 : 140
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: isShow ? heightOS : 0
      }),
      Animated.timing(bottomPadding, {
        duration: event.duration,
        toValue: isShow ? bottomOS : 60
      })
    ]).start()
  }

  useEffect(() => {
    fetchUserData()
    Keyboard.addListener(isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
    (e) => keyboardEvent(e,true))
    Keyboard.addListener(isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
    (e) => keyboardEvent(e,false))
    return () => {
        Keyboard.removeListener("keyboardDidShow");
        Keyboard.removeListener("keyboardDidHide");
      };
  }, [])


  return(
    <KeyboardAvoidingView behavior="height" style={{flex:1}}>
      <TouchableOpacity onPress={() => {
        props.navigation.navigate("List")
      }} style={styles.backButton}>
        <Ionicons size={26} name="ios-arrow-back" color="white"/>
      </TouchableOpacity>
      <Animated.View
        style={[styles.bottomBar, {bottom: keyboardHeight}]}>
        <TextInput
        keyboardType ="default"
        style={styles.input}
        value={messageText}
        onSubmitEditing={Keyboard.dismiss}
        placeHolder="Type message.."
        onChangeText={text => setMessage(text)}
        />
        <TouchableOpacity style={styles.buttonWrap} onPress={sendMessage}>
          <View style={styles.buttonWrapper}>
            <MaterialIcons size={20} name="send" color="white"/>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <FlatList
        ref={listRef}
        onContentSizeChange={() => listRef.current.scrollToEnd({animated: true})}
        onLayout={() => listRef.current.scrollToEnd({animated: true})}
        style={{paddingTop: 5, paddingHorizontal: 5}}
        data={messageList}
        renderItem={renderRow}
        ListFooterComponent={<Animated.View style={{height: bottomPadding}}/>}
        keyExtractor={(item,index) => index.toString()}
      />
    </KeyboardAvoidingView>
  )
}

ChatScreen.navigationOptions = (data) => {
  return{
    headerShown: false,
  }
}

const styles = StyleSheet.create({
  btntext: {
    fontSize: 20,
    marginRight: 5
  },
  backButton:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    top: height / 15,
    left: width / 20,
    width: 50,
    height: 50,
    backgroundColor: '#e56767',
    borderRadius: 100,
  },
  buttonWrap:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10
  },
  bottomBar:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',
    padding: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: 60
  },
  buttonWrapper:{
    backgroundColor: '#e56767',
    borderRadius: 100,
    padding: 8,
    flexDirection: 'row'
  },
  input:{
    // paddingTop: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    width: '80%',
    fontSize: 16,
    backgroundColor: '#fff',
    height: height / 20,
    // marginBottom: 10,
    borderRadius: 15
  }
})

export default ChatScreen;
