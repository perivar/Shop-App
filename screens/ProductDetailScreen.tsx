import React, { useEffect, useCallback, useState} from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ImageBackground, Image, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/actions/products'
import Card from '../components/Card'
import * as Animatable from 'react-native-animatable';
import AwesomeAlert from 'react-native-awesome-alerts';

const {width,height} = Dimensions.get('window')

const ProductDetailScreen = props => {
  // console.log(props);
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState()
  const [profileImageUrl, setProfileImageUrl] = useState()
  const [userId, setUserId] = useState()
  const [showAlert, setShowAlert] = useState(false)

  const fetchImages = async() => {
    setIsLoading(true)
    const image = await props.navigation.getParam('url')
    const profileImageUrl = await props.navigation.getParam('profilePic')
    const userId = await props.navigation.getParam('uid')
    const seller = await props.navigation.getParam('seller')

    if (profileImageUrl && image){
      setIsLoading(false)
      setImage(image);
      setProfileImageUrl(profileImageUrl);
      setUserId(userId)
    }
  }

  const popAlert = () => {
    setShowAlert(true)
  }

  const hideAlert = () => {
    setShowAlert(false)
  }

  const handleSendMessage = async () => {
    await hideAlert()
    props.navigation.navigate("Chats", {
      uid: userId,
      img: profileImageUrl,
      seller: seller
    })
  }

  useEffect(() => {
    fetchImages()
  },[])

  const dispatch = useDispatch();

  const name = props.navigation.getParam('name')
  const price = props.navigation.getParam('price')
  const productId = props.navigation.getParam('productId')

  const description = props.navigation.getParam('description')
  const seller = props.navigation.getParam('seller')

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
            <View style={{position: 'absolute',top: 0,bottom: 0,left: 0,right: 0, borderTopRightRadius: 30, alignItems: 'center'}}>
            <Animatable.Image
            animation="fadeInUp"
            duration={600}
            delay={100}
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
            <TouchableOpacity onPress={popAlert}>
            <View style={styles.pictureWrapper}>
              <Animatable.Image
                animation="fadeIn"
                duration={1000}
                delay={100}
                source={{uri: profileImageUrl}}
                style={styles.profilePic} />
            </View>
          </TouchableOpacity>
          </View>


          <View style={styles.profileWrapper}>
              <Text style={styles.location}>
                {location}
              </Text>
              <TouchableOpacity onPress={popAlert} style={{ width: width / 1.5}}>
                <Text style={styles.seller}>{seller}</Text>
              </TouchableOpacity>
          </View>
        </View>
          <TouchableOpacity
            onPress={() => {
              let objectReturn = addToCart(productId);
              dispatch(objectReturn);
              props.navigation.navigate("Cart")
            }}
            style={{...styles.button, backgroundColor: '#e56767', flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Buy</Text>
            <MaterialIcons name="navigate-next" size={26} color="white"/>
          </TouchableOpacity>
      </Animatable.View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        alertContainerStyle={{zIndex: 1000}}
        customView={<Ionicons name="ios-chatbubbles" size={50} />}
        titleStyle={{fontSize: 30}}
        messageStyle={{fontSize: 15}}
        cancelButtonStyle={{marginRight: 5, paddingVertical: 15, paddingHorizontal: 25}}
        confirmButtonStyle={{marginLeft: 5, paddingVertical: 15, paddingHorizontal: 20}}
        cancelButtonTextStyle={{fontSize: 16}}
        confirmButtonTextStyle={{fontSize: 16}}
        message={"Send a message to " + seller + " ?"}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Go back"
        confirmText={"Yes, lets chat!"}
        confirmButtonColor="#e56767"
        onCancelPressed={() => {
          hideAlert();
        }}
        onConfirmPressed={handleSendMessage}
      />
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
    bottom: height / 2.99,
    zIndex: 1000,
    right: 1,
    position: 'absolute',
    fontWeight: '300',
    color: "white",
    fontWeight: 'bold',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  buttonWrapper:{
    height: height / 2.5,
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
    flex:0.6,
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
    seller:{
      marginLeft: 10,
      opacity: 0.6,
      fontSize: 14,
      fontWeight: 'bold'
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
