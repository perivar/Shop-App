import React, { useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/actions/products'
import Card from '../components/Card'
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get('window')

const ProductDetailScreen = props => {
  const dispatch = useDispatch();
  const name = props.navigation.getParam('name')
  const price = props.navigation.getParam('price')
  const productId = props.navigation.getParam('productId')
  const user = props.navigation.getParam('user')
  const image = props.navigation.getParam('url')
  const description = props.navigation.getParam('description')
  const seller = props.navigation.getParam('seller')
  const profileImageUrl = props.navigation.getParam('profilePic')
  console.log(profileImageUrl);
  const location = props.navigation.getParam('location')

  return (
    <View style={{flex:1, backgroundColor: '#F5E9EA', justifyContent: 'flex-end'}}>
        <Animatable.Text
          animation="fadeInRight"
          delay={200}
          duration={300}
          numberOfLines={1}
          style={styles.price}>{price} NOK
        </Animatable.Text>
        <View style={styles.arrowWrap}>
          <MaterialIcons onPress={() => {props.navigation.navigate("Homescreen")}} name="navigate-before" color="white" size={35}/>
        </View>
        <View style={{position: 'absolute',top: height / 20 ,bottom: 0,left: 0,right: 0, borderTopRightRadius: 30, alignItems: 'center'}}>
          <Animatable.Image
            animation="fadeInUpBig"
            duration={400}
            source={{uri: image}}
            style={styles.bgImg}
          >
          </Animatable.Image>
        </View>
      <Animatable.View
        animation="slideInUp"
        duration={400}
        style={styles.buttonWrapper}>
        <View style={styles.titleDescWrap}>
          <Text style={styles.titleText}>{name}</Text>
          <Text style={styles.descText}>{description}</Text>
        </View>
        <View style={styles.middleSection}>
          <View style={styles.locationWrapper}>
            <MaterialIcons style={styles.locationIcon} name="location-on" size={32} color="#254053"/>
            <View style={styles.pictureWrapper}>
              <Image source={{uri: profileImageUrl}} style={styles.profilePic} />
            </View>
          </View>

          <View style={styles.profileWrapper}>
              <Text style={styles.location}>
                {location}
              </Text>
                <Text style={styles.seller}>{seller}</Text>
          </View>
        </View>
          <TouchableOpacity
            onPress={() => {
              let objectReturn = addToCart(productId);
              dispatch(objectReturn);
              props.navigation.navigate("Cart")
            }}
            style={{...styles.button, backgroundColor: '#e56767', flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Add to cart</Text>
            <MaterialIcons name="navigate-next" size={26} color="white"/>
          </TouchableOpacity>
      </Animatable.View>
    </View>
)}

ProductDetailScreen.navigationOptions = (data) => {
  return{
    headerShown: false
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5E9EA',
  },
  top:{
    flex:1,
  },
  arrowWrap:{
    position: 'absolute',
    zIndex: 1000,
    top: height / 20,
    flex:1,
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height / 5
  },
  price:{
    fontSize: 26,
    bottom: height / 3.3,
    zIndex: 1000,
    right: 1,
    position: 'absolute',
    fontWeight: '300',
    color: "white",
    fontWeight: 'bold',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  buttonWrapper:{
    height: height / 2.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 1,
  },
  titleDescWrap:{
    width: '100%',
    paddingVertical: 20,
  },
  titleText:{
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3c8b80',
    marginHorizontal: 30,
  },
  descText:{
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    marginVertical: 20,
    marginHorizontal: 30,
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
  buttonContainerTop:{
    marginTop: 30
  },
  buttonContainer:{
    marginTop: 15
  },
  gradient:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer:{
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  },
    middleSection:{
      flex:1,
      height: '100%',
      flexDirection: 'row',
    },
    locationWrapper:{
      flex:0.2,
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: 10,
      paddingLeft: 16,
    },
    location:{
      fontWeight: '800',
      marginLeft: 10,
      marginBottom: 25,
      fontSize: 16,
      opacity: .7
    },
    locationIcon:{
      marginLeft: 6,
      marginBottom: 5
    },
    profilePic:{
      height: '100%',
      width: '100%',
      borderRadius: 400,
      opacity: 1
    },
      profileWrapper:{
        flex:1,
        flexDirection: 'column',
        overflow: 'hidden',
        justifyContent: 'center',
        paddingLeft: 10
      },
      pictureWrapper:{
        maxWidth: 45,
        maxHeight: 45,
        overflow: 'hidden',
      },
})

export default ProductDetailScreen;
