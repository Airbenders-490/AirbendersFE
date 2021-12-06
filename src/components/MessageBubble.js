import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInputComponent } from 'react-native';
import TextInputContainer from '../containers/TextInputContainer'; 


class MessageBubble extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthor: true,
        isSelectable: true,
      };
    }
  
    render() {
      return (
        <MessageBubbleContainer isAuthor={this.state.isAuthor} backgroundColor={this.props.labelColor} isSelectable={this.props.isSelectable}>
          <TextInputContainer placeholder='Message' isConfirmed={false}>
          </TextInputContainer>
        </MessageBubbleContainer>
      ); 
    }
  }
  
const MessageBubbleContainer = styled.View`
background-color: ${props => props.isAuthor ? theme.COLOR_ORANGE : (props.backgroundColor ? props.backgroundColor :  theme.COLOR_LIGHT_GRAY)};
border-radius: 12;
padding-horizontal: 50;
padding-vertical: 50;
`;


export default MessageBubble;