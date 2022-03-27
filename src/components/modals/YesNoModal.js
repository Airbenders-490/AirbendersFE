import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Alert, Modal, Pressable } from "react-native";
import theme from '../../styles/theme.style.js';

class YesNoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      text: ''
    };
  }

  getConfig = (token) => {
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{this.props.modalMessage}</Text>

              {this.props.needInput &&
                <TextInput
                  placeholder={this.props.placeHolder ? this.props.placeHolder: ""}
                  style={styles.input}
                  onChangeText={text => this.setState({ text })}
                />
              }

              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button, styles.buttonClose, styles.submitButton]}
                  onPress={() => {
                    this.setModalVisible(!modalVisible)
                    if (this.props.handleConfirm) {
                      this.props.handleConfirm()
                    }
                  }}
                >
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
                <View style={styles.buttonSpace} />
                <Pressable
                  style={[styles.button, styles.buttonClose, styles.closeButton]}
                  onPress={() => {
                    if (this.props.handleCancel) {
                      this.props.handleCancel()
                    }
                    this.setModalVisible(!modalVisible)
                  }}
                >
                  <Text style={styles.textStyle}>No</Text>
                </Pressable>

              </View>
            </View>
          </View>
        </Modal>

        <Pressable
          onPress={() => this.setModalVisible(true) }
          style={this.props.modalButtonStyle ? this.props.modalButtonStyle : {}}
        >
          {this.props.openModalButton()}
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
    width: 200
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
    borderRadius: 100,
    padding: 10,
    elevation: 2,
    width: 70,
    fontWeight: "bold",
    fontSize: theme.FONT_SIZE_SLIGHT_MEDIUM
  },
  buttonOpen: {
    backgroundColor: theme.COLOR_GREEN,
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
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: theme.FONT_SIZE_SLIGHT_MEDIUM,
    letterSpacing: theme.LETTER_SPACING_MEDIUM
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

export default YesNoModal;