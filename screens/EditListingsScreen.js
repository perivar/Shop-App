import React, { useState, useCallback, useEffect} from 'react'
import { View, Text, StyleSheet, Button, FlatList, Image, Keyboard, TouchableWithoutFeedback, Dimensions, TouchableOpacity, ActivityIndicator, Alert, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { editListing } from '../store/actions/products'
import Input from '../components/Input'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get('window')

const EditListingsScreen = props => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const name = props.navigation.getParam('name')
  const price = props.navigation.getParam('price')
  const productId = props.navigation.getParam('productId')
  const user = props.navigation.getParam('user')
  const image = props.navigation.getParam('url')
  const description = props.navigation.getParam('description')
  const profileImageUrl = 'https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg';
  const location = 'Lillehammer, Norway'
  const id = props.navigation.getParam('productId')

  const dispatch = useDispatch()

  const currentState = useSelector(state => state.allProducts.products)
  const productToEdit = currentState.find(product => product.id === id)

  const [nameHolder, setNameHolder] = useState(productToEdit.name)
  const [priceHolder, setPriceHolder] = useState(productToEdit.price)
  const [descHolder, setDescHolder] = useState(productToEdit.description)
  const [locationHolder, setLocationHolder] = useState(productToEdit.location)
  const [imageHolder, setImageHolder] = useState(productToEdit.url)

  useEffect(() => {
    if(error){
      Alert.alert("An error occured", error, [{text: 'Okay'}])
    }
  }, [error])

  const submitHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      let objectReturn = await editListing(productToEdit.id, nameHolder, descHolder, locationHolder, priceHolder, imageHolder)
      await dispatch(objectReturn)
      setIsLoading(false)
      props.navigation.popToTop();
    } catch (err) {
      setError(err.message)
    }
  }, [dispatch, nameHolder, locationHolder, priceHolder, descHolder, imageHolder])

  if (isLoading) {
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large"/>
    </View>
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        alwaysBounceVertical={0}
        contentContainerStyle={{flex:1, backgroundColor: '#F5E9EA', justifyContent: 'flex-end'}}>
        <View style={styles.arrowWrap}>
          <MaterialIcons onPress={() => {props.navigation.navigate("OwnListings")}} name="navigate-before" color="white" size={35}/>
        </View>
        <View style={{position: 'absolute',top:0 ,bottom: 0,left: 0,right: 0, borderTopRightRadius: 30, alignItems: 'center'}}>
          <Animatable.Image
            animation="fadeInUp"
            duration={400}
            source={{uri: image}}
            style={styles.bgImg}
          >
          </Animatable.Image>
        </View>

        <Animatable.View
          animation="slideInUp"
          duration={500}
          style={styles.buttonWrapper}>

          <View style={styles.nameWrapper}>
            <Text style={styles.inputTitle}>
              Title
            </Text>
            <TextInput
               style = {styles.input}
               onChangeText={text => setNameHolder(text)}
               selectionColor = "#9a73ef"
               value={nameHolder}
               placeholderTextColor="#333333"
               textAlign="left"
             />
          </View>

          <View style={styles.descriptionWrapper}>
            <Text style={styles.inputTitle}>
              Description
            </Text>
            <TextInput
               style = {styles.input}
               onChangeText={text => setDescHolder(text)}
               selectionColor = "#9a73ef"
               value={descHolder}
               maxLength={60}
               placeholderTextColor="#333333"
               textAlign="left"
             />
          </View>

          <View style={styles.locationWrapper}>
            <Text style={styles.inputTitle}>
              Location
            </Text>
            <TextInput
               style = {styles.input}
               onChangeText={text => setLocationHolder(text)}
               selectionColor = "#9a73ef"
               value={locationHolder}
               placeholderTextColor="red"
               textAlign="left"
             />
          </View>

          <View style={styles.locationWrapper}>
            <Text style={styles.inputTitle}>
              Price
            </Text>
            <TextInput
               style = {styles.input}
               onChangeText={text => setPriceHolder(text)}
               selectionColor = "#9a73ef"
               value={priceHolder}
               placeholderTextColor="red"
               textAlign="left"
             />
          </View>

          <View style={styles.locationWrapper}>
            <Text style={styles.inputTitle}>
              Image
            </Text>
            <TextInput
               style = {styles.input}
               onChangeText={text => setImageHolder(text)}
               selectionColor = "#9a73ef"
               value={imageHolder}
               placeholderTextColor="red"
               textAlign="left"
             />
          </View>
          {isLoading ?
            (
            <TouchableOpacity
              onPress={submitHandler}
              style={{...styles.button, backgroundColor: '#e56767', flexDirection: 'row', justifyContent: 'center'}}>
              <ActivityIndicator size="small" color="white"/>
            </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={submitHandler}
                style={{...styles.button, backgroundColor: '#e56767', flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Save changes</Text>
                <MaterialIcons name="navigate-next" size={26} color="white"/>
              </TouchableOpacity>
            )
            }
        </Animatable.View>
    </ScrollView>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  )
}

EditListingsScreen.navigationOptions = (data) => {
  return{
    headerShown: false
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  arrowWrap:{
    position: 'absolute',
    zIndex: 1000,
    top: height / 20,
    flex:1,
  },
  header:{
    marginBottom: height / 13,
    paddingHorizontal: 15,
  },
  headerText:{
    fontSize: 30,
    color: "white",
    fontWeight: 'bold',
  },
  bgImg:{
    flex:0.6,
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  buttonWrapper:{
    height: height / 1.6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 1,
  },
  inputTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c8b80',
  },

  card:{
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width:'90%',
    height: '85%',
    padding: 25,
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
    // flex:1
  },
  descriptionWrapper:{
    width: '90%',
    overflow: 'hidden',
    marginBottom: 15,
    // flex:1
  },
  locationWrapper:{
    // backgroundColor: 'yellow',
    width: '90%',
    overflow: 'hidden',
    marginBottom: 15,
    // flex:1
  },
  price:{
    fontSize: 16,
    color: '#666666'
  },
  pricewrapper:{
    flexDirection: 'row',
    marginTop: 20
  },
  priceTitle:{
    color: '#333333'
  },
  input: {
   width: '100%',
   height: 40,
   fontSize: 18,
   textAlign: 'left',
   // borderColor: '#d9d9d9',
   borderBottomWidth: 1,
   // color: '#848484'
},
button:{
  backgroundColor: 'white',
  height: 50,
  width: height / 3,
  marginHorizontal: 20,
  borderRadius: 35,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop:10
},
submitWrapper:{
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

export default EditListingsScreen;
