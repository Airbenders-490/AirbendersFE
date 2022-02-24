import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View, Image } from 'react-native';
import theme from '../styles/theme.style.js';

import ScreenContainer from '../containers/ScreenContainer';
import { Title, Subtitle, TextBody } from '../containers/TextContainer.js';
import MainContainer from '../containers/MainContainer.js';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
      <ScreenContainer screenTitle='Forgot Password' isSecondaryScreen>
        <TextBody bodyColor={theme.COLOR_BLACK}>Forgot Password!</TextBody>
      </ScreenContainer>
    );
  }
}

export default ForgotPassword;
