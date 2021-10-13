import React,  { Component, } from "react";
import PropTypes from "prop-types";
import { Button, View, TouchableOpacity, Text,} from 'react-native';
import styled from 'styled-components';

class GeneralButton extends Component {
  constructor(props) {
    super(props);
  }
  
  onpress

  render() {
    return (
   <CustomButton type="submit" value={this.props.buttonValue} />
    );
  }
}

// STYLED-COMPONENTS
const CustomButton = styled.input`
    border-radius: 12px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    color: white;
    font-size: 10pt;
    background: #FF7A67;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 500;
    width: 50%;
    cursor: pointer;
    transition: 1000ms;
    &:focus {
        outline: none;
    }
    &:hover {
        background: #FF7A67;
    }
`

GeneralButton.propTypes = {
    value: PropTypes.string.isRequired,
};

export default GeneralButton;