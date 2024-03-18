import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const SinkingButton = ({ onPress, title }) => {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
  };

  const handlePressOut = () => {
    setPressed(false);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.button, pressed && styles.buttonPressed]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const Users = ({ navigation }) => {
  const handlePress = () => {
    // Handle button press here
    console.log('Button pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>users</Text>
      <View>
        <SinkingButton style={styles.rn} onPress={handlePress} title="right now" />
      </View>
      <View>
        <SinkingButton style={styles.future} onPress={handlePress} title="future" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 64,
    color: '#2D3548',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 28,
    elevation: 3,
    width: 171.75,
    height: 48
  },
  rn: {
    backgroundColor: '#3455A9',
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },
  text: {
    textAlign:'center',
    color: 'white',
    ontFamily: 'Montserrat_700Bold',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default Users;
