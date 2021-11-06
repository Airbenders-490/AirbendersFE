import React,  { Component, } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import PropTypes from 'prop-types';

class TextInputContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Label>{this.props.labelName}</Label>
        <StyledInputContainer>
          <StyledTextInput editable={this.props.isConfirmed} placeholder={this.props.placeholder}></StyledTextInput>
        </StyledInputContainer>
      </Container>
    );
  }
}

// PROP-TYPES
TextInputContainer.propTypes = {
};

const Container = styled.View`
  flexDirection: row;
`

const StyledInputContainer = styled.View`
  left: 80;
  margin-top: 10;
`
const Label = styled.Text `
  font-size: ${theme.FONT_SIZE_MEDIUM};
  font-family: ${theme.FONT_REGULAR};
  line-height: ${theme.SPACING_SLIGHT_MEDIUM}
  color: ${(props) => (props.textColor ? props.textColor : theme.COLOR_BLACK)};  
  margin-top: 10;
`
const StyledTextInput = styled.TextInput`
  font-size: ${theme.FONT_SIZE_MEDIUM};
  font-family: ${theme.FONT_REGULAR};
  color: ${(props) => (props.textColor ? props.textColor : theme.COLOR_BLACK)};
  width: 100%;
  top: 3;
  left: 65;
  flex: 1;
`;

TextInputContainer.propTypes = {
  labelName: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default TextInputContainer;
