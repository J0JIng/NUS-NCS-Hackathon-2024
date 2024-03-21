import {NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './screens/HomePage';
import Users from './screens/Users';

import QuestionsForProviders from './screens/QuestionsForProviders';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName ="About">
                <Stack.Screen name = "HomePage" component={HomePage} />
                <Stack.Screen name = "Users" component={Users} />
                <Stack.Screen name = "QuestionsForProviders" component = {QuestionsForProviders} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

/*
const screens = {
    HomePage: {
        screen: HomePage
    },
    QuestionsForProviders: {
        screen: QuestionsForProviders
    },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
*/

