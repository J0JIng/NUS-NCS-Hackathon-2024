import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomePage from './screens/HomePage';
import Providers from './screens/Providers';
import Users from './screens/Users';
import QuestionsForProviders from './screens/QuestionsForProviders';
import RightNow from './screens/RightNow';


//Screen names
const homeName = "HomePage";
const providersName = "ProvidersPage";
const usersName = "UsersPage";
const questionsName = "QuestionsForProviders";
const rightNow ="RightNow";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === providersName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === usersName) {
              iconName = focused ? 'settings' : 'settings-outline';
            } 

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomePage} />
        <Tab.Screen name={providersName} component={Providers} />
        <Tab.Screen name={usersName} component={Users} />
        <Tab.Screen name={questionsName} component={QuestionsForProviders} />
        <Tab.Screen name={rightNow} component={RightNow} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;