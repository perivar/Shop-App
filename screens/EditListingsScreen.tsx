import { MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { RootStackScreenProps } from '../navigation/ShopNavigation';
import { editListing } from '../redux/methods/products';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';

const { width, height } = Dimensions.get('window');

const EditListingsScreen = (props: RootStackScreenProps<'EditListings'>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const name = props.route.params?.name;
  const price = props.route.params?.price;
  const productId = props.route.params?.productId;
  const user = props.route.params?.user;
  const image = props.route.params?.url;
  const description = props.route.params?.description;
  const profileImageUrl =
    'https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg';
  const location = 'Lillehammer, Norway';

  const dispatch = useAppDispatch();

  const currentState = useAppSelector(state => state.allProducts.products);
  const productToEdit = currentState.find(product => product.id === productId);

  const [nameHolder, setNameHolder] = useState(productToEdit.name);
  const [priceHolder, setPriceHolder] = useState(productToEdit.price);
  const [descHolder, setDescHolder] = useState(productToEdit.description);
  const [locationHolder, setLocationHolder] = useState(productToEdit.location);
  const [imageHolder, setImageHolder] = useState(productToEdit.url);

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let objectReturn = await editListing(
        productToEdit.id,
        nameHolder,
        descHolder,
        locationHolder,
        priceHolder,
        imageHolder
      );
      console.log('------------ 2');
      await dispatch(objectReturn);
      console.log('------------ 3');
      setIsLoading(false);
      props.navigation.popToTop();
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  }, [
    dispatch,
    nameHolder,
    locationHolder,
    priceHolder,
    descHolder,
    imageHolder,
  ]);

  if (isLoading) {
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>;
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={{
            flex: 1,
            backgroundColor: '#F5E9EA',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.arrowWrap}>
            <MaterialIcons
              onPress={() => {
                props.navigation.navigate('OwnListings');
              }}
              name="navigate-before"
              color="white"
              size={35}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              borderTopRightRadius: 30,
              alignItems: 'center',
            }}>
            <Animatable.Image
              animation="fadeInUp"
              duration={400}
              source={{ uri: image }}
              style={styles.bgImg}></Animatable.Image>
          </View>

          <Animatable.View
            animation="slideInUp"
            duration={500}
            style={styles.buttonWrapper}>
            <View style={styles.nameWrapper}>
              <Text style={styles.inputTitle}>Title</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setNameHolder(text)}
                selectionColor="#9a73ef"
                value={nameHolder}
                placeholderTextColor="#333333"
                textAlign="left"
              />
            </View>

            <View style={styles.descriptionWrapper}>
              <Text style={styles.inputTitle}>Description</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setDescHolder(text)}
                selectionColor="#9a73ef"
                value={descHolder}
                maxLength={60}
                placeholderTextColor="#333333"
                textAlign="left"
              />
            </View>

            <View style={styles.locationWrapper}>
              <Text style={styles.inputTitle}>Location</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setLocationHolder(text)}
                selectionColor="#9a73ef"
                value={locationHolder}
                placeholderTextColor="red"
                textAlign="left"
              />
            </View>

            <View style={styles.locationWrapper}>
              <Text style={styles.inputTitle}>Price</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setPriceHolder(Number(text))}
                selectionColor="#9a73ef"
                value={priceHolder.toString()}
                placeholderTextColor="red"
                textAlign="left"
              />
            </View>

            <View style={styles.locationWrapper}>
              <Text style={styles.inputTitle}>Image</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setImageHolder(text)}
                selectionColor="#9a73ef"
                value={imageHolder}
                placeholderTextColor="red"
                textAlign="left"
              />
            </View>
            {isLoading ? (
              <TouchableOpacity
                onPress={submitHandler}
                style={{
                  ...styles.button,
                  backgroundColor: '#e56767',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size="small" color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={submitHandler}
                style={{
                  ...styles.button,
                  backgroundColor: '#e56767',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                  Save changes
                </Text>
                <MaterialIcons name="navigate-next" size={26} color="white" />
              </TouchableOpacity>
            )}
          </Animatable.View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  arrowWrap: {
    position: 'absolute',
    zIndex: 1000,
    top: height / 20,
    flex: 1,
  },
  bgImg: {
    flex: 0.6,
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  buttonWrapper: {
    height: height / 1.6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 1,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c8b80',
  },
  nameWrapper: {
    width: '90%',
    overflow: 'hidden',
    marginBottom: 15,
  },
  descriptionWrapper: {
    width: '90%',
    overflow: 'hidden',
    marginBottom: 15,
  },
  locationWrapper: {
    width: '90%',
    overflow: 'hidden',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    fontSize: 18,
    textAlign: 'left',
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: 'white',
    height: 50,
    width: height / 3,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default EditListingsScreen;
