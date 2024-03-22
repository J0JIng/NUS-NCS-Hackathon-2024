import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useState } from 'react';

import Benson from '../../assets/Benson.jsx'

export default function HomePage({navigation}) {
<<<<<<< HEAD
/*const pressHandler1 = () => {
  navigation.push('Users');
}*/
=======
const pressHandler1 = () => {

  navigation.navigate('Users')
  //navigation.push('Users');
}
const pressHandler2 = () => {
  navigation.navigate('QuestionsForProviders')
  //navigation.push('QuestionsForProviders');
}
>>>>>>> refs/remotes/origin/jp

  return (
    <View style={styles.appContainer}>
      <View style ={styles.sectionContainer}>
        <Benson width={300} height={300} fill="black" />
      </View>

      <View style={styles.sectionContainer}>
        <Pressable onPress={() => navigation.navigate('Questionnaire')}>
          <Text style={styles.text}>looking for a ride?</Text>
        </Pressable>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#EAF0FF',
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 64,
    fontWeight: 'bolder',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
