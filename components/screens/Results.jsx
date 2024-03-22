import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

// Sample component for Output 1
const Services = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text>Output Component 1</Text>
      <Text>Data: {JSON.stringify(data)}</Text>
    </View>
  );
};

// Sample component for Output 2
const Users = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text>Output Component 2</Text>
      <Text>Data: {JSON.stringify(data)}</Text>
    </View>
  );
};

const Results = () => {
  const [jsonData, setJsonData] = useState(null);

  // routing of the JSON file
  useEffect(() => {
    // Importing JSON file using require
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
    } else {
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
});

export default Results;
