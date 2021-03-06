import React, { Component } from "react";
import { Modal, View, Alert } from "react-native";
import { TextBody, Subtitle } from '../../containers/TextContainer.js';
import axios from 'axios';

import styled from 'styled-components';
import theme from '../../styles/theme.style.js';
import AddButton from '../../components/AddButton.js'
import { AuthAPI } from "../../api/auth.js";

// for testing
let config = {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoibWljaGFlbCIsImxhc3RfbmFtZSI6InNjb3R0IiwiZXhwIjoxNjQ3ODMzMDIwLCJpc3MiOiJlYWY1NGZhZS0xYWI4LTRiNWEtODA0Ny01MTkwNGY2YWU4ODQifQ.R8Greivz6C_aUzClFl7lHObv-iFXsHxT_2-qxXvsTG8'
  }
}

class CreateTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      teamName: '',
      courseNumber: '',
      maxNum: ''
    }

    this.createTeam = this.createTeam.bind(this)
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  createTeam = async () => {
    let profileExists
    let config
    try{
      config = await AuthAPI.getConfig()
      profileExists = await AuthAPI.getData('profileExists')
    } catch(err) {
      console.log(err)
      // TODO: redirect to login
      return
    }

    const regex = /^\d+$/g;
    let isnum = regex.test(this.state.maxNum.trim());

    if (profileExists === "true") {

      if (this.state.teamName !== "" && this.state.courseNumber !== "" && isnum) {
        console.log('create team')
        let room = {
          "room_id": this.state.teamName.trim(),
          "name": this.state.teamName.trim(),
          "class": this.state.courseNumber.toLowerCase().trim(),
          "max_participants": parseInt(this.state.maxNum.trim())
        }
        axios
          .post(`http://real.encs.concordia.ca/chat/api/rooms`, room, config)
          // .post(`http://real.encs.concordia.ca/chat/api/rooms`, room, config) // for testing
          .then(
            response => {
              console.log(response.data);
            }
          )
          .catch(
            // TODO: On 404, block all access to app until register is complete
            error => console.log(error.response.data.code)
          )
      } else {
        alert("All fields are mandatory to create a team, max participants is a number")
      }
    } else {
      Alert.alert(
        "Create Profile First",
        "You must fill out your profile (name at least) before using the rest of the app! Tap the GEAR icon to edit and hit SAVE at the BOTTOM"
      );
      this.props.navigation.navigate('Profile')
    }


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
                <ConfirmButton onPress={() => {
                  this.setModalVisible(!modalVisible)
                  this.createTeam()
                }}>
                  <ButtonText>create</ButtonText>
                </ConfirmButton>
                <CancelButton onPress={() => this.setModalVisible(!modalVisible)}>
                  <ButtonText>cancel</ButtonText>
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

const AddButtonContainer = styled.View`
    justify-content: center;
    align-items: center;
`

const CenterContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const TextField = styled.TextInput`
    background-color: ${theme.COLOR_LIGHT_GRAY};
    border-top-left-radius: 100;
    border-bottom-left-radius: 100;
    border-top-right-radius: 100;
    border-bottom-right-radius: 100;
    width: 55%;
    padding-left: ${theme.SPACING_SMALL};
`

const NumberField = styled(TextField)`
    width: 15%;
`

const StyledFlexBox = styled.View`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    padding-vertical: ${theme.SPACING_XSMALL};
`

const ButtonContainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const CreateTeamContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    background-color: ${theme.COLOR_WHITE};
    max-width: 85%;
    border-radius: 12;
    padding-vertical: ${theme.SPACING_MEDIUM};
    padding-horizontal: ${theme.SPACING_MEDIUM};
`

const ConfirmButton = styled.TouchableOpacity`
    background-color: ${theme.COLOR_GREEN};
    border-top-left-radius: 100;
    border-bottom-left-radius: 100;
    border-top-right-radius: 100;
    border-bottom-right-radius: 100;
    width: 35%;
    align-items: center;
    margin-top: ${theme.SPACING_SMALL};
    padding-horizontal: 10;
    padding-vertical: 5;
`

const CancelButton = styled(ConfirmButton)`
    background-color: ${theme.COLOR_RED};
    margin-left: ${theme.SPACING_SMALL};
`

const ButtonText = styled.Text`
    color: ${theme.COLOR_WHITE};
    font-family: ${theme.FONT_SEMIBOLD};
    font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
    letter-spacing: ${theme.LETTER_SPACING_MEDIUM};
    text-transform: uppercase;
`;

export default CreateTeam;
