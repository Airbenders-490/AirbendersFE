import React,  { Component, } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import PropTypes from 'prop-types';

class TextInputContainer extends Component { //TODO: if isConfirmed == true, readOnly textinput
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Label>{this.props.labelName}</Label>
        <StyledInputContainer>
          <StyledTextInput editable={this.props.isConfirmed}>Test</StyledTextInput>
        </StyledInputContainer>
      </Container>
    );
  }
}

// PROP-TYPES
TextInputContainer.propTypes = {
};

const Container = styled.View`
    flexDirection: row
  `

const StyledInputContainer = styled.View`
  width: 250;
  height: 25;
  left: 25;
  margin-top: 10
  border-color: black;
  border-width: 0.5;
  border-radius: 4
`
const Label = styled.Text `
  margin-top: 10
  font-size: ${theme.FONT_SIZE_MEDIUM};
  font-family: ${theme.FONT_REGULAR};
  line-height: ${theme.SPACING_SLIGHT_MEDIUM}
  color: ${(props) => (props.textColor ? props.textColor : theme.COLOR_BLACK)};  
`
const StyledTextInput = styled.TextInput`
  font-size: ${theme.FONT_SIZE_MEDIUM};
  font-family: ${theme.FONT_REGULAR};
  color: ${(props) => (props.textColor ? props.textColor : theme.COLOR_BLACK)};
  width: 100%;
  left: 50;
  flex: 1;
`;

TextInputContainer.propTypes = {
  labelName: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired
};

export default TextInputContainer;

