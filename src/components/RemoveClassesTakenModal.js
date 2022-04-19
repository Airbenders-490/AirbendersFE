import React, { useState, Component } from "react";
import { Button, Text, View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, Pressable } from "react-native";
import axios from 'axios';
import theme from '../styles/theme.style.js';
import RemoveIcon from '../assets/images/icons/deny-icon.png';
import styled from 'styled-components';
import { Subtitle, TextBody } from '../containers/TextContainer.js';

class RemoveClassesTakenModal extends Component {
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
    let student = {
      "classes_taken": [this.props.classToRemove.toLowerCase().trim()]
    }


    if (this.props.classToRemove.trim() !== '') {
      axios
        .put(`http://real.encs.concordia.ca/profile/api/removeClasses/${this.props.userID}`, student, this.config(this.props.token))
        .then(
          response => {
            console.log("REMOVE CLASS TAKEN RESPONSE " + response.data);
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
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <Container isDimBackground={this.state.modalVisible} onPress={() => this.setModalVisible(false)}>
            <Pressable style={styles.modalView}>
              <TextBody>Do you wish to remove {this.props.classToRemove}?</TextBody>

              {/* <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ text })}
              /> */}

              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button, styles.buttonClose, styles.submitButton]}
                  onPress={() => {
                    this.setModalVisible(!modalVisible)
                    this.handleSubmit()

                  }}
                >
                  <Subtitle subtitleColor={theme.COLOR_WHITE}>Yes</Subtitle>
                </Pressable>
                <View style={styles.buttonSpace} />
                <Pressable
                  style={[styles.button, styles.buttonClose, styles.closeButton]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Subtitle subtitleColor={theme.COLOR_WHITE}>No</Subtitle>
                </Pressable>

              </View>

            </Pressable>
          </Container>
        </Modal>

        <TouchableOpacity onPress={() => this.setModalVisible(true)}>
          <LabelIcon source={RemoveIcon}/>
        </TouchableOpacity>
      </View>
    );
  }
}


const LabelIcon = styled.Image`
  tintColor: ${theme.COLOR_YELLOW};
  width: 18;
  height: 18;
`;

const Container = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.isDimBackground ? "rgba(0, 0, 0, 0.5)" : 'transparent'};
`;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,  
    width: 90
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 8,
    elevation: 2,
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
    width: '35%'
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flexDirection: 'row'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalButtons: {
    width: '40%',
    flexDirection: 'row',
    padding: 10
  },
  buttonSpace: {
    width: 10
  },
  submitButton: {
    backgroundColor: theme.COLOR_GREEN
  },
  closeButton: {
    backgroundColor: theme.COLOR_RED
  }
});

export default RemoveClassesTakenModal;