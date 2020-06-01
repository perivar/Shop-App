import React, { useState, useReducer, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { addListing } from '../store/actions/products'
import { useDispatch, useSelector } from 'react-redux'
import { AsyncStorage } from 'react-native'
import Input from './Input'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'
import Geocoder from 'react-native-geocoding';
import * as firebase from 'firebase'

const NewItem = props => {
  console.log(props.navigation.getParam("img"));
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
  // const [locationHolder, setLocationHolder] = useState("Add your Location")

  const submitChanges = () => {
    let objectReturn = addListing(nameHolder, descHolder, priceHolder, selectedImage, selectedLocation, username, profilePic)
    dispatch(objectReturn)
    props.navigation.popToTop();
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return(
      <View style={styles.compWrapper}>
          <View style={styles.card}>
            <ScrollView style={{flex:1, width: '100%', height: '100%'}}>
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
                 />
              </View>

              <LocationPicker onLocation={locationHandler}/>

              <View style={styles.pricewrapper}>
                <TouchableOpacity style={styles.submitWrapper} onPress={submitChanges}>
                  <Text style={styles.buttonText}>Add Product</Text>
                </TouchableOpacity>
              </View>
              </ScrollView>
            </View>
        </View>
  )
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
  title:{
    fontSize: 34,
    textAlign: 'center',
    marginBottom: 15
  },
  text:{
    color: '#666666'
  },
  nameWrapper:{
    width: '90%',
    overflow: 'hidden',
    marginBottom: 15,
    flex:1
  },
  descriptionWrapper:{
    width: '90%',
    overflow: 'hidden',
    marginBottom: 15,
    flex:1
  },
  locationWrapper:{
    // backgroundColor: 'yellow',
    width: '90%',
    overflow: 'hidden',
    marginBottom: 15,
    flex:1
  },
  priceWrap:{
    marginBottom: 15,
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
