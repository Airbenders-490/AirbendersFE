import React,  { Component, } from "react";
import PropTypes from "prop-types";
import { Button, View, TouchableOpacity, Text,} from 'react-native';
import styled from 'styled-components';

class GeneralButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <CustomButton type="submit" backgroundColor={this.props.buttonColorBackground} >
      <Text>
        {this.props.children}
      </Text>
    </CustomButton>
    );
  }
}

// STYLED-COMPONENTS
const CustomButton = styled.TouchableOpacity `
    border-radius: 12;
    padding-horizontal: 15;
    padding-vertical: 10;
    background: ${props => props.backgroundColor};
    color: white;
    text-transform: uppercase;
    letter-spacing: 2;
    font-weight: 500;
`

GeneralButton.propTypes = {
    value: PropTypes.string.isRequired,
};

export default GeneralButton;