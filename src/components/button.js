import React,  { Component, } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <CustomButton onPress={this.props.redirect} backgroundColor={this.props.buttonColorBackground} >
      <ButtonText>
        {this.props.children}
      </ButtonText>
    </CustomButton>
    );
  }
}

// STYLED-COMPONENTS
const CustomButton = styled.TouchableOpacity `
    border-radius: 12;
    width: 350;
    padding-horizontal: 15;
    padding-vertical: 18;
    background: ${props => props.backgroundColor};
    font-weight: 500;
    alignItems: center;
    justifyContent: center;
`;
const ButtonText = styled.Text `
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 18;
    letter-spacing: 5;
`;

Button.propTypes = {
    children: PropTypes.element.isRequired,
    backgroundColor: PropTypes.string.isRequired
  };

export default Button;
