import { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {keepUserSelection, addUserSelection} from '../screens/QuestionsForProviders';

export default class DropdownComponent extends Component {
    state = {
        selectedcat: '',
        category: [
            {
                itemName: 'null',
            },
        ],
    };


    async onValueChangeCat(value) {
        this.setState({selectedcat: value});
    }

    render() {
        return (
            <View>
                <Picker
                    mode="dropdown"
                    selectedValue={this.state.selectedcat}
                    onValueChange={this.onValueChangeCat.bind(this)}>
                        {this.state.category.map((item, index) => (
                            <Picker.Item
                            label = {item.itemName}
                            index={index}
                            />
                        ))}
                </Picker>
            </View>
        )
    }
}