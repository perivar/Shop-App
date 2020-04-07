import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch, useEffect, useCallback } from 'react-redux'
import { editListing } from '../store/actions/products'

const EditListingsScreen = props => {
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
  const [locationHolder, setLocationHolder] = useState(location)

  const submitChanges = () => {
    let objectReturn = editListing(productToEdit.id, nameHolder, descHolder)
    dispatch(objectReturn)
    props.navigation.popToTop();
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Your Product!
        </Text>

        <View style={styles.nameWrapper}>
          <Text style={styles.text}>
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
          <Text style={styles.text}>
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
          <Text style={styles.text}>
            Location
          </Text>
          <TextInput
             style = {styles.input}
             onChangeText={text => setLocationHolder(text)}
             selectionColor = "#9a73ef"
             value={locationHolder}
             placeholderTextColor="#333333"
             textAlign="left"
           />
        </View>

        <View style={styles.pricewrapper}>
          <TouchableOpacity style={styles.submitWrapper} onPress={submitChanges}>
            <Text style={styles.buttonText}>Save Changes</Text>
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

export default EditListingsScreen;
