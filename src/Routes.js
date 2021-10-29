import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { StatusBar } from 'expo-status-bar';
import Login from './screens/Login';
import Register from './screens/Register';
import Feed from './screens/Feed';
import ForgotPassword from './screens/ForgotPassword';

// TODO: check if we can replace this with react-navigation
export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Stack key='root'>
          <Scene key='login' component={Login} title='Login' hideNavBar={true} />
          <Scene key='register' component={Register} title='Register' hideNavBar={true} />
          <Scene key='feed' component={Feed} title='Feed' hideNavBar={true} />
          <Scene key='password' component={ForgotPassword} title='ForgotPassword' hideNavBar={true} />
        </Stack>
      </Router>
    );
  }
}
