import React,  { Component, } from "react";
import PropTypes from "prop-types";
import { Button, View, TouchableOpacity, Text, Image} from 'react-native';
import styled from 'styled-components';
import AddIcon from '../assets/images/icons/add-icon.png';

class AddButton extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
      <AddCustomButton type="submit" >
          <Image style={{ backgroundColor: 'transparent', tintColor: '#5089E9', bottom: 10, height: 40, width: 40 }} source= {AddIcon}/>
        <ButtonText>
          {this.props.children}
        </ButtonText>
      </AddCustomButton>
      );
    }
  }
  
  // STYLED-COMPONENTS
const AddCustomButton = styled.TouchableOpacity `
border-radius: 12px;
borderColor: #CCCCCC;
borderWidth: 2;
borderStyle: dotted;
width: 350px;
padding-horizontal: 15px;
padding-vertical: 25px;
background: transparent;
position: absolute;
bottom: 30px;
alignItems: center;
justifyContent: center;
`
const ButtonText = styled.Text `
color: #5089E9;
text-transform: uppercase;
font-weight: bold;
font-size: 12;
position: absolute;
bottom: 15px;
letter-spacing: 2px;
`

AddButton.propTypes = {
  
};

export default AddButton;