import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Animated from 'react-native-reanimated';

import ChatItem from '../components/ChatItem';
import { RootStackScreenProps } from '../navigation/ShopNavigation';

const { width, height } = Dimensions.get('window');
const headerHeight = Platform.OS === 'ios' ? 120 : 70 + StatusBar.currentHeight;
const scrollY = new Animated.Value(0);
const headerY = Animated.interpolateNode(scrollY, {
  inputRange: [0, headerHeight],
  outputRange: [0, -headerHeight],
});
const height_logo = height * 0.4 * 0.4;

const ChatList = (props: RootStackScreenProps<'List'>) => {
  const [user, setUser] = useState<string>();
  const [animationState, setAnimationState] = useState('fadeInDown');
  const [chats, setChats] = useState<string[][]>([]);

  const fetchUserData = async () => {
    try {
      const user = await firebase.auth().currentUser;
      if (user !== null) {
        setUser(user.uid);
        await firebase
          .database()
          .ref('messages' + '/' + user.uid)
          .once('value')
          .then(function (snapshot) {
            for (var key in snapshot.val()) {
              const obj = snapshot.val()[key];
              let name: string = null;
              let img: string = null;
              for (var keys in obj) {
                name = obj[keys].name;
                img = obj[keys].img;
              }
              setChats(oldArray => [...oldArray, [key, name, img]]);
            }
          });
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  const renderChats: ListRenderItem<string[]> = itemData => {
    return (
      <ChatItem
        name={itemData.item[1]}
        img={itemData.item[2]}
        uid={itemData.item[0]}
        onSelectChat={() => {
          props.navigation.navigate('Chats', {
            uid: itemData.item[0],
            seller: itemData.item[1],
            img: itemData.item[2],
          });
        }}
      />
    );
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F5E9EA' }}>
      <Animated.View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          left: 0,
          right: 0,
          top: 0,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: headerHeight / 1.2,
          backgroundColor: '#c6f1e7',
          zIndex: 1000,
          elevation: 1000,
          transform: [{ translateY: headerY }],
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
        <LinearGradient
          start={[0.45, -0.5]}
          colors={['#fff5e8', '#cbf2e9']}
          style={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            height: '100%',
            width: '100%',
          }}
        />
        <Animatable.Text
          animation={animationState}
          duration={900}
          style={styles.welcomeText}>
          Chats
        </Animatable.Text>
        <View style={styles.header}></View>
      </Animated.View>
      <FlatList
        contentContainerStyle={{ flex: 1, marginTop: headerHeight }}
        scrollEventThrottle={16}
        numColumns={1}
        data={chats}
        renderItem={renderChats}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: headerHeight + height_logo / 3,
    shadowColor: '#8aa8a1',
    shadowRadius: 5,
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 0.2,
    paddingTop: 30,
  },
  welcomeText: {
    flex: 1,
    textAlign: 'center',
    width: '100%',
    fontSize: width / 15,
    fontWeight: 'bold',
    opacity: 1,
    color: '#254053',
    top: 55,
    left: 0,
    position: 'absolute',
  },
});

export default ChatList;
