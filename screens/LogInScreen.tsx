import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Input from '../components/Input';
import { RootStackScreenProps } from '../navigation/ShopNavigation';
import { login } from '../redux/slices/auth';
import { useAppDispatch } from '../redux/store/hooks';

const { width, height } = Dimensions.get('window');

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

type InputValues = {
  email: string;
  password: string;
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

const LogInScreen = (props: RootStackScreenProps<'Login'>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const dispatch = useAppDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
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

  const authHandler = async () => {
    let action = login(
      formState.inputValues.email,
      formState.inputValues.password
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

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      console.log(
        'loginscreen id: ' +
          inputIdentifier +
          ' ' +
          inputValue +
          ' ' +
          inputValidity
      );

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
        colors={['#80d0c7', '#13547a']}
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
          <Text style={styles.headerText}>Hey, let's sign you in</Text>
        </View>

        <Animatable.View animation="fadeInUpBig" style={styles.buttonWrapper}>
          <ScrollView style={styles.form}>
            <Text style={styles.inputTitle}>Email</Text>
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

            <View style={{ height: height / 25 }}></View>

            <View style={styles.cont}>
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
                    Log in
                  </Text>
                  <MaterialIcons name="navigate-next" size={26} color="white" />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ height: height / 50 }}></View>
            <View style={styles.buttonContainer}>
              <Button
                title="Sign Up"
                color="#e56767"
                onPress={() => {
                  props.navigation.navigate('SignUp');
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
  cont: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    marginBottom: height / 13,
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c8b80',
    top: 15,
  },
  iconContainer: {
    flexDirection: 'column',
    paddingRight: 10,
  },
  buttonWrapper: {
    height: height / 1.4,
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
  form: {
    width: '100%',
  },
  titleContainer: {},
  input: {},
  buttonContainerTop: {},
  buttonContainer: {},
});

export default LogInScreen;
