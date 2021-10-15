import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'

class UserPermissions {
  getCameraPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status != "granted") {
      Alert.alert("Need permissions to take photo", [{text: 'Okay'}])
    }
  }
  getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status != "granted") {
      Alert.alert("Need permissions to take photo", [{text: 'Okay'}])
    }
  }
}

export default new UserPermissions();
