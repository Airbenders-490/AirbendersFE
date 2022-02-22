import React, { Component } from "react";
import { Alert, Modal, Text, Pressable, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';
import theme from '../../styles/theme.style.js';

class JoinTeam extends Component {
  constructor(props) {
    super(props);
  }  
  state = {
    modalVisible: false,
    joinTeam: false
  };

  setModalVisible = (visible) => { this.setState({ modalVisible: visible }); }

  /* add connection */ 
  joinTeam = () => { 
      /* temporary alert */ 
    Alert.alert("Joined!");
    this.setState({ }); 
  }
  
  render() {
    const { modalVisible } = this.state;
    return (
      <CenterContainer>
        <TempButton
          /* temporary button to visualize modal */ 
          onPress={() => this.setModalVisible(true)}
        >
          <TempButtonText>Join Team</TempButtonText>
        </TempButton>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}
        >
          <CenterContainer>
            <JoinTeamContainer>
              <JoinTeamText>Are you sure you want to join {this.props.teamName} team?</JoinTeamText>
              <ConfirmButton onPress={() => this.joinTeam()}>
                <ConfirmButtonText>Yes</ConfirmButtonText>
              </ConfirmButton>
              <CancelButton onPress={() => this.setModalVisible(!modalVisible)}>
                <CancelButtonText>No</CancelButtonText>
              </CancelButton>
            </JoinTeamContainer>
          </CenterContainer>
        </Modal>
      </CenterContainer>
    );
  }
}

//STYLED-COMPONENTS
const CenterContainer = styled.View `
  flex: 1;
  justify-content: center;
  align-items: center;
  `

const JoinTeamContainer = styled.View `
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${theme.COLOR_WHITE};
  max-width: 60%;
  justify-content: center;
  align-items: center;
  border-radius: 12;
  padding-vertical: ${theme.SPACING_SMALL};
  padding-horizontal: ${theme.SPACING_SMALL};
`
const TempButton = styled.Pressable `
  background-color: ${theme.COLOR_PURPLE};
  align-items: center;
  border-radius: 12;
  padding-vertical: ${theme.SPACING_SMALL};
  padding-horizontal: ${theme.SPACING_SMALL};  
`
const TempButtonText = styled.Text `
  color: ${theme.COLOR_WHITE};
  text-transform: uppercase;
  font-weight: bold;
  font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
`
const JoinTeamText = styled.Text `
  text-transform: uppercase;
  font-weight: bold;
  font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
  letter-spacing: ${theme.LETTER_SPACING_MEDIUM};
  padding-vertical: ${theme.SPACING_MEDIUM};
  padding-horizontal: ${theme.SPACING_SMALL};
  line-height: ${theme.SPACING_MEDIUM};
  align-items: center;
`;

const ConfirmButton = styled.TouchableOpacity `
  background-color: ${theme.COLOR_GREEN};
  width: 50;
  border-radius: 12;
  height: 25;
  align-items: center;
  margin-top: ${theme.SPACING_SMALL};
  margin-bottom: 30;
`

const CancelButton = styled.TouchableOpacity `
  background-color: ${theme.COLOR_RED};
  width: 50;
  border-radius: 12;
  height: 25;
  align-items: center;
  margin-left: ${theme.SPACING_SMALL};
`
const ConfirmButtonText = styled.Text `
  align-items: center;
  color: ${theme.COLOR_WHITE};
  font-weight: bold;
  font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
  letter-spacing: ${theme.LETTER_SPACING_MEDIUM};
  margin-top: 6;
`;

const CancelButtonText = styled.Text `
  align-items: center;
  color: ${theme.COLOR_WHITE};
  font-weight: bold;
  font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
  letter-spacing: ${theme.LETTER_SPACING_MEDIUM};
  margin-top: 6;
`;

export default JoinTeam;