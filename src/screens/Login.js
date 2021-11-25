import React, { Component, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ForgotPasswordScreen from './ForgotPassword.js';
import RegisterScreen from './Register.js';
import LoginScreen from '../components/LoginContent.js';

const Stack = createStackNavigator();

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator
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
        <Stack.Screen
          name="Schedule">
            { (props) => <LoginScreen handleLogin={this.props.handleLogin} navigation={this.props.navigation} /> }
        </Stack.Screen>
        <Stack.Screen
          name='RegisterScreen'>
            { (props) => <RegisterScreen handleLogin={this.props.handleLogin} /> }
        </Stack.Screen>
        <Stack.Screen
        name='ForgotPasswordScreen' >
          { (props) => <ForgotPasswordScreen /> }
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

// export default Login;

export default function(props) {
  const navigation = useNavigation();
  return <Login {...props} navigation={navigation} />;
}
