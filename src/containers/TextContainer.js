import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import PropTypes from 'prop-types';

export function Title(props) {
  return (
    <StyledTitle textColor={props.titleColor}>{props.children}</StyledTitle>
  );
}

export function Subtitle(props) {
  return (
    <StyledSubtitle textColor={props.subtitleColor}>
      {props.children}
    </StyledSubtitle>
  );
}

export function TextBody(props) {
  return (
    <StyledTextBody textColor={props.bodyColor}>
      {props.children}
    </StyledTextBody>
  );
}

export function Caption(props) {
  return (
    <StyledCaption textColor={props.captionColor}>
      {props.children}
    </StyledCaption>
  );
}

// PROP-TYPES
Title.propTypes,
  Subtitle.propTypes,
  TextBody.propTypes,
  (Caption.propTypes = {
    children: PropTypes.element.isRequired,
  });

// STYLED-COMPONENTS
const StyledTitle = styled.Text`
  font-size: ${theme.FONT_SIZE_LARGE};
  color: ${(props) => (props.textColor ? props.textColor : theme.COLOR_BLACK)};
  text-transform: uppercase;
  letter-spacing: ${theme.LETTER_SPACING_LARGE};
  font-family: ${theme.FONT_BOLD};
`;

const StyledSubtitle = styled.Text`
  font-size: ${theme.FONT_SIZE_SLIGHT_LARGE};
  color: ${(props) => (props.textColor ? props.textColor : theme.COLOR_BLACK)};
  text-transform: uppercase;
  letter-spacing: ${theme.LETTER_SPACING_SMALL};
  font-family: ${theme.FONT_BOLD};
`;

const StyledTextBody = styled.Text`
  font-size: ${theme.FONT_SIZE_MEDIUM};
  font-family: ${theme.FONT_REGULAR};
  line-height: ${theme.SPACING_SLIGHT_MEDIUM}
  color: ${props => props.textColor ? props.textColor : theme.COLOR_BLACK};
`;

const StyledCaption = styled.Text`
  font-size: ${theme.FONT_SIZE_SMALL};
  font-family: ${theme.FONT_REGULAR};
  color: ${props => props.textColor ? props.textColor : theme.COLOR_BLACK};
`;
