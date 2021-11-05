import React,  { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, View, TouchableOpacity, Text, Image} from 'react-native';
import styled from 'styled-components';
import SaveIcon from '../assets/images/icons/save-icon.png';
import theme from '../styles/theme.style.js';

class SaveButton extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
      <CustomSaveButton>
          <CustomSaveIcon source= {SaveIcon}/>
      </CustomSaveButton>
      );
    }
  }
  
  // STYLED-COMPONENTS
const CustomSaveButton = styled.TouchableOpacity `
padding-top: 20
alignItems: center;
`;

const CustomSaveIcon = styled.Image `
tintColor: ${theme.COLOR_GREEN};
width: 30; 
height: 30;
`;

export default SaveButton;
