import React, { useState, useReducer } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, TextInput } from 'react-native';

const Input = props => {
  return(
    <View style={styles.nameWrapper}>
      <Text style={styles.text}>
        {props.label}
      </Text>
      <TextInput
        {...props}
         style = {styles.input}
         onChangeText={textChangeHandler.bind(this, 'name')}
         selectionColor = "#9a73ef"
       />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default Input;
