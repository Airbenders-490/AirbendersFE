import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View, Image } from 'react-native';
import theme from '../styles/theme.style.js';

import ScreenContainer from '../containers/ScreenContainer';
import { Title, Subtitle, TextBody } from '../containers/TextContainer.js';
import MainContainer from '../containers/MainContainer.js';

class Teams extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
      <ScreenContainer screenTitle='Teams'>
        <MainContainer backgroundColor='#E5E5E5' height='720'></MainContainer>
      </ScreenContainer>
    );
  }
}

export default Teams;