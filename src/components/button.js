import React,  { Component, } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components';
import { TextBody, Title, Subtitle } from '../containers/TextContainer.js';
import theme from '../styles/theme.style.js';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <CustomButton
      onPress={this.props.redirect}
        backgroundColor={this.props.buttonColorBackground}  
        disabled={this.props.disabled} >
      <Title titleColor={theme.COLOR_WHITE}>{this.props.children}</Title>
    </CustomButton>
    );
  }
}

// STYLED-COMPONENTS
const CustomButton = styled.TouchableOpacity `
    border-radius: 12;
    width: 350;
    padding-horizontal: 15;
    padding-vertical: 15;
    background: ${props => props.backgroundColor};
    font-weight: 500;
    alignItems: center;
    justifyContent: center;
`;

Button.propTypes = {
    children: PropTypes.element.isRequired,
    backgroundColor: PropTypes.string.isRequired
};

export default Button;
