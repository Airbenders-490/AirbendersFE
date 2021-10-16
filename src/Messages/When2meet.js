
import React , { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';


export default function  When2meet({ navigation }) {

    const onPressHandler = () => {
      // arrow button, to get to previous page (messages)
      navigation.goBack();
    }
  
    return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>When2meet!</Text>
            </View>
        );
      
    
}
  
