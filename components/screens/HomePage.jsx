import { StatusBar } from 'expo-status-bar';

import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList, Pressable} from 'react-native';

import { useState } from 'react';


export default function HomePage({navigation}) {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([])

  //parameter automatically added into function
  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  };

  function addGoalHandler() {
    //can use enteredGoalText
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals, 
      enteredGoalText,
    ]); //update state where prev state matter
  };
  

  return (
    <View style={styles.appContainer}>
      <View style ={styles.sectionContainer}>
          <TextInput 
            style={styles.headerTextOne} 
            placeholder= "Looking for a Ride?" 
            onChangeText={goalInputHandler}
          />
          

      </View>
      <View style ={styles.sectionContainer}>
        <Pressable style={styles.biggerButton} >
          <Text>Providers</Text>
        </Pressable>
        <Pressable style={styles.biggerButton} >
          <Text>Users</Text>
        </Pressable>
        
      </View>

      <View style ={styles.sectionContainer}>
      <Pressable style={styles.footerButton} >
            <Text>Home</Text>
          </Pressable>

          <Pressable style={styles.footerButton} >
            <Text>Providers</Text>
          </Pressable>
          


        <Pressable style={styles.footerButton} >
            <Text>Users</Text>
          </Pressable>
        
      </View>
      
    </View>
  );
}

//<CustomButton name='Providers' click = {addGoalHandler}/>
// every view uses flexbox for children & organise top to bottom (column)
// no style inheritance here (child do not have parent's style (no style cascading))

//stylesheet object styles
const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    

    flex: 1
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 24,
    //borderBottomWidth: 1,
    //borderBottomColor: 'grey',
    paddingHorizontal: 16,
    //flex: 1,
  },
  buttonContainer: {
    borderRadius: 10,
    width: '20%',
    margin: 10,
    borderColor: 'red',
    backgroundColor: 'blue',
    flexDirection: 'row',
    paddingHorizontal: 8,
    //alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center'
    //flex: 5,
  },
  button: {
    backgroundColor: 'yellow',
    padding: 15,
    alignItems: 'center',
    width: '30%',
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: 'green',
    height: 80,
    alignContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    colour: 'blue',
    fontWeight: 'bold',
  },
  biggerButton: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'purple',
    padding: 10,
    width: 180,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerButton: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'pink',
    padding: 10,
    width: 160,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTextOne:{
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold'
  },
  headerTextTwo:{
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
    textAlign: 'center',
    fontSize: 24
  },

  goalItem: {
    margin: 8,
    padding: 8,
    //borderRadius: 6,
    //backgroundColor: '#5e0acc',
    color: 'white',
  },
  goalText: {
    color: 'white',
  }
});
