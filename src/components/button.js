import React,  { Component, } from "react";
import PropTypes from "prop-types";
import { Button, View, TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components';

class GeneralButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <CustomButton type="submit" backgroundColor={this.props.buttonColorBackground} >
      <ButtonText>
        {this.props.children}
      </ButtonText>
    </CustomButton>
    );
  }
}

// STYLED-COMPONENTS
const CustomButton = styled.TouchableOpacity `
    border-radius: 12px;
    width: 350px;
    padding-horizontal: 15px;
    padding-vertical: 18px;
    background: ${props => props.backgroundColor};
    font-weight: 500;
    alignItems: center;
    justifyContent: center;
`
const ButtonText = styled.Text `
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 18;
    letter-spacing: 5px;
`

GeneralButton.propTypes = {
    children: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired
};

export default GeneralButton;