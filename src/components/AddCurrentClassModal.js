import React, { useState, Component } from "react";
import { Button, Text, View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, Pressable } from "react-native";
import axios from 'axios';
import theme from '../styles/theme.style.js';
import styled from 'styled-components';
import { Subtitle, TextBody } from '../containers/TextContainer.js';

class AddCurrentClassModal extends Component {
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

    console.log("Current class entered: " + this.state.text.toLowerCase());
    let student = {
      "current_classes": [this.state.text.toLowerCase().trim()]
    }


    if (this.state.text.trim() !== '') {
      axios
        .put(`http://real.encs.concordia.ca/profile/api/addClasses/${this.props.userID}`, student, this.config(this.props.token))
        .then(
          response => {
            console.log("ADD CURRENT CLASS RESPONSE " + response.data);
            this.props.getCurrentUser()
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
            <View style={styles.modalView}>
              <TextBody>Add A Current Class</TextBody>

              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ text })}
              />

              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button, styles.buttonClose, styles.submitButton]}
                  onPress={() => {
                    this.setModalVisible(!modalVisible)
                    this.handleSubmit()

                  }}
                >
                  <Subtitle subtitleColor={theme.COLOR_WHITE}>Submit</Subtitle>
                </Pressable>
                <View style={styles.buttonSpace} />
                <Pressable
                  style={[styles.button, styles.buttonClose, styles.closeButton]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Subtitle subtitleColor={theme.COLOR_WHITE}>Cancel</Subtitle>
                </Pressable>

              </View>

            </View>
          </Container>
        </Modal>

        <TouchableOpacity onPress={() => this.setModalVisible(true)}>
          <Subtitle subtitleColor={theme.COLOR_GRAY}>+</Subtitle>
        </TouchableOpacity>
      </View>
    );
  }
}

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
    padding: 10,
    width: 90,
    backgroundColor: theme.COLOR_LIGHT_GRAY,
    borderRadius: 100,
  },
  centeredView: {
    // flex: 1,
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
    padding: 10,
    elevation: 2,
    width: '90%'
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

export default AddCurrentClassModal;