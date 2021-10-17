import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const headerHeight = Platform.OS === 'ios' ? 120 : 70 + StatusBar.currentHeight;
const scrollY = new Animated.Value(0);
const headerY = Animated.interpolateNode(scrollY, {
  inputRange: [0, headerHeight],
  outputRange: [0, -headerHeight],
});

export interface ChatItemProps {
  name: string;
  img: string;
  uid: string;
  onSelectChat(event: GestureResponderEvent): void;
}

const ChatItem: React.FC<ChatItemProps> = props => {
  return (
    <Animatable.View animation="fadeInRight" duration={600}>
      <TouchableOpacity
        onPress={props.onSelectChat}
        style={{
          marginTop: 20,
          height: height / 12,
          backgroundColor: '#fbf7f7',
          borderRadius: 100,
          marginHorizontal: 20,
          flexDirection: 'row',
        }}>
        <View style={{ justifyContent: 'center' }}>
          <Animatable.Image
            animation="bounceIn"
            duration={600}
            delay={200}
            style={{ width: 70, height: height / 12, borderRadius: 100 }}
            source={{ uri: props.img }}
          />
        </View>
        <View style={{ justifyContent: 'center', paddingLeft: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{props.name}</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            marginRight: 10,
            alignItems: 'flex-end',
          }}>
          <MaterialIcons name="navigate-next" size={26} color="black" />
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default ChatItem;
