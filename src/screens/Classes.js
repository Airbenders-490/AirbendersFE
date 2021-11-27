import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View, Image } from 'react-native';
import theme from '../styles/theme.style.js';

import ScreenContainer from '../containers/ScreenContainer';
import { Title, Subtitle, TextBody } from '../containers/TextContainer.js';
import MainContainer from '../containers/MainContainer.js';
import FeatureButtons from '../components/FeatureButtons.js';

class Classes extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
      <ScreenContainer screenTitle='Classes'>
        <TextBody bodyColor={theme.COLOR_BLACK}>Classes!</TextBody>
        <FeatureButtons></FeatureButtons>
      </ScreenContainer>
    );
  }
}

export default Classes;
