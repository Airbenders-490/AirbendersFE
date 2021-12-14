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
        isEditable: true,
      };
    }
  
    render() {
      return (
        <MessageBubbleContainer isAuthor={this.props.isAuthor} backgroundColor={this.props.BubbleColor} >
          <WrittenMessage placeholder='Message' placeholderTextColor={"#D8D8D8"} multiline={true} editable={this.props.isEditable} isAuthor={this.props.isAuthor}/>
        </MessageBubbleContainer>
      ); 
    }
  }
  
  
const MessageBubbleContainer = styled.View`
background-color: ${props => props.isAuthor ? theme.COLOR_ORANGE :theme.COLOR_LIGHT_GRAY};
border-radius: 12;
padding-vertical: 15;
padding-horizontal: 15;
max-width: 100%;
display: flex;
flex: 2;
`;

const WrittenMessage = styled.TextInput`
color: ${props => props.isAuthor ? theme.COLOR_WHITE :theme.COLOR_BLACK};
font-size: ${theme.FONT_SIZE_MEDIUM};
font-family: ${theme.FONT_REGULAR};
text-align: left;
padding-vertical: ${props => props.isEditable ? 5 : 0};
padding-horizontal: ${props => props.isEditable ? 5 : 0};
bottom: 2;
`;

export default MessageBubble;
