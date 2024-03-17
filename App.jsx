
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './components/LandingPage';
import Providers from './components/Providers';
import Users from './components/Users';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.screen name = "LandingPage" component={LandingPage}/>
        <Stack.screen name="Providers" component={Providers} />
        <Stack.screen name="Users" component={Users} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};


export default App;
