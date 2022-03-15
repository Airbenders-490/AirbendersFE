import React,  { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, View, TouchableOpacity, Text, Image} from 'react-native';
import styled from 'styled-components';
import AddIcon from '../assets/images/icons/add-icon.png';

class AddButton extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
      <CustomAddButton onPress={this.props.addFunction}>
        <AddCustomIcon source= {AddIcon}/>
        <ButtonText>
          {this.props.buttonText}
        </ButtonText>
      </CustomAddButton>
      );
    }
  }
  
  // STYLED-COMPONENTS
const CustomAddButton = styled.TouchableOpacity `
border-radius: 12;
borderColor: #CCCCCC;
borderWidth: 2;
borderStyle: dotted;
width: 350;
padding-horizontal: 15;
padding-vertical: 25;
background: transparent;
alignItems: center;
justifyContent: center;
`;
const ButtonText = styled.Text `
color: #5089E9;
text-transform: uppercase;
font-weight: bold;
font-size: 12;
position: absolute;
bottom: 15;
letter-spacing: 2;
`;
const AddCustomIcon = styled.Image `
backgroundColor: transparent;
tintColor: #5089E9;
bottom: 10;
width: 40; 
height: 40;
`;

AddButton.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AddButton;
