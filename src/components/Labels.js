import React, { Component } from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";
import StarIcon from '../assets/images/icons/star-icon.png';
import XIcon from '../assets/images/icons/x-icon.png';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

class Labels extends Component {
  constructor(props) {
    super(props);
    this.state = {isReadOnly: false};
  }

  render() {
    const isReadOnly = this.state.isReadOnly;
    let tag;
    if(isReadOnly) {
      tag = <CustomStarIcon source = {StarIcon}/>;
    }
    else {
      tag = <CustomXIcon source = {XIcon}/>;
    }

    return (
      <CustomLabel>
          <LabelText>
          {this.props.children} 
          {tag}
          </LabelText>
      </CustomLabel>
    );
  }
}

// STYLED-COMPONENTS
const CustomLabel = styled.View`
  padding-horizontal: 10;
  padding-vertical: 5;
  background-color: #16D2FA;
  border-radius: 100;
  borderRightWidth: 20;
  borderRightColor: black;
`

const LabelText = styled.Text`
  color: white;
  font-weight: bold;
  letter-spacing: 2;
  border-radius: 100;
`

const CustomStarIcon = styled.Image`
tintColor: #FFFFFF;
background-color: cyan;
width: 20;
height: 20;
`

const CustomXIcon = styled.TouchableOpacity`
tintColor: #FFFFFF;
background-color: cyan;
width: 20;
height: 20;
`


Labels.propTypes = {
};

export default Labels;

