import React, { Component } from "react";
import { Modal, View } from "react-native";
import { TextBody, Subtitle } from '../../containers/TextContainer.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styled from 'styled-components';
import theme from '../../styles/theme.style.js';
import AddButton from '../../components/AddButton.js'

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
    this.getConfig = this.getConfig.bind(this)
    this.getData = this.getData.bind(this)
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  getConfig = (token) => {
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }

  getData = async (key) => {
    try {
      return await AsyncStorage.getItem(key)
    } catch (e) {
      // error reading value
      return e;
    }
  }

  createTeam = async () => {

    if (this.state.teamName !== "" && this.state.courseNumber !== "") {

      console.log('create team')
      let room = {
        "room_id": this.state.teamName.trim(),
        "name": this.state.teamName.trim(),
        "class": this.state.courseNumber.toLowerCase().trim(),
        "max_participants": parseInt(this.state.maxNum.trim()) // might want to check it's an int beforehand
      }
      axios
        .post(`http://real.encs.concordia.ca/chat/api/rooms`, room, this.getConfig(await this.getData("token")))
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
      alert("Team name and course values are mandatory to create a team")
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
    width: 60%;
    padding-left: ${theme.SPACING_XSMALL};
`

const NumberField = styled(TextField)`
    width: 30%;
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
