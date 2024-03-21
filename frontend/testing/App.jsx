import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [selectedFirstName, setSelectedFirstName] = useState('');
  const [selectedLastName, setSelectedLastName] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [backEndResponse, setBackEndResponse] = useState('');
  const [llmResponse, setLLMResponse] = useState('');

  const firstNames = ['Alice', 'Bob', 'Charlie'];
  const lastNames = ['Smith', 'Johnson', 'Williams'];

  const backend_url = "http://127.0.0.1:8080/get_response"

  const handlePress = async () => {
    const data = {
      firstName: selectedFirstName,
      lastName: selectedLastName,
    };
    setJsonOutput(JSON.stringify(data));
    const jsonStuff = await postJsonData();
    setLLMResponse(jsonStuff);
    const response = await getResponse();
    setBackEndResponse(response)
  };


  async function getResponse() {
    try {
      const response = await fetch(backend_url);
      const data = await response.json();
      console.log(data);
      return data; // Return the data instead of logging it
    } catch (error) {
      console.error(error);
      return null; // Return null or an appropriate error message if the fetch fails
    }
  } 

  async function postJsonData() {
    const url = "http://127.0.0.1:8080/create_response"; // Replace with your actual URL
    const data = {
      type_of_user: "Service",
      busStop: "80219",
      curr_pos: "changi airport",
      dest_pos: "OCBC Arena",
      date_of_event: "2022-01-01",
      time: "AM",
      prompt: "what transport should i have to take to reach this location", 
      date: "02/02/2024",
      event: "Slowdive concert"
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error("There was a problem with your fetch operation: ", error);
      return null; // Return null or an appropriate error message if the fetch fails
    }
  }

  return (
    <View>
      <Picker
        selectedValue={selectedFirstName}
        onValueChange={(itemValue, itemIndex) => setSelectedFirstName(itemValue)}>
        {firstNames.map((name, index) => (
          <Picker.Item key={index} label={name} value={name} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedLastName}
        onValueChange={(itemValue, itemIndex) => setSelectedLastName(itemValue)}>
        {lastNames.map((name, index) => (
          <Picker.Item key={index} label={name} value={name} />
        ))}
      </Picker>

      <Button title="Generate JSON" onPress={handlePress} />

      <Text>JSON Output:</Text>
      <Text>{jsonOutput}</Text>
      <Text>{backEndResponse.response}</Text>
      
    </View>
  );
};

export default App;
