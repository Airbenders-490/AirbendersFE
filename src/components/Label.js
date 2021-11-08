import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StarIcon from '../assets/images/icons/star-icon.png';
import XIcon from '../assets/images/icons/x-icon.png';
import theme from '../styles/theme.style.js';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


class Labels extends Component {
  constructor(props) {
    super(props);
    this.state = {isReadOnly: true};
  }

  render() {
    return (
      <Container disabled={this.props.isReadOnly}>
        <TextContainer backgroundColor={this.props.labelColor} isReadOnly={this.props.isReadOnly}>
            <LabelText> 
              {this.props.children}
            </LabelText>
        </TextContainer>
        <IconTag backgroundColor={this.props.labelColor} isReadOnly={this.props.isReadOnly}>
          <LabelIcon source={this.props.labelIcon} />
        </IconTag>
      </Container>
    ); 
  }
}

// STYLED-COMPONENTS
const Container = styled.TouchableOpacity `
  display: flex;
  flex-direction: row;
`;

const TextContainer = styled.View `
  padding-horizontal: 10;
  padding-vertical: 5;
  border-top-left-radius: 100;
  border-bottom-left-radius: 100;
  border-top-right-radius: ${props => props.isReadOnly ? '100' : '0'};
  border-bottom-right-radius: ${props => props.isReadOnly ? '100' : '0'};
  background-color: ${props => props.backgroundColor ? props.backgroundColor : theme.COLOR_BLUE};
`;

const LabelText = styled.Text`
  color: white;
  font-weight: bold;
  letter-spacing: 2;
`;

const LabelIcon = styled.Image`
  tintColor: #FFFFFF;
  width: 15;
  height: 15;
`;

const IconTag = styled.View `
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 100;
  border-bottom-right-radius: 100;
  display: ${props => props.isReadOnly ? 'none' : 'flex'};
  justify-content: center;
  padding-horizontal: 5;
  background-color: ${props => props.backgroundColor ? `${props.backgroundColor}50` : `${theme.COLOR_BLUE}50`};
`;

Labels.propTypes = {
};

export default Labels;