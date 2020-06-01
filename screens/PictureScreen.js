import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import NewItem from '../components/NewItem'
import ImagePicker from '../components/ImagePicker'

const PictureScreen = props => {

  const [selectedImage, setSelectedImage] = useState(null)
  const [uploading, setUploading] = useState()
  const [camera, setCamera] = useState()

  const imageHandler = (imagePath) => {
    setSelectedImage(imagePath)
  }



  return(
    <View style={styles.container}>
      {camera ? (
        <ImagePicker opencamera={camera} onImageTaken={imageHandler} uploading={uploadHandler}/>
      ) : (
        <View><Text>dfhasdfad</Text></View>
      )}
      {uploading ? (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
          <ActivityIndicator size="large" color="black"/>
        </View>) : (<View></View>)}
    </View>
  )
}

PictureScreen.navigationOptions = (data) => {
  return{
    headerShown: false
  }
}

const styles = StyleSheet.create({
container: {
  flex:1,
  justifyContent: 'center',
  backgroundColor: 'red'
}
})

export default PictureScreen
