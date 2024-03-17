// LandingPage.jsx
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';
import QuestionsForProviders from '../components/QuestionsForProviders'; // Adjust the path as per your file structure

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <Button
        title="Providers"
        onPress={() => navigation.navigate('QuestionsForProviders')}
      />
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
