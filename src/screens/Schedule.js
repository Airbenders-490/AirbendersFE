import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../styles/theme.style.js';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable } from 'react-native';
import ExternalProfile from './ExternalProfile';
import ScreenContainer from '../containers/ScreenContainer.js';
//import ListContainer from '../../containers/ListContainer.js';

import MainContainer from '../containers/MainContainer.js';
import { Subtitle } from '../containers/TextContainer.js';

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
      <ScreenContainer screenTitle={'Schedule'} >
        <Pressable
          onPress={onPressHandler}>
            <MainContainer>
              <Subtitle>John Smith</Subtitle>
            </MainContainer>
        </Pressable>
      </ScreenContainer>
        
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
          headerShown: false,
        }}
      >
        <Stack2.Screen
          name="Schedule"
          component={this.Schedule} />
        <Stack2.Screen
          name="ExternalProfile">
          { (props) => <ExternalProfile userID={12345} />}
        </Stack2.Screen>
      </Stack2.Navigator>
      
    );
  }
}

export default Schedule;



