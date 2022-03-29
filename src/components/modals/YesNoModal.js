import React, { Component } from "react";
import { Modal, View, Pressable } from "react-native";
import styled from 'styled-components';
import theme from '../../styles/theme.style.js';

class YesNoModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    }
  };

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

  handleConfirm = (confirmHandler) => {
    this.setModalVisible(!this.state.modalVisible)
    if (confirmHandler) {
      confirmHandler()
    }
  }

  handleCancel = (cancelHandler) => {
    this.setModalVisible(!this.state.modalVisible)
    if (cancelHandler) {
      cancelHandler()
    }
  }

  render() {
    const { modalVisible } = this.state;
    const { modalMessage, modalButtonStyle, handleConfirm, handleCancel, openModalButton } = this.props
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => this.setModalVisible(!modalVisible)}
        >
          <CenterContainer>
            <ModalContainer>
              <ModalMessage>{modalMessage}</ModalMessage>
              <ModalButtonsContainer>
                <ConfirmButton onPress={() => this.handleConfirm(handleConfirm)}>
                  <ButtonText>Yes</ButtonText>
                </ConfirmButton>
                <SpaceBwButtons />
                <CancelButton onPress={() => this.handleCancel(handleCancel)}>
                  <ButtonText>No</ButtonText>
                </CancelButton>
              </ModalButtonsContainer>
            </ModalContainer>
          </CenterContainer>
        </Modal>
        <Pressable
          onPress={() => this.setModalVisible(true) }
          style={modalButtonStyle ? modalButtonStyle : {}}
        >
          {openModalButton()}
        </Pressable>
      </View>
    );
  }
}

//STYLED-COMPONENTS
const CenterContainer = styled.View `
  flex: 1;
  justify-content: center;
  align-items: center;
  `

const ModalContainer = styled.View `
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${theme.COLOR_WHITE};
  max-width: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 12;
  padding-vertical: ${theme.SPACING_SMALL};
  padding-horizontal: ${theme.SPACING_SMALL};
`

const ModalButtonsContainer = styled.View `
  flex-direction: row;
  padding-bottom: 10px;
`

const ModalMessage = styled.Text `
  text-transform: uppercase;
  font-weight: bold;
  font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
  letter-spacing: ${theme.LETTER_SPACING_MEDIUM};
  padding-vertical: ${theme.SPACING_MEDIUM};
  padding-horizontal: ${theme.SPACING_SMALL};
  line-height: ${theme.SPACING_MEDIUM};
  align-items: center;
`;

const ModalButton = styled.Pressable `
  border-radius: 100;
  padding-vertical: 10;
  padding-horizontal: 10;
  elevation: 2;
  width: 70;
  font-weight: bold;
  font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
`

const ConfirmButton = styled(ModalButton) `
  background-color: ${theme.COLOR_GREEN};
`

const CancelButton = styled(ModalButton) `
  background-color: ${theme.COLOR_RED};
`

const SpaceBwButtons = styled.View `
  width:10;
`

const ButtonText = styled.Text `
  text-align: center;
  color: ${theme.COLOR_WHITE};
  font-weight: bold;
  font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
  letter-spacing: ${theme.LETTER_SPACING_MEDIUM};
  text-transform: uppercase;
  flex-direction: row;
`;

export default YesNoModal;
