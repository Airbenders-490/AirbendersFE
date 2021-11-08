import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../styles/theme.style.js';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable } from 'react-native';
import ExternalProfile from './ExternalProfile';

const Stack2 = createStackNavigator();

class Schedule extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  Schedule({ navigation }) {
    // navigate to when to meet
    const onPressHandler = () => {
      navigation.navigate('ExternalProfile');
    };

    return (
      <View >
        <Text>Schedule!</Text>
        <Pressable
          onPress={onPressHandler}
          style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#6958' })}>
          <Text>Access to External Profile</Text>
        </Pressable>
      </View>
    );
  }

  render() {
    return (
      <Stack2.Navigator
        screenOptions = {{
          headerStyle: {
            height: 90,
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            marginLeft: 0,
            paddingRight: 0,
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      >
        <Stack2.Screen
          name="Schedule"
          component={this.Schedule} />
        <Stack2.Screen
          name="ExternalProfile"
          component={ExternalProfile} />
      </Stack2.Navigator>
    );
  }
}

export default Schedule;