
import React from 'react';


import { useState } from 'react';

import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './components/screens/LandingPage';
import QuestionsForProviders from './components/QuestionsForProviders';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="QuestionsForProviders" component={QuestionsForProviders} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


export default App;
