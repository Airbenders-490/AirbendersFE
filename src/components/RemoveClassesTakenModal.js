import React, { useState, Component } from "react";
import { Button, Text, View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, Pressable } from "react-native";
import axios from 'axios';
import theme from '../styles/theme.style.js';


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

    console.log("Class taken entered: " + this.state.text.toLowerCase());
    let student = {
      "classes_taken": [this.state.text.toLowerCase()]
    }


    if (this.state.text.trim() !== '') {
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Remove A Class Taken</Text>

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
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
                <View style={styles.buttonSpace} />
                <Pressable
                  style={[styles.button, styles.buttonClose, styles.closeButton]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>

              </View>

            </View>
          </View>
        </Modal>

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Remove</Text>
        </Pressable>
      </View>
    );
  }
}

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
    marginTop: 22
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

export default RemoveClassesTakenModal;