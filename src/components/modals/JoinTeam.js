import React, { Component } from "react";
import { Alert, Modal, Text, Pressable, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';

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
  background-color: #fff;
  max-width: 60%;
  justify-content: center;
  align-items: center;
  border-radius: 12;
  padding-vertical: 10;
  padding-horizontal: 10;
`
const TempButton = styled.Pressable `
  background-color: #7A54F7;
  align-items: center;
  border-radius: 12;
  padding-vertical: 10;
  padding-horizontal: 10;  
`
const TempButtonText = styled.Text `
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12;
`
const JoinTeamText = styled.Text `
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12;
  letter-spacing: 2;
  padding-vertical: 15;
  padding-horizontal: 10;
  line-height: 20;
  align-items: center;
`;

const ConfirmButton = styled.TouchableOpacity `
  background-color: #0CD59E;
  width: 50;
  border-radius: 12;
  height: 25;
  align-items: center;
  margin-top: 10;
  margin-bottom: 30;
`

const CancelButton = styled.TouchableOpacity `
  background-color: #EE3861;
  width: 50;
  border-radius: 12;
  height: 25;
  align-items: center;
  margin-left: 10;
`
const ConfirmButtonText = styled.Text `
  align-items: center;
  color: #fff;
  font-weight: bold;
  font-size: 12;
  letter-spacing: 2;
  margin-top: 6;
`;

const CancelButtonText = styled.Text `
  align-items: center;
  color: #fff;
  font-weight: bold;
  font-size: 12;
  letter-spacing: 2;
  margin-top: 6;
`;

export default JoinTeam;
