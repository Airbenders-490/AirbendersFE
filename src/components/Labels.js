import React, { Component } from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Image } from 'react-native';

class Labels extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SimpleLabel>
        <LabelText>{this.props.children}</LabelText>
      </SimpleLabel>
    );
  }
}

// STYLED-COMPONENTS
const SimpleLabel = styled.View`
  padding-horizontal: 10;
  padding-vertical: 5;
  background-color: blue;
  border-radius: 100;
`

const LabelText = styled.Text `
  color: white;
  font-weight: bold;
  letter-spacing: 2;
`

Labels.propTypes = {
};

export default Labels;

