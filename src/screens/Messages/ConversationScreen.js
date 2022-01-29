import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import theme from '../../styles/theme.style.js';

import ScreenContainer from '../../containers/ScreenContainer.js';
import { Title, Subtitle, TextBody } from '../../containers/TextContainer.js';

class ConversationScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // Remove tab bar from conversation screen
    this.props.hideTabBar();
  }

  render() {
    return (
      <ScreenContainer isSecondaryScreen screenTitle='The Conversation'>
        <TextBody bodyColor={theme.COLOR_BLACK}>Hola Bubbles!</TextBody>
      </ScreenContainer>
    );
  }
}

export default ConversationScreen;
