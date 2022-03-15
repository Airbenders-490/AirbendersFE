import React, { Component } from "react";
import { Alert, Modal, Text, Pressable, View } from "react-native";
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { TextBody, Title, Subtitle } from '../../containers/TextContainer.js';

import styled from 'styled-components';
import theme from '../../styles/theme.style.js';
import AddButton from '../../components/AddButton.js'

class CreateTeam extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modalVisible: false,
      teamName: '',
      courseNumber: '',
      maxNum: ''
    }
  };

  setModalVisible = (visible) => { 
    this.setState({ modalVisible: visible }); 
  }

  createTeam = () => { 
    /* add connection */ 
    console.log('create team')
  }
  
  render() {
    const { modalVisible } = this.state;
    return (
    <View> 
        <AddButtonContainer>
            <AddButton buttonText={'Create Team'} addFunction={() => this.setModalVisible(true)}></AddButton>
        </AddButtonContainer>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.modalVisible);
          }}
         >
          <CenterContainer>
            <CreateTeamContainer>
                    <Subtitle>Create team</Subtitle>

                <StyledFlexBox>
                    <TextBody>Team Name: </TextBody>
                    <TextField onChangeText={teamName => this.setState({ teamName: teamName })}></TextField>
                </StyledFlexBox>
                <StyledFlexBox>
                    <TextBody>Course number: </TextBody>
                    <TextField onChangeText={courseNumber => this.setState({ courseNumber: courseNumber })}></TextField>
                </StyledFlexBox>
                <StyledFlexBox>
                    <TextBody>Maximum number of participants: </TextBody>
                    <NumberField onChangeText={maxNum => this.setState({ maxNum: maxNum })}></NumberField>
                </StyledFlexBox>
                <ButtonContainer>
                    <ConfirmButton onPress={() => this.createTeam()}>
                        <ConfirmButtonText>create</ConfirmButtonText>
                    </ConfirmButton>
                    <CancelButton onPress={() => this.setModalVisible(!modalVisible)}>
                        <CancelButtonText>cancel</CancelButtonText>
                    </CancelButton>
                </ButtonContainer>
            </CreateTeamContainer>
          </CenterContainer>
        </Modal>
      </View>
    );
  }
}

//STYLED-COMPONENTS

const AddButtonContainer = styled.View `
    justify-content: center;
    align-items: center;
`

const CenterContainer = styled.View `
    flex: 1;
    justify-content: center;
    align-items: center;
`

const TextField = styled.TextInput `
    background-color: ${theme.COLOR_LIGHT_GRAY};
    border-radius: 12;
    width: 200;
    padding-left: ${theme.SPACING_XSMALL};
`

const NumberField = styled.TextInput `
    background-color: ${theme.COLOR_LIGHT_GRAY};
    border-radius: 12;
    width: 100;
    padding-left: ${theme.SPACING_XSMALL};
`

const StyledFlexBox = styled.View `
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    padding-vertical: ${theme.SPACING_XSMALL};
`

const ButtonContainer = styled.View `
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const CreateTeamContainer = styled.View `
    flex-direction: row;
    flex-wrap: wrap;
    background-color: ${theme.COLOR_WHITE};
    max-width: 85%;
    border-radius: 12;
    padding-vertical: ${theme.SPACING_MEDIUM};
    padding-horizontal: ${theme.SPACING_MEDIUM};
`

const ConfirmButton = styled.TouchableOpacity `
    background-color: ${theme.COLOR_GREEN};
    border-radius: 12;
    width: 75;
    height: 25;
    align-items: center;
    margin-top: ${theme.SPACING_SMALL};
    padding-horizontal: ${theme.SPACING_SMALL};
`

const CancelButton = styled.TouchableOpacity `
    background-color: ${theme.COLOR_RED};
    border-radius: 12;
    width: 75;
    height: 25;
    align-items: center;
    margin-left: ${theme.SPACING_SMALL};
    margin-top: ${theme.SPACING_SMALL};
    padding-horizontal: ${theme.SPACING_SMALL};
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

export default CreateTeam;
