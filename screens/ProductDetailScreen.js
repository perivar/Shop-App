import React, { useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/actions/products'

const ProductDetailScreen = props => {
  const dispatch = useDispatch();

  const name = props.navigation.getParam('name')
  const price = props.navigation.getParam('price')
  const productId = props.navigation.getParam('productId')
  const user = props.navigation.getParam('user')
  const image = props.navigation.getParam('url')
  const description = props.navigation.getParam('description')
  const seller = props.navigation.getParam('seller')
  const profileImageUrl = 'https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg';
  const location = 'Lillehammer, Norway'
  
  return (
  <View style={styles.container}>
    <View style={styles.productCard}>
      <View style={styles.textwrap}>
        <Text style={styles.title}>
          {name}
        </Text>
        <View style={styles.descWrapper}>
          <Text style={styles.desc}>
            {description}
          </Text>
        </View>
      </View>

      <View style={styles.imageWrapper}>
        <ImageBackground source={{uri: image}} style={styles.bgImg}>
        </ImageBackground>
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


      <View style={styles.bottomOfCard}>
        <View style={styles.left}>
          <Text style={styles.price}>
            {price} NOK
          </Text>
        </View>
          <View style={styles.right}>
            <TouchableOpacity style={styles.cartWrapper} onPress={() => {
              let objectReturn = addToCart(productId);
              dispatch(objectReturn);
            }}>
                <Text style={styles.buttonText}>Add to cart</Text>
            </TouchableOpacity>
          </View>
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
  productCard:{
    backgroundColor: '#f5f5f5',
    width:'90%',
    height: '85%',
    paddingTop: 25,
    paddingBottom: 25,
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
  textwrap:{
    flexDirection: 'column',
    alignItems: 'center',
  },
  descWrapper:{
    width: '80%',
  },
  desc:{
    fontSize: 17,
    opacity: .8,
    maxWidth: '100%',
    marginBottom: 20,
    textAlign: 'center'
  },
  title:{
    textAlign: 'center',
    fontWeight: '900',
    textTransform: 'uppercase',
    fontSize: 30,
    color: '#23211f',
    marginBottom: 5
  },
  imageWrapper:{
    height:170,
    overflow: 'hidden'
  },
  bgImg:{
    width: '100%',
    height: '100%',
  },
  middleSection:{
    height: 100,
    flexDirection: 'row',
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
  textholder:{
    flex:0.97,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
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
  seller:{
    marginLeft: 10,
  },
  bottomOfCard:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f4f4f4'
  },
  left:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  right:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  price:{
    color: '#00588C',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cartWrapper:{
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
  },
  text:{
    color:'black'
  }
})

export default ProductDetailScreen;
