import React, { Component } from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

class SimpleLabels extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SimpleLabel>
          <LabelText>
          {this.props.children} 
          </LabelText>
      </SimpleLabel>
    );
  }
}

// STYLED-COMPONENTS
const SimpleLabel = styled.View`
  padding-horizontal: 10;
  padding-vertical: 5;
  background-color: #16D2FA;
  border-radius: 100;
`

const LabelText = styled.Text`
  color: white;
  font-weight: bold;
  letter-spacing: 2;
  border-radius: 100;
`

SimpleLabels.propTypes = {
};

export default SimpleLabels;

