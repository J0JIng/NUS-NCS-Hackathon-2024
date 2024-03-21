import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable, ScrollView } from 'react-native';
import LocationDropdownComponent from '../dropdowncomponents/LocationDropdownComponent';
import DateDropdownComponent from '../dropdowncomponents/DateDropdownComponent';
import TimeDropdownComponent from '../dropdowncomponents/TimeDropdownComponent';
import HomeDropdownComponent from '../dropdowncomponents/HomeDropdownComponent';

import {styles} from './HomePage.jsx';
import Benson from '../../assets/Benson.jsx'

export default function QuestionsForProviders ({navigation}) {
    //state
    const [userSelection, setUserSelection] = useState('');
    const [finalUserSelection, setFinalUserSelection] = useState([])
    const [homeLocation, setHomeLocation] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');

    //parameter automatically added into function
    function keepUserSelection(selectedOption) {
        setUserSelection(selectedOption);
    };

    function addUserSelection() {
        //can use userSelection
        setFinalUserSelection(currentCourseGoals => [
        ...currentCourseGoals, 
        userSelection,
        ]); //update state where prev state matter
    };
    /*const saveUserSelectionsToJsonFile = async () => {
        try {
            const path = RNFS.DocumentDirectoryPath + '/userSelections.json';

            const userSelections = {
                homeLocation,
                eventLocation,
                eventDate,
                eventTime,
            };

            // Assuming you want to overwrite the file each time; 
            // if appending data, you'd first read the file, modify the data, and then write it.
            await RNFS.writeFile(path, JSON.stringify(userSelections, null, 2), 'utf8');

            alert('Selections saved successfully!');
        } catch (error) {
            console.error('Failed to save selections: ', error);
            alert('Failed to save selections.');
        }
    };*/

    /*i want to do this but keepUserSelection/addUserSelection are instance methods (?) and 
    Picker in Dropdown Component has onValueChange but Dropdown Component doesn't*/
    //onValueChange={keepUserSelection(itemName) && addUserSelection(itemName)
    //User's Selection below was supposed to show what the user chose from the dropdown menu temporarily

    return (
        <View style = {styles.appContainer}>
            <View style ={styles.sectionContainer}>
                <Benson width={200} height={200} fill="black" />
            </View>

            <View style ={questionsStyles.sectionContainer}>
                <View style = {questionsStyles.header}>
                    <Text>Please answer the following questions</Text>
                </View>
                <View style = {questionsStyles.questionContainerWithBorder}>
                    <Text style = {questionsStyles.questionText}>"Home" Location</Text>
                    <HomeDropdownComponent></HomeDropdownComponent>
                </View>

                <View style = {questionsStyles.questionContainerWithBorder}>
                    <Text style = {questionsStyles.questionText}>Event Location</Text>
                    <LocationDropdownComponent/>
                </View>
                <View style = {questionsStyles.questionContainerWithBorder}>
                <Text style = {questionsStyles.questionText}>Date & Time</Text>
                    <View style = {questionsStyles.dateTimeContainer}>
                        <DateDropdownComponent/>
                        <TimeDropdownComponent/>
                    </View>
                </View>
            </View>
        </View>

    );
};

const questionsStyles = StyleSheet.create({

    sectionContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 24,
        //borderBottomWidth: 1,
        //borderBottomColor: 'grey',
        paddingHorizontal: 16,
    },

    questionContainerWithBorder: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 8,
        width: 200,
    },

    questionText: {
        textAlign: 'center'
    },

    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },

    container: {
        flex: 1,
        margin: 20,
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginBottom: 24, 
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'grey',
        width: '70%',
        marginRight: 8,
        padding: 8
    },
    goals: {
        flex: 5
    },
    goalItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
        padding: 8,
        color: 'white'
    },
});



