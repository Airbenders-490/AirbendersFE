import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import ScreenContainer from '../containers/ScreenContainer.js';
import { TextBody, Title, Subtitle } from '../containers/TextContainer.js';
import { TextInputContainer } from '../containers/TextInputContainer';
import CustomButton from '../components/button';
import { Actions } from 'react-native-router-flux';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here
  register() {
    Actions.register();
  }

  feed() {
    Actions.feed();
  }

  forgotPassword() {
    Actions.password();
  }

  render() {
    return (
      <ScreenContainer>
        <View style={styles.container}>
          <Title> Welcome </Title>
          <View style={styles.inputView}>
            <TextInput style={styles.TextInput} placeholder='Email' placeholderTextColor='#F77E54' />
          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.TextInput} placeholder='Password' placeholderTextColor='#F77E54' secureTextEntry />
          </View>
          <TouchableOpacity style={styles.forgotPasswordLink} onPress={this.forgotPassword}>
            <TextBody>Forgot password?</TextBody>
          </TouchableOpacity>
          <CustomButton redirect={this.feed} buttonColorBackground="#FF7A67">Login</CustomButton>
          <TouchableOpacity style={styles.registerLink} onPress={this.register}>
            <TextBody>Don't have an account? Register</TextBody>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: '#FFFF',
    borderColor: '#FDEFE1',
    borderWidth: 1,
    borderRadius: 12,
    width: 350,
    height: 55,
    marginBottom: 10,
    marginTop: 10,

    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    width: '80%',
    padding: 10,
    justifyContent: 'center',
  },
  forgotPasswordLink: {
    paddingBottom: 15,
  },
  registerLink: {
    paddingTop: 10,
  }
});

export default Login;
