import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';

const SettingsScreen = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        The Settings screen
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    color: 'black'
  },
})

export default SettingsScreen;
