import {NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './screens/HomePage';
import Questionnaire from './screens/Questionnaire';
import Results from './screens/Results';

import QuestionsForProviders from './screens/QuestionsForProviders';
//import Questionnaire from './screens/Questionnaire';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName ="About">
                <Stack.Screen name = "HomePage" component={HomePage} />
                <Stack.Screen name = "Questionnaire" component={Questionnaire} />
                <Stack.Screen name = "Results" component={Results} />
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
when
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
*/

