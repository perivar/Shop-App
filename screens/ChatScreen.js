// import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
// import Fire from '../Fire';
//
// type Props = {
//   name?: string,
// };
//
// class Chat extends React.Component<Props> {
//   state = {
//     conversations: [],
//     messages: [],
//   };
//
//   get user() {
//     return {
//       _id: Fire.shared.uid,
//     };
//   }
//
//   render() {
//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={Fire.shared.send}
//         user={this.user}
//       />
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
// export default Chat;

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { AsyncStorage } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import { View, Alert, Text, StyleSheet, ActivityIndicator, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'
import * as Permissions from 'expo-permissions'
import * as firebase from 'firebase'
import * as Progress from 'react-native-progress';

var database = firebase.database();

const ChatScreen= props => {

  const [user, setUser] = useState()
  const [userMessageTo, setUserMessageTo] = useState()
  const [messages, setMessages] = useState([])

  const send = async (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user, createdAt} = messages[i];
      const message = {
        text,
        userMessageTo,
        timestamp: createdAt,
      };
      firebase.database().ref('chats/' + user).set(message);
    }




    //   this.append(message);
    // }
  };

  const fetchUserData = async () => {
    try {
        const user = await firebase.auth().currentUser;
        const user2 = await props.navigation.getParam("uid");
        if (user != null) {
          setUser(user.uid);
          setUserMessageTo(user2)
        }

      } catch (error) {
        // Error retrieving data
      }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return(
        <GiftedChat
          messages={messages}
          onSend={send}
          user={user}
        />
  )
}

export default ChatScreen;
