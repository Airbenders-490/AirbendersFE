import React, { Component, } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { StyleSheet, Text, View, Image } from 'react-native';
import ScreenContainer from '../containers/ScreenContainer';
import theme from '../styles/theme.style.js';
import { TextBody } from '../containers/TextContainer.js'

class Classes extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
        <ScreenContainer screenTitle="Classes" >
          <TextBody>Classes!</TextBody>
        </ScreenContainer>
    );
  }
}

export default Classes;