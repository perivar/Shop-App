// import React from 'react';
// import { GiftedChat, Bubble } from 'react-native-gifted-chat'; // 0.3.0
// import { View, TextInput, SafeAreaView, Alert, Text, Dimensions, StatusBar, StyleSheet, ActivityIndicator, Button, Image, FlatList, TouchableOpacity } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import Animated, { Easing } from 'react-native-reanimated';
//
// const {width,height} = Dimensions.get('window')
//
// export default class ChatScreen extends React.Component {
//
//   constructor(props){
//     super(props);
//     this.state = {
//       person : {
//
//       }
//       textMessage: ''
//     }
//   }
//
//   handleChange = (key) => val => {
//     this.setState({ [key]: val })
//   }
//
//   sendMessage = async () => {
//
//       // let msgId = firebase.database().ref("messages").child()
//   }
//
//   render(){
//     return(
//       <SafeAreaView>
//         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//           <TextInput
//           style={styles.input}
//           value={this.state.textMessage}
//           placeHolder="Type message.."
//           onChangeText={this.handleChange('textMessage')}
//           />
//           <TouchableOpacity onPress={this.sendMessage}>
//             <Text style={styles.btntext}>Send</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     )
//   }
// }
//
// const styles = StyleSheet.create({
//   btntext: {
//     fontSize: 20
//   },
//   input:{
//     padding: 20,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     width: width / 1.3,
//     marginVertical: 20,
//     borderRadius: 20
//   }
// })




// import Fire from '../Fire';
//
// type Props = {
//   name?: string,
// };
//
// const {width,height} = Dimensions.get('window')
// const headerHeight = Platform.OS == 'ios' ? 100 : 70 + StatusBar;
// const scrollY = new Animated.Value(0)
// const headerY = Animated.interpolate(scrollY, {
//   inputRange:[0, headerHeight],
//   outputRange:[0,-headerHeight]
// })
// const height_logo = height * 0.4 * 0.4
//
// class Chat extends React.Component<Props> {
//
//   state = {
//     messages: [],
//     name: null
//   };
//
//   get user() {
//     return {
//       _id: Fire.shared.uid,
//       name: Fire.shared.name,
//       avatar: Fire.shared.img,
//     };
//   }
//
//   renderBubble(props){
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: '#44bda1'
//           },
//           left: {
//             backgroundColor: '#fcf3f5'
//           }
//         }}
//       />
//     )
//   }
//
//   render() {
//     return (
//       <View style={{flex:1, backgroundColor: '#F5E9EA'}}>
//         <Animated.View
//           style={{
//             position: 'absolute',
//             flexDirection: 'row',
//             left: 0,
//             right: 0,
//             top: 0,
//             borderBottomLeftRadius: 100,
//             borderBottomRightRadius: 100,
//             height: headerHeight,
//             backgroundColor: '#c6f1e7',
//             zIndex: 1000,
//             elevation:1000,
//             transform: [{ translateY: headerY }],
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//          >
//            <Animatable.Text
//              animation={"fadeInDown"}
//              duration={900}
//              style={styles.welcomeText}>
//              Macbookzzz
//           </Animatable.Text>
//            <View style={styles.header}>
//            </View>
//          </Animated.View>
//         <GiftedChat
//           messages={this.state.messages}
//           onSend={Fire.shared.send}
//           user={this.user}
//           renderBubble={this.renderBubble}
//         />
//       </View>
//
//     );
//   }
//
//   componentDidMount() {
//     Fire.shared.on(message =>
//       this.setState(previousState => ({
//         messages: GiftedChat.append(previousState.messages, message),
//       }))
//     );
//   }
//   componentWillUnmount() {
//     Fire.shared.off();
//   }
// }
//
// Chat.navigationOptions = (data) => {
//   return{
//     headerShown: false
//   }
// }
//
// const styles = StyleSheet.create({
//   screen:{
//     flex:1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#F5E9EA',
//   },
//   header:{
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: headerHeight + height_logo / 3,
//     shadowColor: "#8aa8a1",
//     shadowRadius: 5,
//     shadowOffset: {height:5},
//     shadowOpacity: 0.2,
//     paddingTop: 30
//   },
//   logo:{
//     top:height / 6,
//     width: height_logo,
//     height: height_logo,
//     borderRadius: height_logo / 2,
//   },
//   welcomeText:{
//     flex:1,
//     textAlign: 'center',
//     width: '100%',
//     fontSize: width / 20,
//     fontWeight: 'bold',
//     opacity: 1,
//     color: '#254053',
//     top: 55,
//     left: 0,
//     position: 'absolute'
//   }
// })
//
// export default Chat;

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { AsyncStorage } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import { View, Alert, Dimensions, TextInput, SafeAreaView, Text, StyleSheet, ActivityIndicator, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'
import * as Permissions from 'expo-permissions'
import * as firebase from 'firebase'
import * as Progress from 'react-native-progress';
import { fetchMessages } from '../store/actions/products'
import { db } from '../config'

var database = firebase.database();

const {width,height} = Dimensions.get('window')

const ChatScreen= props => {

  const dispatch = useDispatch()

  const [user, setUser] = useState()
  const [userMessageTo, setUserMessageTo] = useState()
  const [messages, setMessages] = useState([])
  const [sellerName, setSellerName] = useState()
  const [sellerPic, setSellerPic] = useState()
  const [messageText, setMessage] = useState()
  const [messageList, setMessageList] = useState([])

  const sendMessage = async () => {
    if( messageText.length > 0 ){
      let msgId = firebase.database().ref("messages").child(user).child(userMessageTo).push().key
      let updates = {}
      let message ={
        message: messageText,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: user
      }
      updates['messages/'+user+'/'+userMessageTo+'/'+msgId] = message;
      updates['messages/'+userMessageTo+'/'+user+'/'+msgId] = message;
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
      result = d.getDay() + ' ' + d.getMonth() + ' ' + result
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
          setUserMessageTo(user2)
          setSellerName(seller)
          setSellerPic(img)
          console.log(user2);

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
      <View style={{
        flexDirection: 'row',
        width: '60%',
        alignSelf: itemData.item.from===user ? 'flex-end' : 'flex-start',
        backgroundColor: '#44bda1',
        borderRadius: 5,
        margin: 10}}>
        <Text style={{color:"#fff", padding: 7, fontSize: 16}}>
          {itemData.item.message}
        </Text>
        <Text style={{color:"#eee", padding:3, fontSize: 12}}>
          {convertTime(itemData.item.time)}
        </Text>
      </View>
    )
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return(
    <SafeAreaView>
      <FlatList
        style={{padding: 10, height: height * 0.67}}
        data={messageList}
        renderItem={renderRow}
        keyExtractor={(item,index) => index.toString()}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
        style={styles.input}
        value={messageText}
        placeHolder="Type message.."
        onChangeText={text => setMessage(text)}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text style={styles.btntext}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  btntext: {
    fontSize: 20
  },
  input:{
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    width: width / 1.3,
    marginVertical: 20,
    borderRadius: 20
  }
})

export default ChatScreen;
