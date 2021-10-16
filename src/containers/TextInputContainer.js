import React from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import PropTypes from 'prop-types';

export function TextInputContainer(props) {
  return (
    <StyledTextInput textColor={props.captionColor}>
      {props.children}
    </StyledTextInput>
  );
}

// PROP-TYPES
TextInputContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

const StyledTextInput = styled.TextInput`
  font-size: ${theme.FONT_SIZE_MEDIUM};
  font-family: ${theme.FONT_REGULAR};
  color: ${(props) => (props.textColor ? props.textColor : theme.COLOR_BLACK)};
  width: 100%;
  left: 10;
  flex: 1;
`;
