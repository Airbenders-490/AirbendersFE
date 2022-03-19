import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, View, TouchableOpacity, Text, Image } from 'react-native';
import styled from 'styled-components';
import { TextBody } from '../containers/TextContainer';
import theme from '../styles/theme.style.js';


class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true // keep it true for now
    };
  }

  render() {
    return (
      <ToggleContainer>
        <Label>{this.props.labelName}</Label>
        <CustomSwitch
          trackColor={{ true: '#0CD59E', false: 'grey' }}
          value={this.state.value}
          onValueChange={(value) => this.setState({ value })}
        />
      </ToggleContainer>
    );
  }
}

const CustomSwitch = styled.Switch`
    left: 10;
    transform: scaleX(0.6) scaleY(0.6);
  `;

const ToggleContainer = styled.View`
    flexDirection: row;
    width: 100%;
    justify-content: space-between;
  `;
const Label = styled.Text`
    margin-top: 10;
    font-size: ${theme.FONT_SIZE_MEDIUM};
    font-family: ${theme.FONT_REGULAR};
    line-height: ${theme.SPACING_SLIGHT_MEDIUM};
    color: ${(props) => (props.textColor ? props.textColor : theme.COLOR_BLACK)};
  `;

ToggleButton.propTypes = {
  labelName: PropTypes.string.isRequired,
};

export default ToggleButton;
