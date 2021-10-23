import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

import firebase from '../firebase';
import { RootStackScreenProps } from '../navigation/ShopNavigation';

const { width, height } = Dimensions.get('window');

const ImgPicker = (props: RootStackScreenProps<'Picture'>) => {
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      takeImageHandler();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    takeImageHandler();
  }, []);

  const [selectedImage, setSelectedImage] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pickedImage, setPickedImage] = useState<string>();

  const verifyPermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Need permissions to take photo', '', [{ text: 'Okay' }]);
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.cancelled) {
      const { uri } = result as ImageInfo;

      let cut = uri.split('ImagePicker');
      let mid = cut[1].split('/');
      let final = mid[1].split('.');
      final.pop();
      let imageName = final.join('');

      await setPickedImage(uri);
      await uploadImage(uri, imageName);
    } else {
      props.navigation.navigate('Market');
    }
  };

  const uploadImage = async (uri: string, imageName: string) => {
    await setIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('images/' + imageName);
    await ref.put(blob);
    const url = await ref.getDownloadURL();
    setSelectedImage(url);
    setIsLoading(false);
    props.navigation.navigate('Form', {
      img: url,
    });
  };

  return (
    <View style={styles.imagePicker}>
      {isLoading ? (
        <View style={styles.imagePreview}>
          <LinearGradient
            colors={['#ffc3a0', '#ffafbd']}
            style={{
              position: 'absolute',
              width: width,
              height: height,
            }}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 100,
              height: 100,
              borderRadius: 30,
              backgroundColor: '#f7d1d1',
            }}>
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      ) : (
        <View></View>
      )}
      {/* <View style={styles.imagePreview}>
      </View> */}
      {/* <Button onPress={takeImageHandler} title="take image"/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  form: {
    width: '100%',
  },
});

export default ImgPicker;
