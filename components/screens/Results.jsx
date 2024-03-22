import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

// Sample component for Output 1
const Services = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoBubble}>
        <Text style ={styles.taxti}>General Information</Text>
      </View>
      <View style={styles.outputContainer}>
        <Text style={styles.output}>{data.general_info}</Text>
      </View>
    </View>
  );
};

// Sample component for Output 2
const Users = ({ data }) => {
  return (
    <View style={styles.appContainer}>

      <View style={styles.textBubble}>
        <Text style ={styles.taxi}>Taxi</Text>
      </View>
      

      <View style={styles.sectionContainer}>
      <View style={styles.responseContainer}>
        <Text style = {styles.responseText}>{data.taxi}</Text>
      </View>
      </View>


      <View style={styles.busmrtBubble}>
        <Text style={styles.taxi}>Bus + MRT</Text>
      </View>

      <View style={styles.sectionContainer}>
      <View style={styles.responseContainer}>
        <Text style = {styles.responseText}>{data.public_transport}</Text>
      </View>
      </View>
    </View>
  );
};


const Results = ({navigation}) => {
  const [jsonData, setJsonData] = useState(null);
  useEffect(() => {
    const data = require('./data.json');
    setJsonData(data);
  }, []);

  // Function to render components based on JSON key content
  const renderComponents = () => {
    if (!jsonData) {
      return <View style={styles.container}><Text>Loading...</Text></View>;
    }

    // Check the value of the 'type_of_user' key
    const typeOfUser = jsonData.type_of_user;

    // Render different components based on the value of 'type_of_user'
    if (typeOfUser === 'Service') {
      return <Services data={jsonData} />;
    }
    
    else {
      return <Users data={jsonData} />;
    }
  };

  const pressHandler = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>
        {renderComponents()}
      </View>
      <View styles={styles.button}>
          <Pressable style={styles.button} title= 'back to questions screen' onPress={pressHandler}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //borderColor: 'grey',
    //borderWidth: 1,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    //borderColor: 'grey',
    //borderWidth: 1,
    borderRadius: 10,
  },
  responseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    //borderColor: 'grey',
    //borderWidth: 1,
    backgroundColor: '#FAF0DC',
    borderRadius: 10,
    width: 300, 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBubble: {
    height: 48,
    width: 100, 
    borderRadius: 28,
    backgroundColor: '#21366C',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  busmrtBubble: {
    height: 48,
    width: 200, 
    borderRadius: 28,
    backgroundColor: '#3455A9',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  taxi: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  responseText: {
    fontFamily: 'Montserrat_300Bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBubble: {
    height: 48,
    width: 75, 
    borderRadius: 28,
    backgroundColor: '#21366C'
  },
  busmrtBubble: {
    height: 48,
    width: 150, 
    borderRadius: 28,
    backgroundColor: '#3455A9',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  infoBubble: {
    height: 48,
    width: 280, 
    borderRadius: 28,
    backgroundColor: '#21366C'
  },
  outputContainer: {
    marginTop: 20,
    width: 300,
  },
  output: {
    fontFamily: 'Montserrat_400Bold',
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3548'
  },
  button: {
    marginTop: 20,
    backgroundColor: '#3455A9',
    height: 40,
    width: 112,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent:"center"
  },
});

export default Results;
