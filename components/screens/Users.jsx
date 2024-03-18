import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const button = ({ onPress, title }) => {
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
        <View>
            <SinkingButton onPress={handlePress} title="yay" />
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

    textUsers: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 64,
        colour: '#2D3548',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        elevation: 3,
    },

    buttonPressed: {
        transform: [{ scale: 0.95 }],
    },

    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Users;
