import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  PanResponderGestureState,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import GestureRecognizer from 'react-native-swipe-gestures';

import { RootStackScreenProps } from '../navigation/ShopNavigation';
import { addListing } from '../redux/methods/products';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
};

import LocationPicker from './LocationPicker';

const { width, height } = Dimensions.get('window');

const NewItem = (props: RootStackScreenProps<'Form'>) => {
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  const left = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];
  const right = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

  const image = props.route.params?.img;

  const dispatch = useAppDispatch();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [username, setUsername] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [swipe, setSwipe] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const currentState = useAppSelector(state => state.allProducts.products);

  const moveView = () => {
    Animated.parallel([
      Animated.timing(left, {
        toValue: { x: -width, y: 0 },
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(right, {
        toValue: { x: -width, y: 0 },
        duration: 550,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const moveBack = () => {
    Animated.parallel([
      Animated.timing(left, {
        toValue: { x: 0, y: 0 },
        duration: 550,
        useNativeDriver: false,
      }),
      Animated.timing(right, {
        toValue: { x: 0, y: 0 },
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const onSwipe = (
    gestureName: string,
    gestureState: PanResponderGestureState
  ) => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_RIGHT:
        moveBack();
        break;
      case SWIPE_LEFT:
        moveView();
        break;
    }
  };

  const onSwipeRight = (gestureState: PanResponderGestureState) => {
    setSwipe('swiped left');
  };
  const onSwipeLeft = (gestureState: PanResponderGestureState) => {
    setSwipe('swiped right');
  };

  const fetchUserData = async () => {
    try {
      const user = await firebase.auth().currentUser;
      if (user !== null) {
        setUsername(user.displayName);
        setProfilePic(user.photoURL);
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  const locationHandler = (city: string) => {
    setSelectedLocation(city);
  };

  const [nameHolder, setNameHolder] = useState('Add your Title');
  const [priceHolder, setPriceHolder] = useState(null);
  const [descHolder, setDescHolder] = useState('Add your Description');
  // const [locationHolder, setLocationHolder] = useState("Add your Location")

  const submitChanges = async () => {
    setIsLoading(true);
    let objectReturn = await addListing(
      nameHolder,
      descHolder,
      priceHolder,
      image,
      selectedLocation,
      username,
      profilePic
    );
    await dispatch(objectReturn);
    setIsLoading(false);
    props.navigation.popToTop();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <KeyboardAvoidingView style={{ height: height }} behavior="padding">
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          backgroundColor: '#F5E9EA',
          justifyContent: 'flex-end',
        }}>
        <View style={styles.arrowWrap}>
          <MaterialIcons
            onPress={() => {
              props.navigation.navigate('Market');
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
            duration={600}
            delay={100}
            source={{ uri: image }}
            style={styles.bgImg}></Animatable.Image>
        </View>
        <View style={{ flexDirection: 'row', width: width * 2 }}>
          <GestureRecognizer
            onSwipe={(direction, state) => onSwipe(direction, state)}
            onSwipeLeft={state => onSwipeLeft(state)}
            config={config}
            style={{ flex: 1, width: width, justifyContent: 'flex-end' }}>
            <Animated.View style={[styles.buttonWrapper, left.getLayout()]}>
              <ScrollView style={styles.form}>
                <View style={styles.nameWrapper}>
                  <Text style={styles.text}>Title</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setNameHolder(text)}
                    selectionColor="#9a73ef"
                    maxLength={60}
                    placeholder="Give me a Title"
                    textAlign="left"
                  />
                </View>

                <View style={styles.descriptionWrapper}>
                  <Text style={styles.text}>Description</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setDescHolder(text)}
                    selectionColor="#9a73ef"
                    maxLength={60}
                    placeholder="Give me a description"
                    textAlign="left"
                  />
                </View>

                <View style={styles.priceWrap}>
                  <Text style={styles.text}>Price</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setPriceHolder(text)}
                    selectionColor="#9a73ef"
                    placeholder="Add your price"
                    textAlign="left"
                    keyboardType="number-pad"
                    returnKeyType={'done'}
                    onSubmitEditing={moveView}
                  />
                </View>
              </ScrollView>
            </Animated.View>
          </GestureRecognizer>

          <GestureRecognizer
            onSwipe={(direction, state) => onSwipe(direction, state)}
            onSwipeRight={state => onSwipeRight(state)}
            config={config}
            style={{ flex: 1, width: width }}>
            <Animated.View style={[styles.buttonWrapper2, right.getLayout()]}>
              <ScrollView style={styles.form}>
                <LocationPicker height={height} onLocation={locationHandler} />
                <View style={styles.locationWrapper}>
                  <Text style={styles.text}>or write location</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setPriceHolder(text)}
                    selectionColor="#9a73ef"
                    placeholder="Location"
                    textAlign="left"
                    keyboardType="default"
                  />
                </View>
                <TouchableOpacity
                  onPress={submitChanges}
                  style={{
                    ...styles.button,
                    backgroundColor: '#e56767',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      Add product
                    </Text>
                  )}
                  <MaterialIcons name="navigate-next" size={26} color="white" />
                </TouchableOpacity>
              </ScrollView>
            </Animated.View>
          </GestureRecognizer>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    height: height / 1.7,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 1,
  },
  buttonWrapper2: {
    height: height / 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 1,
  },
  button: {
    backgroundColor: 'white',
    height: 50,
    width: height / 3,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height / 50,
    marginBottom: 15,
  },
  bgImg: {
    flex: 0.7,
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  arrowWrap: {
    position: 'absolute',
    zIndex: 1000,
    top: height / 20,
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c8b80',
  },
  nameWrapper: {
    flex: 1,
    width: height / 2.6,
    overflow: 'hidden',
    marginBottom: height / 20,
    marginTop: 30,
  },
  descriptionWrapper: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: height / 20,
    flex: 1,
  },
  locationWrapper: {
    width: '100%',
    overflow: 'hidden',
    marginVertical: height / 25,
    flex: 1,
  },
  priceWrap: {
    marginBottom: height / 20,
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    fontSize: 18,
    textAlign: 'left',
    borderColor: '#d9d9d9',
    borderBottomWidth: 1,
  },
  form: {
    width: '100%',
  },
});

export default NewItem;
