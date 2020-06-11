import React, { useState, useEffect} from 'react'
import { AsyncStorage } from 'react-native'
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator, Button, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { logout } from '../store/actions/auth'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase';

const {width,height} = Dimensions.get('window')

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
       <View style={styles.arrowWrap}>
         <MaterialIcons onPress={() => {props.navigation.navigate("Homescreen")}} name="navigate-before" color="white" size={35}/>
       </View>
       <View style={styles.backgroundTop}>
         <View style={{position: 'absolute', zIndex: 100, top: height / 14, left: width / 7}}>
           <Text
             style={styles.settingsText}>
             Settings
           </Text>
         </View>
         <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', zIndex: 100, top: height / 5, left: width / 7}}>
          <Image source={{uri: avatar}} style={styles.img}/>
           <Text
             style={styles.headerText}>
             {username}
           </Text>
         </View>

         <LinearGradient
             colors={['#B7F8DB', '#50A7C2']}
             style={{
               flex:1,
               height: height / 3
             }}
           />
       </View>

       <View style={{marginTop: height / 20, flex:1, justifyContent: 'flex-start', alignItems: 'center'}}>
       <TouchableOpacity
         onPress={() => {
           dispatch(logout())
           props.navigation.navigate('Auth')
         }}
         style={{margin: 20, borderWidth: 1, borderColor: '#e56767', borderRadius: 30, paddingHorizontal: 80, paddingVertical: 10}}>
         <Text style={{fontSize: 24, fontWeight: 'bold'}}>
           Log out
         </Text>
       </TouchableOpacity>
        <TouchableOpacity style={{marginTop: height / 20, borderWidth: 1, borderColor: 'black', borderRadius: 30, paddingHorizontal: 80, paddingVertical: 10}}>
          <Text style={{fontSize: 16}}>
            Terms of use
          </Text>
        </TouchableOpacity>
       </View>


    </View>
  )
}

SettingsScreen.navigationOptions = (data) => {
  return{
    headerShown:false
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  backgroundTop:{
    backgroundColor: 'yellow',
    height: height / 3
  },
  text:{
    color: 'black'
  },
  img:{
    width: 70,
    height: 70,
    borderRadius: 50
    },
  header:{
    paddingHorizontal: 15,
  },
  headerText:{
    fontSize: 24,
    marginLeft: 20,
    color: "white",
    fontWeight: 'bold',
  },
  settingsText:{
    fontSize: 36,
    color: "white",
    fontWeight: 'bold',
  },
  arrowWrap:{
    position: 'absolute',
    zIndex: 1000,
    top: 63,
    left: 5,
    flex:1,
  },

  buttonStyle:{

  }
})

export default SettingsScreen;
