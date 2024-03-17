
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './components/screens/LandingPage';

const App = () => {
  return (
    <NavigationContainer>
      <Button title = "App" onPress={() => navigation.navigate('LandingPage')} />
    </NavigationContainer>
  );
};


export default App;
