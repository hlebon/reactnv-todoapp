import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default class Header extends Component {
    render() { 
        return ( 
        <View style={styles.header}>
            <TextInput 
            placeholder="what do you need?" 
            blurOnSubmit={false} returnKeyType="done"
            style={styles.input}/>
        </View> 
        )
    }
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 50
    }
  });