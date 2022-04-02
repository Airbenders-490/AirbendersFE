import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Alert, Modal, Pressable } from "react-native";
import { TextBody, Subtitle } from '../containers/TextContainer.js';

import axios from 'axios';
import theme from '../styles/theme.style.js';
import styled from 'styled-components';

class AddClassesTakenModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      text: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  config = (token) => {
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  handleSubmit = () => {

    console.log("Class taken entered: " + this.state.text.toLowerCase());
    let student = {
      "classes_taken": [this.state.text.toLowerCase().trim()]
    }


    if (this.state.text.trim() !== '') {
      axios
        .put(`http://real.encs.concordia.ca/profile/api/addClasses/${this.props.userID}`, student, this.config(this.props.token))
        .then(
          response => {
            console.log("ADD CLASS TAKEN RESPONSE " + response.data);
            this.props.getCurrentUser();
          }
        )
        .catch(
          // TODO: On 404, block all access to app until register is complete
          error => console.log(error)
        )
    }

  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <CenterContainer>
            <ModalContainer>
              <ModalTitle>Add A Class Taken</ModalTitle>
                <StyledFlexBox>
                  <TextField
                    onChangeText={text => this.setState({ text })}
                  />
                </StyledFlexBox>

              <ButtonContainer>
                <ConfirmButton
                  onPress={() => {
                    this.setModalVisible(!modalVisible)
                    this.handleSubmit()

                  }}
                >
                  <ButtonText>Submit</ButtonText>
                </ConfirmButton>
                <CancelButton
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <ButtonText>Cancel</ButtonText>
                </CancelButton>
              </ButtonContainer>
            </ModalContainer>
          </CenterContainer>
        </Modal>

        <ModalButton>
            <OpenModalButton onPress={() => this.setModalVisible(true)}>
              <ButtonText>Add</ButtonText>
            </OpenModalButton>
        </ModalButton>
      </View>
    );
  }
}

const ModalButton = styled.View `
    justify-content: center;
    align-items: center;
    margin-top: 15;
`

const TitleContainer = styled.View `
    align-items: center;
`

const ModalTitle = styled.Text `
    font-family: ${theme.FONT_SEMIBOLD};
    font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
    letter-spacing: ${theme.LETTER_SPACING_MEDIUM};
    text-transform: uppercase;  
`

const CenterContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`
const TextField = styled.TextInput`
    background-color: ${theme.COLOR_WHITE};
    width: 40%;
    borderWidth: 1;
    height: 100%;
    padding-left: ${theme.SPACING_SMALL};
    justify-content: center;  
  `

const OpenModalButton = styled.Pressable `
  background-color: #F194FF;
  align-items: center;
  border-radius: 100;
  width: 35%;
  padding-vertical: ${theme.SPACING_SMALL};
  padding-horizontal: ${theme.SPACING_SMALL};  
`

const StyledFlexBox = styled.View`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    margin-top: 10;
    margin-bottom: 10;
`

const ButtonContainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const ModalContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    background-color: ${theme.COLOR_WHITE};
    max-width: 65%;
    border-radius: 12;
    padding-vertical: ${theme.SPACING_MEDIUM};
    padding-horizontal: ${theme.SPACING_MEDIUM};
    shadowColor: ${theme.COLOR_BLACK};
    shadowOpacity: 0.25;
    shadowRadius: 4;
    elevation: 5;
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


export default AddClassesTakenModal;