import React, { useState, useEffect } from 'react'
import * as Permissions from 'expo-permissions'

class UserPermissions {
  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if (status != "granted") {
      Alert.alert("Need permissions to take photo", [{text: 'Okay'}])
    }
  }
  getLocationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status != "granted") {
      Alert.alert("Need permissions to take photo", [{text: 'Okay'}])
    }
  }
}

export default new UserPermissions();
