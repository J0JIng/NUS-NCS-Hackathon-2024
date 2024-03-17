// LandingPage.jsx
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';


export default function LandingPage() {
  return (
    <View style={styles.container}>
      <Text>Yay!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
