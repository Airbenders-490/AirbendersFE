import React,  { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, View, TouchableOpacity, Text, Image, ScrollView, Pressable, TouchableHighlightBase} from 'react-native';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import { Subtitle } from '../containers/TextContainer.js';
import Label from './Label.js';

class ParticipantListItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isAdmin: true,
    }
    this.acceptRequest = this.acceptRequest.bind(this);
    this.denyRequest = this.denyRequest.bind(this);

  };

    acceptRequest() {
      console.log('accept participant')
      // TODO: Add connection
    }

    denyRequest() {
      console.log('deny participant')
      // TODO: Add connection
    }

    setTeamFormationColor(status) {
      let color;

      switch(status) {
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
  
    render() {
      return (
        <MainContainer isElevated>
          <ContentContainer>
            <ContentLHS>
              <Label isReadOnly labelColor={theme.COLOR_ORANGE}>{this.props.commonClass}</Label>
              <ParticipantName>{this.props.participantName}</ParticipantName>
            </ContentLHS>
            
              <ButtonsContainer isAdmin={this.props.isAdmin}>
                <TouchableOpacity onPress={this.acceptRequest} >
                  <Label isReadOnly labelColor={theme.COLOR_GREEN}>ACCEPT</Label>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.denyRequest}>
                  <Label isReadOnly labelColor={theme.COLOR_RED}>DENY</Label>
                </TouchableOpacity>
              </ButtonsContainer>
            
            <TeamFormationStatus statusColor={this.setTeamFormationColor(this.props.userTeamStatus)} />
          </ContentContainer>
        </MainContainer>
      );
    }
}

const ContentContainer = styled.View `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ContentLHS = styled.View `
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ParticipantName = styled.Text `
  font-family: ${theme.FONT_SEMIBOLD};
  font-size: ${theme.FONT_SIZE_SLIGHT_LARGE};
  text-transform: capitalize;
`;

const ButtonsContainer = styled.View `
  display: ${props => props.isAdmin ? 'flex' : 'none'};
  flex-direction: row;
`;

const TeamFormationStatus = styled.View `
  width: 10;
  height: 10;
  border-radius: 5;
  background: ${props => props.statusColor};
`;

export default ParticipantListItem;