import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

// Sample component for Output 1
const Services = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textBubble}>
        <Text>Taxi</Text>
      </View>
      <View>
        <Text>{data.taxi}</Text>
      </View>

      <View>
        <Text>Bus + MRT</Text>
      </View>
      <View>
        <Text>Data: {data.public_transport}</Text>
      </View>
    </View>
  );
};

// Sample component for Output 2
const Users = ({ data }) => {
  return (
    <View style={styles.container}>

      <View style={styles.textBubble}>
        <Text style ={styles.taxi}>Taxi</Text>
      </View>

      <View>
        <Text>{data.taxi}</Text>
      </View>

      <View style={styles.busmrtBubble}>
        <Text style={styles.busmrt}>Bus + MRT</Text>
      </View>

      <View>
        <Text>{data.public_transport}</Text>
      </View>
    </View>
  );
};

const Results = () => {
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
    if (typeOfUser === 'Services') {
      return <Services data={jsonData} />;
    }
    
    else {
      return <Users data={jsonData} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderComponents()}
    </View>
  );
};

const styles = StyleSheet.create({
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
  taxi: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24,
    fontWeight: 'bold'
  },
});

export default Results;
