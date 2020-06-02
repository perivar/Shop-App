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
import { MaterialIcons } from '@expo/vector-icons';
import Geocoder from 'react-native-geocoding';

import { db } from '../config';

const LocationPicker = props => {

  const [isFetching, setIsFetching] = useState(false)
  const [location, setLocation] = useState("No location chosen")

  const getUserLocation = async () => {
   await UserPermissions.getLocationPermission()
   try {
    setIsFetching(true)
    const userLocation = await Location.getCurrentPositionAsync()
    // setLocation({
    //   lat: userLocation.coords.latitude,
    //   lng: userLocation.coords.longitude
    // })
    Geocoder.init("AIzaSyCngPfFt7-u-cmGhsj86-rB-OP9inA411k");
    Geocoder.from(userLocation.coords.latitude, userLocation.coords.longitude)
          .then(json => {
              var addressComponent = json.results[3].address_components[1];
              const city = addressComponent["long_name"]
              props.onLocation(city)
              setLocation(city)
          })
          .catch(error => console.log(error));
  }catch (err){
    Alert.alert('Could not get position')
  }
  setIsFetching(false)
  }

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        <Text>{location}</Text>
      </View>
      <TouchableOpacity style={{...styles.button, borderWidth: 1.5,backgroundColor: 'rgba(229,	103,	103, 0)', borderColor: '#e56767', flexDirection: 'row', justifyContent: 'center', width: props.height / 3}} title="Get location" onPress={getUserLocation}>
        <MaterialIcons name="location-on" color="#323232" size={25} style={{marginRight: 10}}/>
        {isFetching ? (<ActivityIndicator size="large"/>) : (<Text style={{fontSize: 20, fontWeight: 'bold', color: '#323232'}}>Get location</Text>)}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  locationPicker:{
    alignItems: 'center',
    marginVertical: 10,
  },
  mapPreview:{
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    marginTop: 40
  },
  button:{
    height: 50,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    marginBottom: 15
  }
})

export default LocationPicker;
