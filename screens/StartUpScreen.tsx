import React, { useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native'
import { useDispatch } from 'react-redux'
import { authenticate } from '../store/actions/auth'

const StartUpScreen = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData')
      if(!userData){
        props.navigation.navigate('Auth')
        return;
      }
      const transformedData = JSON.parse(userData)
      const { token, userId, expiryDate } = transformedData
      const expirationDate = new Date(expiryDate)

      if(expirationDate <= new Date() || !token || !userId){
        props.navigation.navigate('Auth')
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime()

      props.navigation.navigate('Shop')
      dispatch(authenticate(userId, token, expirationTime))
    }

    tryLogin()
  }, [dispatch])

  return(
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default StartUpScreen;
