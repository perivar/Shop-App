import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { AsyncStorage } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import { View, Alert, Text, StyleSheet, ActivityIndicator, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'
import * as Permissions from 'expo-permissions'
import * as firebase from 'firebase'
import * as Progress from 'react-native-progress';

const ChatList = () => {
  const [user, setUser] = useState()

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

  useEffect(() => {
    fetchUserData()
  }, [])

  return(
    <View>
      <Text>
        The chat list screen
        Flatlist will cum here
      </Text>
    </View>
  )
}

export default ChatList;
