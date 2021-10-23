import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Input from '../components/Input';
import UserPermissions from '../components/UserPermissions';
import firebase from '../firebase';
import { RootStackScreenProps } from '../navigation/ShopNavigation';
import { signup } from '../redux/slices/auth';
import { useAppDispatch } from '../redux/store/hooks';

const { width, height } = Dimensions.get('window');

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

type InputValues = {
  email: string;
  password: string;
  name: string;
};

type InputValidities = {
  email: boolean;
  password: boolean;
  [key: string]: boolean;
};

type State = {
  inputValues: InputValues;
  inputValidities: InputValidities;
};

type Action = {
  type: string;
  value: string;
  isValid: boolean;
  input: string;
};

const formReducer = (state: State, action: Action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const SignUpScreen = (props: RootStackScreenProps<'SignUp'>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [value, setValue] = useState<string>();
  const [passCheck, setPassCheck] = useState(false);
  const [avatar, setAvatar] = useState('baafal');
  const [uploadedImage, setUploadedImage] = useState('fill');

  const dispatch = useAppDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      name: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const avatarHandler = async () => {
    UserPermissions.getCameraPermission();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.cancelled) {
      const { uri } = result as ImageInfo;

      let cut = uri.split('ImagePicker');
      let mid = cut[1].split('/');
      let final = mid[1].split('.');
      final.pop();
      let imageName = final.join('');
      setAvatar(uri);
      uploadImage(uri, imageName);
    }
  };

  const uploadImage = async (uri: string, imageName: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('profilePictures/' + imageName);
    await ref.put(blob);
    const url = await ref.getDownloadURL();
    setUploadedImage(url);
  };

  const authHandler = async () => {
    if (passCheck === false) {
      Alert.alert('Password not the same!', error, [{ text: 'Okay' }]);
      return;
    }
    let action = signup(
      formState.inputValues.email,
      formState.inputValues.password,
      formState.inputValues.name,
      uploadedImage
    );
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(
      'formState.inputValues.password: ' + formState.inputValues.password
    );
    console.log('value: ' + value);
    if (value === formState.inputValues.password) {
      setPassCheck(true);
    }
  }, [value]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-200}
      style={styles.screen}>
      <LinearGradient
        colors={['#ffc3a0', '#ffafbd']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: height,
        }}
      />
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={styles.arrowWrap}>
          <MaterialIcons
            onPress={() => {
              props.navigation.navigate('Start');
            }}
            name="navigate-before"
            color="white"
            size={35}
          />
        </View>

        <View style={styles.header}>
          {/* <Text style={styles.headerText}>
            Let's create a profile
          </Text> */}
        </View>

        <Animatable.View animation="fadeInUpBig" style={styles.buttonWrapper}>
          <ScrollView style={styles.form}>
            <View style={{ alignItems: 'center', width: '100%' }}>
              <TouchableOpacity style={styles.avatar} onPress={avatarHandler}>
                <Image source={{ uri: avatar }} style={styles.img} />
                <Ionicons
                  size={40}
                  color="#3c8b80"
                  name="ios-add"
                  style={{ marginTop: 6 }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Text style={styles.inputTitle}>Full name</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <MaterialIcons
                    name="person-outline"
                    size={30}
                    color="#3c8b80"
                  />
                </View>
                <Input
                  id="name"
                  placeholder="Full Name"
                  keyboardType="default"
                  required
                  autoCapitalize="none"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
              </View>
            </View>
            <View style={{ height: height / 40 }}></View>
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Text style={styles.inputTitle}>Email</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <MaterialIcons
                    name="person-outline"
                    size={30}
                    color="#3c8b80"
                  />
                </View>
                <Input
                  id="email"
                  placeholder="Your email"
                  containerStyle={styles.input}
                  keyboardType="email-address"
                  required
                  email
                  autoCapitalize="none"
                  errorText="please enter valid email"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
              </View>
            </View>

            <View style={{ height: height / 40 }}></View>

            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Text style={styles.inputTitle}>Password</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <MaterialIcons
                    name="lock-outline"
                    size={30}
                    color="#3c8b80"
                  />
                </View>
                <Input
                  id="password"
                  placeholder="Your password"
                  keyboardType="default"
                  secureTextEntry
                  required
                  minLength={5}
                  autoCapitalize="none"
                  errorText="please enter valid password"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
              </View>
            </View>

            <View style={{ height: height / 30 }}></View>

            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Text style={styles.confirmTitle}>Confirm Password</Text>
              </View>
              <View style={styles.formControl}>
                <View style={styles.iconContainer}>
                  <MaterialIcons
                    name="lock-outline"
                    size={30}
                    color="#3c8b80"
                  />
                </View>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  keyboardType="default"
                  secureTextEntry
                  required
                  minLength={5}
                  autoCapitalize="none"
                  errorText="please enter valid password"
                  onInputChange={(
                    inputIdentifier,
                    inputValue,
                    inputValidity
                  ) => {
                    setValue(inputValue);
                  }}
                  value={value}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.buttonContainerTop}>
              {isLoading ? (
                <TouchableOpacity
                  onPress={authHandler}
                  style={{
                    ...styles.button,
                    backgroundColor: '#e56767',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size="small" color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={authHandler}
                  style={{
                    ...styles.button,
                    backgroundColor: '#e56767',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Sign up
                  </Text>
                  <MaterialIcons name="navigate-next" size={26} color="white" />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ height: height / 50 }}></View>
            <View style={styles.buttonContainer}>
              <Button
                title="Log in"
                color="#e56767"
                onPress={() => {
                  props.navigation.navigate('Login');
                }}
              />
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  arrowWrap: {
    top: height / 20,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    marginBottom: height / 30,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  formControl: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c8b80',
    top: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E1E2E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  confirmTitle: {
    marginVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c8b80',
  },
  iconContainer: {
    flexDirection: 'column',
    paddingRight: 10,
  },
  buttonWrapper: {
    height: height / 1.15,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 1,
    paddingVertical: 35,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'white',
    height: 60,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
  },
  input: {
    width: '100%',
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  titleContainer: {},
  buttonContainerTop: {},
  buttonContainer: {},
  form: {
    width: '100%',
  },
});

export default SignUpScreen;
