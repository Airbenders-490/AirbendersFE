import React,  { Component, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Title } from '../containers/TextContainer.js';
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
    background: ${props => props.disabled ? '#cecece' : (props.backgroundColor ? props.backgroundColor : theme.COLOR_ORANGE)};
    font-weight: 500;
    alignItems: center;
    justifyContent: center;
`;

Button.propTypes = {
    children: PropTypes.element.isRequired,
    backgroundColor: PropTypes.string.isRequired
};

export default Button;
