import React,  { Component, } from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import PropTypes from 'prop-types';
import SendIcon from '../assets/images/icons/right-arrow.png';
import { Keyboard } from 'react-native';


class MessageInput extends Component {
  constructor(props) {
        super(props);
        this.state = {
          message: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

  onSubmit() {
    if (this.props.sendMessageAction) {
      this.props.sendMessageAction(this.state.message)
    }
    this.textInput.clear()
    Keyboard.dismiss()
  }

  onTextChange(text) {
    this.setState({message: text})
  }

    onTextChange(text) {
      this.setState({message: text})
    }


  render() {
    return (
      <MessageInputContainer>
          <MessageTextInput ref={input => { this.textInput = input }} onChangeText={this.onTextChange}
            value={this.state.message} multiline={true} placeholder='Message' onSubmitEditing={this.onSubmit}></MessageTextInput >
          <SendButton onPress={this.onSubmit}>
              <CustomSendButton source= {SendIcon}></CustomSendButton>
          </SendButton>
      </MessageInputContainer>

    );
  }
}

const MessageInputContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: ${theme.SPACING_MEDIUM};
    padding-right: ${theme.SPACING_XSMALL};
    padding-vertical: ${theme.SPACING_XSMALL};
    backgroundColor: ${theme.COLOR_LIGHT_GRAY};
    border-radius: 25;
    width: 100%;
`;

const MessageTextInput = styled.TextInput`
    font-size: ${theme.FONT_SIZE_MEDIUM};
    font-family: ${theme.FONT_REGULAR};
    color: ${(props) => (props.textColor ? props.textColor : theme.COLOR_BLACK)};
    width: 85%;
`;


const CustomSendButton = styled.Image `
    tintColor: ${theme.COLOR_WHITE};
    width: 16;
    height: 16;
`;

const SendButton = styled.TouchableOpacity `
    align-items: center;
    justify-content: center;
    backgroundColor: ${theme.COLOR_ORANGE};
    borderRadius: 17.5;
    width: 35;
    height: 35;

    elevation: 3;
    shadowColor: ${theme.COLOR_ORANGE};
    shadowOpacity: ${props => props.backgroundColor ? '0.4' : '0.7'};
    shadowRadius: 10;
`;

MessageInput.propTypes = {
  placeholder: PropTypes.string.isRequired
};

export default MessageInput;
