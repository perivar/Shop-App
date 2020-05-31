import React, { useState, useEffect} from 'react'
import { AsyncStorage } from 'react-native'
import { View, Text, StyleSheet, Image, ActivityIndicator, Button, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'
import firebase from 'firebase';

const SettingsScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState(null)
  const [avatar, setAvatar] = useState("fill")
  const fetchUserData = async () => {
    try {
        const user = await firebase.auth().currentUser;
        console.log(user.photoURL);
        if (user != null) {
          setAvatar(user.photoURL)
        }

        const value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          const response = await JSON.parse(value)
          setUsername(response.displayName)
        }
      } catch (error) {
        // Error retrieving data
      }
  }

  useEffect(() => {
    setIsLoading(true)
    fetchUserData().then(() => {
      setIsLoading(false)
    })
  }, [])

  const dispatch = useDispatch()

  if (isLoading) {
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: avatar}} style={styles.img}/>
      <Text style={styles.text}>
        Welcome {username}
      </Text>
      <Text style={styles.text}>
        The Settings screen
      </Text>
      <Button title="Log out" color="#FF1654" onPress={() => {
        dispatch(logout())
        props.navigation.navigate('Auth')
      }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    color: 'black'
  },
  img:{
    width: 100,
    height: 100,
    borderRadius: 50
    },

  buttonStyle:{

  }
})

export default SettingsScreen;
