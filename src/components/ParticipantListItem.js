import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Button, View, TouchableOpacity, Text, Image, ScrollView, Pressable, TouchableHighlightBase, Dimensions } from 'react-native';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import { Subtitle } from '../containers/TextContainer.js';
import Label from './Label.js';
import AcceptIcon from '../assets/images/icons/accept-icon.png'
import DenyIcon from '../assets/images/icons/deny-icon.png'

const totalWidth = Dimensions.get('window').width;

class ParticipantListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      decisionMade: false,
      updateToggle: false
    }

    this.acceptRequest = this.acceptRequest.bind(this);
    this.denyRequest = this.denyRequest.bind(this);
    this.removeParticipantFromRoom = this.removeParticipantFromRoom.bind(this)
  };

  getConfig = (token) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
  }

  acceptRequest = async () => {
    console.log("accept participant");

    let token
    try{
      token = await AsyncStorage.getItem("token")
    } catch(err) {
      console.log(err)
    }

    axios
        .put(`http://real.encs.concordia.ca/chat/api/rooms/add/${this.props.roomID}/${this.props.participantID}`,{}, this.getConfig(token))
        // .put(`http://real.encs.concordia.ca/chat/api/rooms/add/${this.props.roomID}/${this.props.participantID}`,{}, config) // for testing w/out login
        .then(
            response => {
                console.log(response.data);
                this.props.getChatRooms()
                this.setState({decisionMade: true})
            }
        )
        .catch(
            error => console.log(error)
        )
  }

  denyRequest = async () => {
    console.log("deny participant");

    let token
    try{
      token = await AsyncStorage.getItem("token")
    } catch(err) {
      console.log(err)
    }

    axios
        .post(`http://real.encs.concordia.ca/chat/api/chat/rejectRequest/${this.props.roomID}/${this.props.participantID}`,{}, this.getConfig(token))
        // .post(`http://real.encs.concordia.ca/chat/api/chat/rejectRequest/${this.props.roomID}/${this.props.participantID}`,{}, config) // for testing w/out login
        .then(
            response => {
                console.log(response.data);
                // trying to force re-render to remove accept/decline buttons
                this.props.getChatRooms()
                this.setState({decisionMade: true})
            }
        )
        .catch(
            error => {
              console.log(error)
              console.log(error.message)
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              console.log(error.config)
            }
        )
  }


  setTeamFormationColor(status) {
    let color;

    switch (status) {
      case 'available':
        color = theme.COLOR_GREEN;
        break;
      case 'pending':
        color = theme.COLOR_YELLOW;
        break;
      case 'taken':
        color = theme.COLOR_RED;
        break;
      default:
        color = theme.COLOR_GRAY;
    }

    return color;
  }

  showJoinRequestButtons = () => {
    if (this.props.isAdmin && this.props.userTeamStatus === 'pending' && !this.state.decisionMade) {
      return (
        <ButtonsContainer>
          <ButtonContainer onPress={() => {this.acceptRequest() }}>
            <AcceptButton source={AcceptIcon} />
          </ButtonContainer>
          <ButtonContainer onPress={() => { this.denyRequest() }}>
            <DenyButton source={DenyIcon} />
          </ButtonContainer>
        </ButtonsContainer>
      )
    }
  }

  removeParticipantFromRoom = async () => {
    let token
    let user
    try{
      token = await AsyncStorage.getItem("token")
      user = await AsyncStorage.getItem("userID")
    } catch(err) {
      console.log(err)
    }

    if (this.props.participantID !== user && this.props.isAdmin) {
      alert('Deleting Participant');
      console.log("Deleting Participant");

      axios
      .put(`http://real.encs.concordia.ca/chat/api/rooms/remove/${this.props.roomID}/${this.props.participantID}`,{}, this.getConfig(token))
      // .put(`http://real.encs.concordia.ca/chat/api/rooms/remove/${this.props.roomID}/${this.props.participantID}`,{}, config) // for testing w/out login
      .then(
          response => {
              console.log(response.data);
              this.props.getChatRooms()
              this.setState({updateToggle: !this.state.updateToggle})
          }
      )
      .catch(
          error => {
            console.log(error)
            console.log(error.message)
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error.config)
          }
      )
    } else {
      alert('Cannot delete yourself from the room');
      console.log("Cannot delete yourself from the room")
    }
  };


  render() {
    return (
      <MainContainer marginBottom={5} isElevated>
        <ContentContainer>
          <ContentLHS>
            {this.props.commonClass && <Label isReadOnly labelColor={theme.COLOR_ORANGE}>{this.props.commonClass}</Label>}
            <ParticipantName>{this.props.participantName}</ParticipantName>
          </ContentLHS>
          <ContentRHS>
          {this.showJoinRequestButtons()}
            <TeamFormationStatus onLongPress={() => this.removeParticipantFromRoom()}
            statusColor={this.setTeamFormationColor(this.props.userTeamStatus)} />
          </ContentRHS>
        </ContentContainer>
      </MainContainer>
    );
  }
}

const ContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ContentLHS = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

`;

const ContentRHS = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ParticipantName = styled.Text`
  font-family: ${theme.FONT_SEMIBOLD};
  font-size: ${theme.FONT_SIZE_SLIGHT_LARGE};
  text-transform: capitalize;
`;

const TeamFormationStatus = styled.TouchableOpacity`
  width: 10;
  height: 10;
  border-radius: 5;
  background: ${props => props.statusColor};
`;

const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-right: ${theme.SPACING_SMALL}};
`;

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  margin-right: ${theme.SPACING_XSMALL}};
`;

const AcceptButton = styled.Image`
  height: 25;
  width: 25;
  tintColor: ${theme.COLOR_GREEN};
`

const DenyButton = styled(AcceptButton)`
  tintColor: ${theme.COLOR_RED};
`
export default ParticipantListItem;
