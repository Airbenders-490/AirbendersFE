import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInputComponent, LayoutAnimation } from 'react-native';
import TextInputContainer from '../containers/TextInputContainer';
import { TextInput } from 'react-native-gesture-handler';
import MessageOptions from '../components/MessageIcons.js';


class MessageBubble extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInEditingMode: false,
      isSelected: false,
      isDeleted: false,
      messageBody: "",
    }

    this.triggerMessageOption = this.triggerMessageOption.bind(this);
    this.triggerSelection = this.triggerSelection.bind(this);
  }

  getColor(name) {
    String.prototype.hashCode = function() {
        var hash = 0;
        for (var i = 0; i < this.length; i++) {
            var char = this.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
}

  triggerMessageOption(option) {
    //TODO: Add enum for message options
    switch (option) {
      case 'EDIT': {
        if (this.state.isInEditingMode) {
          if (this.props.onEdit) {
            let message = this.props.message;
            message.MessageBody = this.state.messageBody
            let prom = this.props.onEdit(message)
            prom
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.response))
          }
          console.log('Update message content with edit');
        }
        this.setState({ isInEditingMode: !this.state.isInEditingMode });
      }
        break;
      case 'DELETE': {
        if (this.props.onDelete) {
          let prom = this.props.onDelete(this.props.message)
          prom
            .then(() => (this.setState({ isDeleted: true }, this.setState({ isDeleted: true }))))
            .catch((err) => console.log(err.response))
        }
      }
        break;
      case 'PIN': {
        //TODO: Pin message
      }
        break;
    }
  }

  triggerSelection() {
    this.setState({ isSelected: !this.state.isSelected }, function () {
      if (!this.state.isSelected) {
        this.setState({ isInEditingMode: false });
      }
    });
  }

  render() {
    return (
      <MessageContainer
        isAuthor={this.props.isAuthor}
        isDeleted={this.state.isDeleted}
      >
        {
          this.props.isAuthor ?
          <MessageOptions
            isDisplayed={this.state.isSelected}
            isAuthor={this.props.isAuthor}
            triggerOption={this.triggerMessageOption} /> : null
        }
        <TextContainer
          isAuthor={this.props.isAuthor}
          onPress={this.triggerSelection} >
          {this.props.isAuthor || !this.props.name ? null : 
          <AuthorText authorColor={this.props.authorColor}>
            {this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}
          </AuthorText>}
          <WrittenMessage
            placeholder={this.props.children}
            placeholderTextColor={this.props.isAuthor ? theme.COLOR_WHITE : theme.COLOR_BLACK}
            multiline={true}
            editable={this.state.isInEditingMode}
            isAuthor={this.props.isAuthor}
            defaultValue={this.props.children}
            onChangeText={(text) => this.setState({ messageBody: text })}
          />
        </TextContainer>
        {
          !this.props.isAuthor &&
          <MessageOptions
            isDisplayed={this.state.isSelected}
            isAuthor={this.props.isAuthor}
            isInEditMode={this.state.isInEditingMode}
            triggerOption={this.triggerMessageOption} />
        }
      </MessageContainer>
    );
  }
}

//STYLED-COMPONENTS
const MessageContainer = styled.View`
  display: ${props => props.isDeleted ? "none" : "flex"};
  flex-direction: row;
  width: 100%;
  justify-content: ${(props) => props.isAuthor ? 'flex-end' : 'flex-start'};
  margin-bottom: 3;
`;

const TextContainer = styled.TouchableOpacity`
  background-color: ${props => props.isAuthor ? theme.COLOR_ORANGE : theme.COLOR_LIGHT_GRAY};
  border-radius: 12;
  padding-vertical: 13;
  padding-horizontal: 13;
  max-width: 70%;
  display: flex;
`;

const WrittenMessage = styled.TextInput`
  color: ${props => props.isAuthor ? theme.COLOR_WHITE : theme.COLOR_BLACK};
  font-size: ${theme.FONT_SIZE_MEDIUM};
  font-family: ${theme.FONT_REGULAR};
  text-align: left;
  bottom: 2;
`;

const AuthorText = styled.Text`
  font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
  font-family: ${theme.FONT_BOLD};
  color: ${props => props.authorColor ? props.authorColor : theme.COLOR_BLACK};
  margin-top: -3;
  margin-bottom: 2;
`

export default MessageBubble;