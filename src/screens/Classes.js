import React, { Component, } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { StyleSheet, Text, View, Image } from 'react-native';
import ScreenContainer from '../containers/ScreenContainer';

class Classes extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
        <ScreenContainer title="Classes" >
          <Text>Classes!</Text>
        </ScreenContainer>
    );
  }
}

export default Classes;