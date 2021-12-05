import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import ScreenContainer from '../containers/ScreenContainer.js';
import { TextBody, Title, Subtitle } from '../containers/TextContainer.js';
import CustomMessage from '../components/MessageBubble.js';

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
      <ScreenContainer screenTitle="Feed" >
        <CustomMessage isAuthor={true} isSelectable={true}>
          I LOVE PIE!
        </CustomMessage>
      </ScreenContainer>
    );
  }
}

export default Feed;
