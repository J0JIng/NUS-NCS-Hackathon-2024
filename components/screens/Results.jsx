import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert, Text } from 'react-native';
import {styles as homeStyles} from './HomePage.jsx';

import Benson from '../../assets/Benson.jsx'


export default function Users ({navigation}) {
  const pressHandler = () => {
    navigation.goBack();
  }

  //use state functions for the rnpicker and the dropdowns

  return (
    <View style={styles.container}>
        <View style ={styles.sectionContainer}>
          <Benson width={200} height={200} fill="black" />
        </View>
        <Text style={homeStyles.text}>based on your requirements...</Text>
        <Text style={styles.resultstext}>results from json file</Text>
    

      <View styles={styles.time}>
        <Button title= 'back to questions screen' onPress={pressHandler}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F9FF',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 16,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginRight: 10,
  },
  selectedTime: {
    fontSize: 18,
    marginTop: 10,
  },
  resultstext: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24,
    textAlign: 'center'
  },
});