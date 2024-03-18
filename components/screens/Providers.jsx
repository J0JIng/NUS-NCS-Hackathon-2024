import * as React from 'react';
import { View, Text } from 'react-native';

export default function Providers({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('HomePage')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Providers Screen</Text>
        </View>
    );
}