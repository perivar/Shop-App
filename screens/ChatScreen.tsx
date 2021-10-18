import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { RootStackScreenProps } from '../navigation/ShopNavigation';

interface Message {
  name: string;
  img: string;
  message: string;
  time: any;
  from: string;
}

const AnimatableTouchableOpacity =
  Animatable.createAnimatableComponent(TouchableOpacity);
const AnimatableTextInput = Animatable.createAnimatableComponent(TextInput);

const { width, height } = Dimensions.get('window');
const headerHeight = Platform.OS === 'ios' ? 120 : 70 + StatusBar.currentHeight;

const isIOS = Platform.OS === 'ios';

const ChatScreen = (props: RootStackScreenProps<'Chats'>) => {
  const name = props.route.params?.seller;
  const imageProps = props.route.params?.img;

  const [user, setUser] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [userPic, setUserPic] = useState<string>();
  const [userMessageTo, setUserMessageTo] = useState<string>();
  const [sellerName, setSellerName] = useState<string>();
  const [sellerPic, setSellerPic] = useState<string>();

  // const [messages, setMessages] = useState<string[]>([]);
  const [messageText, setMessage] = useState<string>();
  const [messageList, setMessageList] = useState<Message[]>([]);

  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const bottomPadding = useRef(new Animated.Value(60)).current;
  const listRef = useRef(null);

  const sendMessage = async () => {
    if (messageText.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(user)
        .child(userMessageTo)
        .push().key;
      let updates: any = {};

      let message: Message = {
        name: sellerName,
        img: sellerPic,
        message: messageText,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: user,
      };
      let message2: Message = {
        name: userName,
        img: userPic,
        message: messageText,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: user,
      };

      updates['messages/' + user + '/' + userMessageTo + '/' + msgId] = message;
      updates['messages/' + userMessageTo + '/' + user + '/' + msgId] =
        message2;

      firebase.database().ref().update(updates);

      setMessage('');
    }
  };

  const convertTime = (time: Date) => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + '.' + d.getMonth() + ' - ' + result;
    }
    return result;
  };

  const fetchUserData = async () => {
    try {
      const user = await firebase.auth().currentUser;
      const userImg = user.photoURL;
      const user2 = await props.route.params?.uid;
      const img = await props.route.params?.img;
      const seller = props.route.params?.seller;

      if (user !== null) {
        setUser(user.uid);
        setUserPic(userImg);
        setUserName(user.displayName);
        setUserMessageTo(user2);
        setSellerName(seller);
        setSellerPic(img);

        await firebase
          .database()
          .ref('messages')
          .child(user.uid)
          .child(user2)
          .on('child_added', value => {
            setMessageList(prevState => {
              return [...prevState, value.val()];
            });
          });
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  const renderRow: ListRenderItem<Message> = itemData => {
    return (
      <Animatable.View
        animation="fadeInRight"
        duration={600}
        delay={300}
        style={{
          flexDirection: 'column',
          maxWidth: '70%',
          minWidth: '20%',
          padding: 2,
          alignSelf: itemData.item.from === user ? 'flex-end' : 'flex-start',
          backgroundColor: itemData.item.from === user ? '#44bda1' : '#7f7f7f',
          borderRadius: 5,
          margin: 10,
        }}>
        <Text style={{ color: '#fff', padding: 7, fontSize: 16 }}>
          {itemData.item.message}
        </Text>
        <Text style={{ color: '#eee', opacity: 0.7, padding: 3, fontSize: 12 }}>
          {convertTime(itemData.item.time)}
        </Text>
      </Animatable.View>
    );
  };

  const keyboardEvent = (event: any, isShow: boolean) => {
    let heightOS = isIOS ? 0 : 80;
    let bottomOS = isIOS ? 60 : 140;
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: isShow ? heightOS : 0,
        useNativeDriver: false,
      }),
      Animated.timing(bottomPadding, {
        duration: event.duration,
        toValue: isShow ? bottomOS : 60,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    fetchUserData();
    Keyboard.addListener(isIOS ? 'keyboardWillShow' : 'keyboardDidShow', e =>
      keyboardEvent(e, true)
    );
    Keyboard.addListener(isIOS ? 'keyboardWillHide' : 'keyboardDidHide', e =>
      keyboardEvent(e, false)
    );
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior="height" style={{ height: '100%' }}>
      <Animated.View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          left: 0,
          right: 0,
          top: 0,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: headerHeight / 1.3,
          backgroundColor: '#c6f1e7',
          zIndex: 1000,
          elevation: 1000,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('List');
          }}
          style={styles.backButton}>
          <Ionicons size={26} name="ios-arrow-back" color="#254053" />
        </TouchableOpacity>
        <View
          style={{
            marginTop: height / 30,
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <Animatable.Image
              animation={'fadeInDown'}
              duration={900}
              style={{ width: 40, height: height / 20, borderRadius: 100 }}
              source={{ uri: imageProps }}
            />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Animatable.Text
              animation={'fadeInDown'}
              duration={900}
              style={styles.welcomeText}>
              {name}
            </Animatable.Text>
          </View>
        </View>
        <View style={styles.header}></View>
      </Animated.View>
      <Animated.View style={[styles.bottomBar, { bottom: keyboardHeight }]}>
        <AnimatableTextInput
          animation={'fadeInUp'}
          duration={900}
          keyboardType="default"
          style={styles.input}
          value={messageText}
          onSubmitEditing={Keyboard.dismiss}
          onChangeText={text => setMessage(text)}
        />
        <AnimatableTouchableOpacity
          animation={'fadeInRight'}
          duration={900}
          style={styles.buttonWrap}
          onPress={sendMessage}>
          <View style={styles.buttonWrapper}>
            <MaterialIcons size={20} name="send" color="white" />
          </View>
        </AnimatableTouchableOpacity>
      </Animated.View>
      <FlatList
        ref={listRef}
        onContentSizeChange={() =>
          listRef.current.scrollToEnd({ animated: true })
        }
        onLayout={() => listRef.current.scrollToEnd({ animated: true })}
        style={{ paddingHorizontal: 5, top: headerHeight / 1.3 }}
        data={messageList}
        renderItem={renderRow}
        ListFooterComponent={
          <Animated.View style={{ height: bottomPadding }} />
        }
        keyExtractor={(item, index) => index.toString()}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    top: height / 20,
    left: width / 30,
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  buttonWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: 60,
  },
  buttonWrapper: {
    backgroundColor: '#e56767',
    borderRadius: 100,
    padding: 8,
    flexDirection: 'row',
  },
  input: {
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    fontSize: 16,
    backgroundColor: '#fff',
    height: height / 20,
    borderRadius: 15,
  },
  welcomeText: {
    marginLeft: 20,
    width: '100%',
    fontSize: width / 20,
    fontWeight: 'bold',
    opacity: 1,
    color: '#254053',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
