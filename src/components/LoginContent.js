import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, View, TouchableOpacity, TextInput, Pressable, Image, LayoutAnimation, UIManager } from 'react-native';
import theme from '../styles/theme.style.js';
import { TextBody, Title, Subtitle } from '../containers/TextContainer.js';
import CustomButton from './button.js';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import EyeIcon from '../assets/images/icons/eye.png';
import HideEyeIcon from '../assets/images/icons/invisible-2.png';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

class LoginContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: true,
            isInRegister: false,
            hidePrimaryPassword: true,
            hideConfirmationPassword: true,
            isPasswordConfirmed: false,
            isRegisterReady: false,
        };

        this.handleActionButton = this.handleActionButton.bind(this);
        this.onRegisterLoginLinkClick = this.onRegisterLoginLinkClick.bind(this);
        this.triggerPrimaryPasswordVisilibity = this.triggerPrimaryPasswordVisilibity.bind(this);
        this.triggerConfirmationPasswordVisilibity = this.triggerConfirmationPasswordVisilibity.bind(this);
        this.onForgotPasswordClick = this.onForgotPasswordClick.bind(this);
        this.comparePasswords = this.comparePasswords.bind(this);
    }

    payload = {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
    } 

    onRegisterLoginLinkClick() {
      // In order to animate the next state change
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      this.setState({ isInRegister : !this.state.isInRegister });
    }

    onForgotPasswordClick() {
      this.props.navigation.navigate('ForgotPasswordScreen');
    }

    handleActionButton() {
        if (this.state.isInRegister) {
            // Handle register functions
            // JSON data to send when registering
            let newUserCredentials = {
                "name": this.payload.fullName,
                "email": this.payload.email,
                "password": this.payload.password
            }
            
            axios
                .post('http://real.encs.concordia.ca/auth/api/register', newUserCredentials)
                .then(
                    response => {
                        console.log(response.data);
                        this.props.navigation.navigate('RegisterScreen', {
                            userPersonalEmail: this.payload.email,
                          });
                        // TODO: Save jwt in AsyncStorage
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
                
        } else {
            // Handle login functions
            // JSON data to send when logging in
            let credentials = {
                "email": this.payload.email,
                "password": this.payload.password
            }

            axios
                .post('http://real.encs.concordia.ca/auth/api/login', credentials)
                .then(
                    response => {
                        console.log(response.data)
                        this.setState({ isLoggedIn: response.data.token ? true : false }, () => {
                            this.props.handleLogin(this.state.isLoggedIn)
                        });
                        // TODO: Save jwt in AsyncStorage
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
        }
    }

    triggerPrimaryPasswordVisilibity() {
        this.setState({ hidePrimaryPassword : !this.state.hidePrimaryPassword });
    }

    triggerConfirmationPasswordVisilibity() {
        this.setState({ hideConfirmationPassword : !this.state.hideConfirmationPassword });
    }

    comparePasswords(passwordToCompare) {
        this.setState({
            isPasswordConfirmed: this.payload.password === passwordToCompare
        });
    }

    render () {
        return (
          <LoginContainer>
            <Title>Welcome</Title>
            <CredentialsContainer isHidden={!this.state.isInRegister} marginTop={20}>
                <CredentialsInput
                placeholder='your name'
                placeholderTextColor={theme.COLOR_ORANGE}
                onChangeText={(text) => this.payload.fullName = text} />
            </CredentialsContainer>

            <CredentialsContainer marginTop={this.state.isInRegister ? 0 : 20}>
                <CredentialsInput
                    placeholder='email'
                    placeholderTextColor={theme.COLOR_ORANGE}
                    accessibilityId="email"
                    onChangeText={(text) => this.payload.email = text} />
            </CredentialsContainer>

            <CredentialsContainer>
                <CredentialsInput
                    placeholder='password'
                    placeholderTextColor={theme.COLOR_ORANGE}
                    secureTextEntry={this.state.hidePrimaryPassword ? true : false}
                    onChangeText={(text) => this.payload.password = text} />
                <Pressable onPress={this.triggerPrimaryPasswordVisilibity}>
                    <HideIcon source={this.state.hidePrimaryPassword ? EyeIcon : HideEyeIcon} />
                </Pressable>
            </CredentialsContainer>

            <CredentialsContainer isHidden={!this.state.isInRegister} borderColor={this.state.isPasswordConfirmed ? 'green' : 'red'}>
                <CredentialsInput
                    placeholder='confirm password'
                    placeholderTextColor={theme.COLOR_ORANGE}
                    secureTextEntry={this.state.hideConfirmationPassword ? true : false}
                    onChangeText={(text) => this.comparePasswords(text)} />
                <Pressable onPress={this.triggerConfirmationPasswordVisilibity}>
                    <HideIcon source={this.state.hideConfirmationPassword ? EyeIcon : HideEyeIcon} />
                </Pressable>
            </CredentialsContainer>

            <ScreenLink onPress={this.onForgotPasswordClick}>
              <TextBody>Forgot password?</TextBody>
            </ScreenLink>
    
            <CustomButton
              redirect={this.handleActionButton}
              buttonColorBackground="#FF7A67">
              {this.state.isInRegister ? 'Register' : 'Login'}
            </CustomButton>
            
            <ScreenLink onPress={this.onRegisterLoginLinkClick}>
              <TextBody>{this.state.isInRegister ? "Already have an account? Login" : "Don't have an account? Register"}</TextBody>
            </ScreenLink>
          </LoginContainer>
        );
    }
}

const LoginContainer = styled.View `
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const CredentialsInput = styled.TextInput `
    flex: 1;
`;

const CredentialsContainer = styled.View `
    display: ${props => props.isHidden ? 'none' : 'flex'};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-color: ${props => props.borderColor ? props.borderColor : theme.COLOR_ORANGE};
    border-width: 1;
    border-radius: 12;
    width: 350;
    margin-bottom: 10;
    margin-top: ${props => props.marginTop ? props.marginTop : 5};
    padding-vertical: 10;
    padding-horizontal: 15;
`;

const ScreenLink = styled.Pressable `
    padding-vertical: 10;
`;

const HideIcon = styled.Image `
    width: 20;
    height: 20;
    tint-color: ${theme.COLOR_GRAY};
`;

export default function(props) {
    const navigation = useNavigation();
    return <LoginContent {...props} navigation={navigation} />;
}
