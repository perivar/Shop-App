import React, { useState, useReducer, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Dimensions, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { addListing } from '../store/actions/products'
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { AsyncStorage } from 'react-native'
import Input from './Input'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'
import Geocoder from 'react-native-geocoding';
import * as firebase from 'firebase'
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get('window')

const NewItem = props => {
  const image = props.navigation.getParam("img");
  const dispatch = useDispatch()
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [username, setUsername] = useState(null)
  const [profilePic, setProfilePic] = useState(null)

  const currentState = useSelector(state => state.allProducts.products)

  const fetchUserData = async () => {
    try {
        const user = await firebase.auth().currentUser;
        if (user != null) {
          setUsername(user.displayName);
          setProfilePic(user.photoURL)
        }

      } catch (error) {
        // Error retrieving data
      }
  }

  const locationHandler = (coordinates) => {
    Geocoder.init("AIzaSyCngPfFt7-u-cmGhsj86-rB-OP9inA411k");
    Geocoder.from(coordinates.lat, coordinates.lng)
          .then(json => {
              var addressComponent = json.results[3].address_components[1];
              const city = addressComponent["long_name"]
              setSelectedLocation(city)
          })
          .catch(error => console.log(error));
  }

  const [nameHolder, setNameHolder] = useState("Add your Title")
  const [priceHolder, setPriceHolder] = useState(null)
  const [descHolder, setDescHolder] = useState("Add your Description")
  const [animation, setAnimation] = useState(null)
  const [animation2, setAnimation2] = useState(null)
  const [delayProp, setDelayProp] = useState(5000)
  const [widthSlide, setWidthSlide] = useState(width)
  const [width1Slide, setWidth1Slide] = useState(0)
  // const [locationHolder, setLocationHolder] = useState("Add your Location")

  const submitChanges = () => {
    let objectReturn = addListing(nameHolder, descHolder, priceHolder, selectedImage, selectedLocation, username, profilePic)
    dispatch(objectReturn)
    props.navigation.popToTop();
  }

  const handleSlide = async () => {
    await setDelayProp(200)
    await setWidthSlide(0)
    await setWidth1Slide(0)
    setAnimation("fadeOutLeft")
    setAnimation2("fadeInRight")
  }

  useEffect(() => {
    fetchUserData()
    setAnimation("slideInUp")
  }, [])

  return(
      <View style={{flex:1, backgroundColor: '#F5E9EA', justifyContent: 'flex-end'}}>
        <View style={styles.arrowWrap}>
          <MaterialIcons onPress={() => {props.navigation.navigate("Market")}} name="navigate-before" color="white" size={35}/>
        </View>
        <View style={{position: 'absolute',top: 0 ,bottom: 0,left: 0,right: 0, borderTopRightRadius: 30, alignItems: 'center'}}>
            <Animatable.Image
            animation="fadeInUp"
            duration={600}
            delay={100}
            source={{uri: image}}
            style={styles.bgImg}>
          </Animatable.Image>

        </View>
        <View style={{flexDirection: 'row', width: width * 2}}>
          <Animatable.View
            animation={animation}
            duration={900}
            style={[styles.buttonWrapper, {right: width1Slide}]}>
            <ScrollView style={styles.form}>
              <View style={styles.nameWrapper}>
                <Text style={styles.text}>
                  Title
                </Text>
                <TextInput
                   style = {styles.input}
                   onChangeText={text => setNameHolder(text)}
                   selectionColor = "#9a73ef"
                   maxLength={60}
                   placeholder="Give me a Title"
                   textAlign="left"
                 />
              </View>

              <View style={styles.descriptionWrapper}>
                <Text style={styles.text}>
                  Description
                </Text>
                <TextInput
                   style = {styles.input}
                   onChangeText={text => setDescHolder(text)}
                   selectionColor = "#9a73ef"
                   maxLength={60}
                   placeholder="Give me a description"
                   textAlign="left"
                 />
              </View>

              <View style={styles.priceWrap}>
                <Text style={styles.text}>
                  Price
                </Text>
                <TextInput
                   style = {styles.input}
                   onChangeText={text => setPriceHolder(text)}
                   selectionColor = "#9a73ef"
                   placeholder="Add your price"
                   textAlign="left"
                   keyboardType="number-pad"
                   returnKeyType={ 'done' }
                   onSubmitEditing={handleSlide}
                 />
              </View>
            </ScrollView>
          </Animatable.View>

          <Animatable.View
            animation={animation2}
            duration={1000}
            delay={delayProp}
            style={[styles.buttonWrapper2, {left: widthSlide}]}>
            <ScrollView style={styles.form}>
              <LocationPicker onLocation={locationHandler}/>
              <View style={styles.locationWrapper}>
                <Text style={styles.text}>
                  or write location
                </Text>
                <TextInput
                   style = {styles.input}
                   onChangeText={text => setPriceHolder(text)}
                   selectionColor = "#9a73ef"
                   placeholder="Location"
                   textAlign="left"
                   keyboardType="default"
                 />
              </View>
              <TouchableOpacity
                onPress={() => {
                  console.log('test');
                }}
                style={{...styles.button, backgroundColor: '#e56767', flexDirection: 'row', justifyContent: 'center'}}>

                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Add product</Text>
                <MaterialIcons name="navigate-next" size={26} color="white"/>
              </TouchableOpacity>
            </ScrollView>
          </Animatable.View>

        </View>
        </View>
  )
}

NewItem.navigationOptions = (data) => {
  return{
    headerShown: false
  }
}

const styles = StyleSheet.create({
  compWrapper:{
    flex:1,
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'blue',
    // marginVertical: 15
    // flexDirection: 'column',
    // justifyContent:'center',
  },
  card:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width:'100%',
    height: '100%',
    paddingHorizontal: 10,
    paddingTop: 20,
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  buttonWrapper:{
    height: height / 1.7,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 1,
  },
  buttonWrapper2:{
    height: height / 1.7,
    width: '50%',
    zIndex: 1000,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 1,
  },
  button:{
    backgroundColor: 'white',
    height: 50,
    width: height / 3,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    marginBottom: 15
  },
  bgImg:{
    flex:0.7,
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  arrowWrap:{
    position: 'absolute',
    zIndex: 1000,
    top: height / 20,
    flex:1,
  },
  title:{
    fontSize: 34,
    textAlign: 'center',
    marginBottom: 15
  },
  text:{
    color: '#666666'
  },
  nameWrapper:{
    width: '100%',
    flex:1,
    width: height / 2.6,
    overflow: 'hidden',
    marginBottom: 15,
    marginTop: 30,
  },
  descriptionWrapper:{
    width: '100%',
    overflow: 'hidden',
    marginBottom: 15,
    flex:1
  },
  locationWrapper:{
    // backgroundColor: 'yellow',
    width: '100%',
    overflow: 'hidden',
    marginBottom: 5,
    flex:1
  },
  priceWrap:{
    marginBottom: 15,
    width: '100%'
  },
  price:{
    fontSize: 16,
    color: '#666666'
  },
  pricewrapper:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  priceTitle:{
    color: '#333333'
  },
  input: {
   width: '100%',
   height: 40,
   fontSize: 18,
   textAlign: 'left',
   borderColor: '#d9d9d9',
   borderBottomWidth: 1
  },
  submitWrapper:{
  marginTop: 15,
  borderWidth: 1,
  borderRadius: 30,
  paddingBottom: 12,
  paddingTop: 12,
  paddingLeft: 16,
  paddingRight: 16,
  borderColor: '#00588C',
  color: '#00588C',
  },
  buttonText:{
  fontSize: 13,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  color: '#00588C',
  }
})

export default NewItem;
