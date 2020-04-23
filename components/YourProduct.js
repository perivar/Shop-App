import React from 'react'
import { View, Image, Text, StyleSheet, Button, FlatList, TouchableOpacity, Platform, TouchableNativeFeedback, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { removeListing } from '../store/actions/products'
import { addListing } from '../store/actions/products'

const YourProduct = props => {

  // const deleteHandler = () => {
  //   Alert.alert(
  //     props.name,
  //     'Are your sure you want to delete ' + props.name + '?',
  //     [
  //       {text: 'Yes', style: 'destructive' ,onPress: () => {
  //         const productId = props.onDeleteProduct();
  //         let objReturn = removeListing(productId);
  //         dispatch(objReturn);
  //       }},
  //       {text: 'No', style: 'default'},
  //     ],
  //     { cancelable: false }
  //   )
  // }

  const dispatch = useDispatch()

  return(
    <View style={styles.container}>
      <View style={styles.itemContainer}>

        <View style={styles.top}>
          <View style={styles.pictureWrap}>
            <Image source={{uri: props.img}} style={styles.productImg}/>
          </View>
          <View style={styles.middle}>
            <Text style={styles.middleText}>
              {props.name}
            </Text>
            <View style={styles.middlecontent}>
              <Text style={styles.price}>
                {props.price} NOK
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottom}>

            <TouchableOpacity style={styles.leftBottom} onPress={() => {
              const productId = props.onDeleteProduct();
              let objReturn = removeListing(productId);
              dispatch(objReturn);
            }}>
              <MaterialIcons style={styles.trashIcon} name="delete-forever" size={25} color="#254053" />
              <Text style={styles.removeText}>
                REMOVE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rightBottom} onPress={props.onSelectProduct}>
              <MaterialIcons style={styles.trashIcon} name="mode-edit" size={20} color="#254053" />
              <Text style={styles.productText}>
                EDIT LISTING
              </Text>
            </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer:{
    flexDirection: 'column',
    backgroundColor: '#C0D3C7',
    height: 200,
    paddingTop: 23,
    paddingHorizontal: 23,
    width:'96%',
    borderRadius: 5,
    margin: 4,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
     width: 0,
     height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 3,
  },
  pictureWrap:{
    flex:1,
    maxWidth: 100,
    maxHeight: 100,
    borderRadius: 5,
    overflow: 'hidden',
  },
  productImg:{
    height: '100%',
    width: '100%',
    opacity: 1
  },
  top:{
    flexDirection: 'row',
  },
  middle:{
    flex:1,
  },
  middleText:{
    flex:1,
    marginLeft: 20,
    marginTop: 2,
    fontWeight: '900',
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#23211f',
  },
  middlecontent:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 5,
    marginLeft: 20,
  },
  price:{
    fontSize: 18,
    opacity: 0.9,
    marginRight: 15
  },
  bottom:{
    flex:1,
    flexDirection: 'row',
  },
  leftBottom:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeText:{
    opacity: 0.6,
    marginLeft: 5,
    fontSize: 14,
    color: '#254053'
  },
  trashIcon:{
    opacity: 0.6
  },
  productText:{
    opacity: 0.6,
    marginLeft: 5,
    fontSize: 14,
    color: '#254053'
  },
  rightBottom:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})

export default YourProduct;
