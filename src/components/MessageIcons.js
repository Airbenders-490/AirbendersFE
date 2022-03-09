import React, { Component } from 'react';
import styled from 'styled-components';
import EditIcon from '../assets/images/icons/edit-icon.png';
import PinIcon from '../assets/images/icons/pin.png';
import TrashIcon from '../assets/images/icons/trash-icon.png';
import SaveIcon from '../assets/images/icons/save-icon.png';
import theme from '../styles/theme.style.js';
import { Container, Button, View, TouchableOpacity, Text, Image, Alert, StyleSheet} from 'react-native';

class MessageIcons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSaveButton: false,
    }
  }

  render() {
    const createTwoButtonAlert = () =>
    Alert.alert(
      "Are you sure?",
      "Do you really want to delete the message?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => {
          console.log("OK Pressed");
          this.props.triggerOption('DELETE');
        } }
      ]
    );

    return (
      <MessageIconsContainer isDisplayed={this.props.isDisplayed}>
        <BubbleButton onPress={() => {this.props.triggerOption('EDIT'), this.setState({showSaveButton: !this.state.showSaveButton})}} isHidden={!this.props.isAuthor}>
          <EditButton source={this.state.showSaveButton ? SaveIcon: EditIcon} />
        </BubbleButton>

        <BubbleButton onPress={createTwoButtonAlert} isHidden={!this.props.isAuthor}>
          <TrashButton source={TrashIcon} />
        </BubbleButton>

        <BubbleButton onPress={() => this.props.triggerOption('PIN')}>
          <PinButton source={PinIcon}  isLeftHandside={this.props.isAuthor} />
        </BubbleButton>
      </MessageIconsContainer>  
    ); 
  }
}

// STYLED-COMPONENTS
const MessageIconsContainer = styled.View`
  display: ${(props) => props.isDisplayed ? 'flex' : 'none'};
  flex-direction: row;
  align-items: center;
`;

const BubbleButton = styled.TouchableOpacity `
  margin-horizontal: 2;
  display: ${(props) => props.isHidden ? 'none' : 'flex'}
`;

const EditButton = styled.Image `
  tint-color: ${theme.COLOR_ORANGE};
  width: 18;
  height: 18;
`;

const TrashButton = styled.Image `
  tint-color: ${theme.COLOR_ORANGE};
  width: 20;
  height: 20;
`;

const PinButton = styled.Image `
  tint-color: ${theme.COLOR_ORANGE};
  width: 16;
  height: 16;
  margin-right: ${(props) => props.isLeftHandside ? theme.SPACING_SMALL : 0};
  margin-left: ${(props) => props.isLeftHandside ? 0 : theme.SPACING_SMALL};
`;
  
export default MessageIcons;
