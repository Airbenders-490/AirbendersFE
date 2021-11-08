import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import ScreenContainer from '../containers/ScreenContainer.js';
import { TextBody, Title, Subtitle } from '../containers/TextContainer.js';

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
      <ScreenContainer screenTitle="Feed" >
        <MainContainer isElevated backgroundColor={theme.COLOR_BLUE}>
          <Title>Hola</Title>
          <Subtitle>Amiga</Subtitle>
        <TextBody>Classes!</TextBody>
        </MainContainer>
      </ScreenContainer>
    );
  }
}

export default Feed;
