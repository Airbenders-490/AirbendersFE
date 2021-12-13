import React,  { Component, } from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import PropTypes from 'prop-types';
import SendIcon from '../assets/images/icons/right-arrow.png';


class MessageInput extends Component {
  constructor(props) {
        super(props);

        this.onButtonPress = this.onButtonPress.bind(this);

    }

    onButtonPress() {
      if (this.props.onPress) {
        this.props.onPress();
      }
    }

  render() {
    return (
        <MessageInputContainer>
            <MessageTextInput multiline={true} placeholder='Message'></MessageTextInput>
            <MessageText></MessageText>
            <SendButton onPress={this.onButtonPress}>
                <CustomSendButton source= {SendIcon}></CustomSendButton>
            </SendButton>
        </MessageInputContainer>

    );
  }
}

const MessageInputContainer = styled.View`
    padding-horizontal: ${theme.SPACING_SLIGHT_MEDIUM};
    padding-vertical: ${theme.SPACING_SLIGHT_MEDIUM};
    margin-top: ${props => props.marginTop ? props.marginTop : 0}
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : 0}
    display: flex;
    flex-direction: row;
    backgroundColor: ${theme.COLOR_LIGHT_GRAY};
    border-radius: 25;
`;

const MessageTextInput = styled.TextInput`
    font-size: ${theme.FONT_SIZE_MEDIUM};
    font-family: ${theme.FONT_REGULAR};git 
    color: ${(props) => (props.textColor ? props.textColor : theme.COLOR_BLACK)};
    width: 300;
    bottom: 3;
`;


const CustomSendButton = styled.Image `
    tintColor: ${theme.COLOR_WHITE};
    width: 25;
    height: 25;
    top: 5;
`;

const SendButton = styled.TouchableOpacity `
    alignItems: center;
    backgroundColor: ${theme.COLOR_ORANGE};
    borderRadius: 17.5;
    width: 35;
    height: 35;
    left: 330;
    top: 9;
    position: absolute;
    elevation: ${props => props.isElevated ? theme.CARD_ELEVATION : 0};
    shadowColor: ${props => props.backgroundColor ? props.backgroundColor : theme.COLOR_ORANGE};
    shadowOpacity: ${props => props.backgroundColor ? '0.4' : '0.7'};
    shadowRadius: 10;
`;

MessageInput.propTypes = {
  placeholder: PropTypes.string.isRequired
};

export default MessageInput;
