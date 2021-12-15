import React,  { Component, } from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import PropTypes from 'prop-types';

class TextInputContainer extends Component {
  constructor(props) {
    super(props);
   // this.consoleLogPrint =this.consoleLogPrint.bind(this);
  }

  render() {
    return (
      <Container>
        <Label>{this.props.labelName}</Label>
        <View>
          <StyledTextInput editable={!this.props.isConfirmed} placeholder={this.props.placeholder} onChangeText={(text) => this.props.onChangeText(text)}></StyledTextInput>
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
  margin-top: 10;
`;

const StyledTextInput = styled.TextInput`
  font-size: ${theme.FONT_SIZE_MEDIUM};
  font-family: ${theme.FONT_REGULAR};
  color: ${(props) => (props.textColor ? props.textColor : theme.COLOR_BLACK)};
`;

TextInputContainer.propTypes = {
  labelName: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default TextInputContainer;
