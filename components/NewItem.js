import React, { useState, useReducer } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { addListing } from '../store/actions/products'
import { useDispatch, useSelector } from 'react-redux'
import Input from './Input'

// const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

// const formReducer = (state, action) => {
//   if(action.type === FORM_INPUT_UPDATE){
//
//     const updatedValues = {
//       ...state.inputValues,
//       [action.input]: action.value
//     };
//     const updatedvalidity = {
//       ...state.inputValidity,
//       [action.input]: action.isValid
//     }
//     let updatedFormIsValid = true;
//     for(const key in updatedvalidity){
//       updatedFormIsValid = updatedFormIsValid && updatedvalidity[key];
//
//     }
//
//     return { formIsValid: updatedFormIsValid, inputValues: updatedValues, inputValidity: updatedvalidity}
//   }
//   return state;
// }

const NewItem = props => {

  const dispatch = useDispatch()

  const currentState = useSelector(state => state.allProducts.products)

//   const [formState, dispatchFormState] = useReducer(formReducer, {
//     inputValues: {
//     name: 'Add title',
//     price: 500,
//     description: 'Add your description',
//     location: 'Add location of product'
//   },
//   inputValidity: {
//     name: false,
//     price: true,
//     description: false,
//     location:false
//   },
//   formIsValid: {
//     formIsValid: false
//   }}
// )

  const [nameHolder, setNameHolder] = useState("Add your Title")
  const [priceHolder, setPriceHolder] = useState(500)
  const [descHolder, setDescHolder] = useState("Add your Description")
  const [locationHolder, setLocationHolder] = useState("Add your Location")
  const [imgHolder, setImgHolder] = useState("Add your image")

  const submitChanges = () => {
    let objectReturn = addListing(nameHolder, descHolder, priceHolder, imgHolder)
    dispatch(objectReturn)
    props.navigation.popToTop();
  }

  // const textChangeHandler = (inputId, text) => {
  //   let isValid= false;
  //   if(text.trim().length > 0){
  //     isValid = true;
  //   }
  //   dispatchFormState({type: FORM_INPUT_UPDATE, value: text, isValid: isValid, input: inputId })
  // }

  return(

    <KeyboardAvoidingView
      style={{ flex: 1 }}
    >
      <View style={styles.compWrapper}>
        <View style={styles.container}>
          <View style={styles.card}>
            <ScrollView>
              <Text style={styles.title}>
                Your New Product!
              </Text>
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

              <View style={styles.locationWrapper}>
                <Text style={styles.text}>
                  Image
                </Text>
                <TextInput
                   style = {styles.input}
                   onChangeText={text => setImgHolder(text)}
                   selectionColor = "#9a73ef"
                   placeholder="Add your image"
                   textAlign="left"
                 />
              </View>
              <View style={styles.pricewrapper}>
                <TouchableOpacity style={styles.submitWrapper} onPress={submitChanges}>
                  <Text style={styles.buttonText}>Add Product</Text>
                </TouchableOpacity>
              </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compWrapper:{
    flex:1,
    flexDirection: 'row',
    // backgroundColor: 'blue',
    marginVertical: 15
    // flexDirection: 'column',
    // justifyContent:'center',
  },
  card:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width:'90%',
    height: '90%',
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
