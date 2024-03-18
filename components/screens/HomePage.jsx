import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useState } from 'react';

import Benson from '../../assets/Benson.jsx'

export default function HomePage({navigation}) {
  /*const [enteredGoalText, setEnteredGoalText] = useState('');
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
*/
  return (
    <View style={styles.appContainer}>
      <View style={styles.topHalf}>
        <View style ={styles.sectionContainer}>
          <Benson width={200} height={200} fill="black" />
        </View>

        <View style ={styles.sectionContainer}>
            <Text style={styles.text}>looking for a ride?</Text>
        </View>
      </View>

      <View style ={styles.sectionContainer}>
        <Pressable style={styles.providers} >
          <Text style={styles.buttonText}>Providers</Text>
        </Pressable>

        <Pressable style={styles.users} >
          <Text style={styles.buttonText}>Users</Text>
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
  topHalf: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1
  },
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1
  },
  bottomHalf: {

  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 24,
    //borderBottomWidth: 1,
    //borderBottomColor: 'grey',
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: 'Montserrat_700Bold',
    fontWeight: 'bold',
    fontSize: 48,
    textAlign: 'center'
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
  /*button: {
    backgroundColor: 'yellow',
    padding: 15,
    alignItems: 'center',
    width: '30%',
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: 'green',
    height: 80,
    alignContent: 'center',
  },*/
  buttonText: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24,
    colour: '#EAF0FF',
    fontWeight: 'bold',
  },
  providers: {
    backgroundColor: '#3455A9',
    paddingVertical: 5,
    paddingHorizontal: 24,
    borderRadius: 5,
    width: 150,
    height: 138,
    borderRadius: 18
  },
  users: {
    backgroundColor: '#21366C',
    paddingVertical: 5,
    paddingHorizontal: 24,
    borderRadius: 5,
    width: 150,
    borderRadius: 18,
    height: 138
  }
  /*biggerButton: {
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
  */
});
