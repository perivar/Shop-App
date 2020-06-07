import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { AsyncStorage } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import { View, Alert, Text, Dimensions, StatusBar, StyleSheet, ActivityIndicator, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'
import Animated, { Easing } from 'react-native-reanimated';
import * as Permissions from 'expo-permissions'
import * as firebase from 'firebase'
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../config'

const {width,height} = Dimensions.get('window')
const headerHeight = Platform.OS == 'ios' ? 120 : 70+StatusBar;
const scrollY = new Animated.Value(0)
const headerY = Animated.interpolate(scrollY, {
  inputRange:[0, headerHeight],
  outputRange:[0,-headerHeight]
})
const height_logo = height * 0.4 * 0.4

const ChatItem = props => {
  return (
    <View style={{flex:1, marginTop: 40}}>
      <TouchableOpacity
        onPress={() => {console.log('pressed')}}
        style={{marginTop: 20, height: height / 12, backgroundColor: '#fbf7f7', borderRadius: 100, marginHorizontal: 20, flexDirection: 'row'}}>
        <View style={{justifyContent: 'center'}}>
          <Image
            style={{width: 70, height: height / 12, borderRadius: 100}}
            source={{uri: props.img}} />
        </View>
        <View style={{justifyContent: 'center', paddingLeft: 30}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{props.name}</Text>
        </View>
        <View style={{justifyContent: 'center', marginLeft: 100}}>
          <MaterialIcons name="navigate-next" size={26} color="black"/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default ChatItem
