import React, { Component } from 'react';
import styled from 'styled-components';
import EditIcon from '../assets/images/icons/edit-icon.png';
import PinIcon from '../assets/images/icons/pin.png';
import TrashIcon from '../assets/images/icons/trash-icon.png';
import theme from '../styles/theme.style.js';
import { Container, Button, View, TouchableOpacity, Text, Image, Alert, StyleSheet} from 'react-native';

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
    { text: "Yes", onPress: () => console.log("OK Pressed") }
  ]
);
class MessageIcons extends Component {


  render() {
    return (
      <MessageIconsContainer>
              <ClickEdit onPress={this.onButtonPress}>
                  <EditButton source= {EditIcon}/>
              </ClickEdit>

              <ClickTrash onPress={createTwoButtonAlert}>
                  <TrashButton source= {TrashIcon}/>
              </ClickTrash>

              <ClickPin onPress={this.onButtonPress}>
                  <PinButton source= {PinIcon}/>
              </ClickPin>
      </MessageIconsContainer>
      
    ); 
  }

  }

  
  // STYLED-COMPONENTS
  const MessageIconsContainer = styled.View`
    flexDirection: row;
    left: 230;
`;

const ClickEdit = styled.TouchableOpacity `
    alignItems: center;
    top: 4;
`;

const ClickTrash = styled.TouchableOpacity `
    alignItems: center;
    top: 4;
`;

const ClickPin = styled.TouchableOpacity `
    alignItems: center;
    top: 4;
`;

const EditButton = styled.Image `
    tintColor: ${theme.COLOR_ORANGE};
    width: 20;
    height: 20;
`;

const TrashButton = styled.Image `
    tintColor: ${theme.COLOR_ORANGE};
    width: 20;
    height: 20;
`;

const PinButton = styled.Image `
    tintColor: ${theme.COLOR_ORANGE};
    width: 20;
    height: 20;
`;


  
  export default MessageIcons;
