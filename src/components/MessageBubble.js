import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInputComponent, } from 'react-native';
import TextInputContainer from '../containers/TextInputContainer';
import { TextInput } from 'react-native-gesture-handler';


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
           <WrittenMessage
           placeholder='Message'
       placeholderTextColor={"#D8D8D8"}
       multiline={true}
     />
          <TextInputContainer placeholder='' isConfirmed={false}>
          </TextInputContainer>
        </MessageBubbleContainer>
      ); 
    }
  }
  
const MessageBubbleContainer = styled.View`
background-color: ${props => props.isAuthor ? theme.COLOR_ORANGE : (props.backgroundColor ? props.backgroundColor :  theme. COLOR_LIGHT_GRAY)};
border-radius: 12;
padding-vertical: 10;
padding-horizontal: 15;
`;

const WrittenMessage = styled.TextInput`
color:${theme.COLOR_WHITE};
font-size: ${theme.FONT_SIZE_MEDIUM};
font-family: ${theme.FONT_REGULAR};
text-align: left;
padding-vertical: ${props => props.isSelectable ? 5 : 0};
padding-horizontal: ${props => props.isSelectable ? 5 : 0};
top: 5;
`;

export default MessageBubble;