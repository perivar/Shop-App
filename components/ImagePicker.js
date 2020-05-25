import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import { View, Alert, Text, StyleSheet, ActivityIndicator, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState()
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA)
    if (result.status !== 'granted') {
      Alert.alert("Need permissions to take photo", [{text: 'Okay'}])
      return false;
    }
    return true
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions()
    if(!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16,9],
      quality: 0.5
    });
    setPickedImage(image.uri)
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ?(
          <Text style={styles.text}>No image picked yet</Text>
        ) : (
          <Image style={styles.image} source={{uri: pickedImage}}/>
        )}

      </View>
      <Button onPress={takeImageHandler} title="take image"/>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker:{
    alignItems: 'center'
  },
  imagePreview:{
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image:{
    width: '100%',
    height: '100%'
  }
})

export default ImgPicker;
