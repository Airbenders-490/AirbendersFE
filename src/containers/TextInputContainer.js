import React,  { Component, } from 'react';
import { TextInput, View } from 'react-native';
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
        <Label textColor={this.props.labelColor ?? theme.COLOR_BLACK}>{this.props.labelName}</Label>
        <View>
          <StyledTextInput onFocus={this.props.onFocus} onEndEditing={this.props.onEndEditing} editable={!this.props.isConfirmed} placeholder={this.props.placeholder}></StyledTextInput>
        </View>
      </Container>
    );
  }
}

// PROP-TYPES
TextInputContainer.propTypes = {
};

const Container = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const Label = styled.Text `
  font-size: ${theme.FONT_SIZE_MEDIUM};
  font-family: ${theme.FONT_REGULAR};
  line-height: ${theme.SPACING_SLIGHT_MEDIUM};
  color: ${(props) => (props.textColor ? props.textColor : theme.COLOR_BLACK)};  
`;

const StyledTextInput = styled.TextInput`
  font-size: ${theme.FONT_SIZE_MEDIUM};
  font-family: ${theme.FONT_REGULAR};
  color: ${(props) => (props.textColor ? props.textColor : theme.COLOR_BLACK)};
`;

TextInputContainer.propTypes = {
  labelName: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  labelColor: PropTypes.string.isRequired
};

export default TextInputContainer;
