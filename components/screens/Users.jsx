import { useState } from 'react';
import * as React from'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

export default function Users({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>users</Text>
      <View style={styles.buttonR}>
        <Pressable>
          <Text onPress={() => navigation.navigate('RightNow')} style={styles.textRightNow}>right now</Text>
        </Pressable>
      </View>
      <View style={styles.buttonF}>
        <Pressable>
          <Text style={styles.textFuture}>future</Text>
        </Pressable>
      </View>
    </View>
  );
}

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
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /*buttonPressed: {
    transform: [{ scale: 0.95 }],
  },*/
  buttonR: {
    backgroundColor: '#3455A9',
    borderRadius: 28,
    width: 171.75,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonF: {
    marginTop: 15,
    backgroundColor: '#CE8239',
    borderRadius: 28,
    width: 171.75,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textRightNow: {
    fontFamily: 'Montserrat_700Bold',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#EAF0FF'
  },
  textFuture: {
    fontFamily: 'Montserrat_700Bold',
    fontWeight: 'bold',
    fontSize: 24,
    color:'#2D3548'
  }
});


