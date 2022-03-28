import React,  { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, View, TouchableOpacity, Text, Image, ScrollView, Pressable} from 'react-native';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import { Subtitle } from '../containers/TextContainer.js';
import Label from './Label.js';

class ParticipantListItem extends Component {
    constructor(props) {
      super(props);
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
        <MainContainer isElevated padding={theme.SPACING_SMALL}>
          <ContentContainer>
            <ContentLHS>
              <Label isCaption isReadOnly labelColor={theme.COLOR_ORANGE}>{this.props.commonClass}</Label>
              <ParticipantName>{this.props.participantName}</ParticipantName>
            </ContentLHS>
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

const TeamFormationStatus = styled.View `
  width: 10;
  height: 10;
  border-radius: 5;
  background: ${props => props.statusColor};
`;

export default ParticipantListItem;