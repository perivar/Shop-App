import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import { View, Alert, Text, StyleSheet, ActivityIndicator, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import * as firebase from 'firebase'
import * as Progress from 'react-native-progress';

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
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
    const response = await fetch(uri)
    const blob = await response.blob()

    var ref = firebase.storage().ref().child("images/" + imageName)
    await ref.put(blob)
    const url = await ref.getDownloadURL()
    setSelectedImage(url)
    setIsLoading(false)
    props.navigation.navigate("Form", {
      img: url
    })
  }

  // useEffect(() => {
  //   takeImageHandler()
  // }, [])

  return (
    <View style={styles.imagePicker}>
      {isLoading ? (
        <View style={styles.imagePreview}>
          <Text style={{marginBottom: 30}}>
            Loading....
          </Text>
          {/* <Progress.Bar progress={1} width={200} color={['red', 'green', 'blue']}/> */}
          <ActivityIndicator size="large" color="#3c8b80"/>
        </View>
      ): (<View></View>)}
       {/* <View style={styles.imagePreview}>
        {!pickedImage ?(
          <Text style={styles.text}>No image picked yet</Text>
        ) : (
          <Image style={styles.image} source={{uri: pickedImage}}/>
        )}

      </View>
      <Button onPress={takeImageHandler} title="take image"/>  */}
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
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagePreview:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  image:{
    width: '100%',
    height: '100%'
  }
})

export default ImgPicker;
