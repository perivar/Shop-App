import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import { View, Alert, Text, StyleSheet, ActivityIndicator, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import * as firebase from 'firebase'
import * as Location from 'expo-location'
import UserPermissions from './UserPermissions'

import { db } from '../config';

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false)
  const [location, setLocation] = useState()

  const getUserLocation = async () => {
   UserPermissions.getLocationPermission()

   try {
    setIsFetching(true)
    const userLocation = await Location.getCurrentPositionAsync({timeout: 5000})
    setLocation({
      lat: userLocation.coords.latitude,
      lng: userLocation.coords.longitude
    })
  }catch (err){
    Alert.alert('Could not get position')
  }
  setIsFetching(false)
  }

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? <ActivityIndicator size="large"/> : <Text>No location chosen</Text>}
      </View>

      <Button title="Get location" onPress={getUserLocation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  locationPicker:{
    alignItems: 'center'
  },
  mapPreview:{
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
})

export default LocationPicker;
