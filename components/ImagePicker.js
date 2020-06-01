import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import { View, Alert, Text, StyleSheet, ActivityIndicator, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import * as firebase from 'firebase'

import { db } from '../config';

const ImgPicker = props => {

  const didBlurSubscription = props.navigation.addListener(
    'willFocus',
    () => {
      takeImageHandler()
    }
  );

  const imageHandler = (imagePath) => {
    setSelectedImage(imagePath)
    // didBlurSubscription.remove();
  }

  const [selectedImage, setSelectedImage] = useState(null)
  const [firstTime, setFirstTime] = useState(true)
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

    if (!image.cancelled) {
      let cut = image.uri.split("ImagePicker");
      let mid = cut[1].split("/")
      let final = mid[1].split(".");
      final.pop()
      let imageName = final.join("")

      setPickedImage(image.uri)
      uploadImage(image.uri, imageName)
    }else{
      props.navigation.navigate("Market")
    }
  }

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    var ref = firebase.storage().ref().child("images/" + imageName)
    await ref.put(blob)
    const url = await ref.getDownloadURL()
    setSelectedImage(url)
    props.navigation.navigate("Form", {
      img: selectedImage
    })
  }

  // useEffect(() => {
  //   takeImageHandler()
  // }, [])

  return (
    <View style={styles.imagePicker}>
      {/* <View style={styles.imagePreview}>
        {!pickedImage ?(
          <Text style={styles.text}>No image picked yet</Text>
        ) : (
          <Image style={styles.image} source={{uri: pickedImage}}/>
        )}

      </View>
      <Button onPress={takeImageHandler} title="take image"/> */}
    </View>
  )
}

ImgPicker.navigationOptions = (data) => {
  return{
    headerShown: false
  }
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
