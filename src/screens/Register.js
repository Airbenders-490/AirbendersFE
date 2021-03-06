import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View, Image } from 'react-native';
import theme from '../styles/theme.style.js';

import ScreenContainer from '../containers/ScreenContainer';
import { Title, Subtitle, TextBody } from '../containers/TextContainer.js';
import MainContainer from '../containers/MainContainer.js';
import UserProfile from '../components/profile/UserProfile.js';

class Register extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
      <ScreenContainer isSecondaryScreen screenTitle='Register'>
        <SettingsButton
          onPress={this.triggerSettings} >
        </SettingsButton>
        <UserProfile
          isFromRegister
          isCurrentUser
          isReadOnly={false}
          userPersonalEmail={this.props.userPersonalEmail}
          triggerSettings={this.triggerSettings}
          additionalRegisterFuncOnSave={() => this.props.handleLogin(true)} />
      </ScreenContainer>
    );
  }
}

const SettingsButton = styled.TouchableOpacity `
  align-self: flex-end;
  margin-top: 2;
`;

const SettingsIcon = styled.Image `
  height: 20;
  width: 20;
`;

export default Register;
