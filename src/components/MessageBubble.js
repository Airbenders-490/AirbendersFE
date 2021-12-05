import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageInput from './MessageInput';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


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
              <MessageInput> 
                {this.props.children}
              </MessageInput>
        </MessageBubbleContainer>
      ); 
    }
  }

  
const MessageBubbleContainer = styled.View`
background-color: ${props => props.isAuthor ? theme.COLOR_ORANGE : (props.backgroundColor ? props.backgroundColor :  theme. COLOR_LIGHT_GRAY)};
`;