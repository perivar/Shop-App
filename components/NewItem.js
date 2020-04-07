import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { addListing } from '../store/actions/products'
import { useDispatch, useSelector } from 'react-redux'

const NewItem = props => {
  const dispatch = useDispatch()
  const currentState = useSelector(state => state.allProducts.products)

  const [nameHolder, setNameHolder] = useState("Add your Title")
  const [priceHolder, setPriceHolder] = useState(500)
  const [descHolder, setDescHolder] = useState("Add your Description")
  const [locationHolder, setLocationHolder] = useState("Add your Location")

  const submitChanges = () => {
    const lastElement = currentState.pop()
    const newId = lastElement.id + 1

    let objectReturn = addListing("p7", nameHolder, descHolder)
    dispatch(objectReturn)
    props.navigation.popToTop();
  }

  console.log(currentState);

  return(
    <View style={styles.container}>
      <View style={styles.card}>
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
             placeholder="Give me a title"
             clearTextOnFocus={true}
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
            Location
          </Text>
          <TextInput
             style = {styles.input}
             onChangeText={text => setLocationHolder(text)}
             selectionColor = "#9a73ef"
             placeholder="Place me somewhere"
             textAlign="left"
           />
        </View>

        <View style={styles.pricewrapper}>
          <TouchableOpacity style={styles.submitWrapper} onPress={submitChanges}>
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
