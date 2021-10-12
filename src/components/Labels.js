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
      <View>
        <Text readOnly value={this.props.labelValue} />
      </View>

    );
  }
}

// STYLED-COMPONENTS
const SimpleLabel = styled.View`
  height: 17px;
  width: 71px;
  left: 42px;
  top: 524px;
  border-radius: 8.5px;

`

Labels.propTypes = {
};

export default Labels;

