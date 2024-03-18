import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';

export default function QuestionsForProviders ({navigation}) {
    return (
        <View style = {styles.container}>
            <View style = {styles.logo}>
                <Text>Logo</Text>
            </View>

            <View style = {styles.header}>
                <Text>Header</Text>
            </View>

            <View style = {styles.buttons}>
                <View style = {styles.location}>
                    <Text>Location</Text>
                </View>

                <View style = {styles.date}>
                    <Text>Date</Text>
                </View>

                <View style = {styles.time}>
                    <Text>Time</Text>
                </View>

                <View style = {styles.event}>
                    <Text>Event</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginBottom: 24, 
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'grey',
        width: '70%',
        marginRight: 8,
        padding: 8
    },
    goals: {
        flex: 5
    },
    goalItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
        padding: 8,
        color: 'white'
    }
});