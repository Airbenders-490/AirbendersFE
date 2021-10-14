import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import PropTypes from "prop-types";

export function Title(props) {
  return (
    <StyledTitle textColor={props.titleColor}>{props.children}</StyledTitle>
  );
}

export function TextBody(props) {
  return (
    <StyledTextBody textColor={props.color}>{props.children}</StyledTextBody>
  );
}


// PROP-TYPES
Title.propTypes = {
  textColor: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

TextBody.propTypes = {
  children: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired
}


// STYLED-COMPONENTS
const StyledTitle = styled.Text `
  font-size: ${theme.FONT_SIZE_LARGE};
  color: ${props => props.textColor};
  text-transform: uppercase;
  letter-spacing: ${theme.LETTER_SPACING_LARGE};
  font-family: ${theme.FONT_BOLD};
`

const StyledTextBody = styled.Text `
  font-size: ${theme.FONT_SIZE_MEDIUM};
  font-family: ${theme.FONT_REGULAR};
  line-height: ${theme.SPACING_SLIGHT_MEDIUM}
`