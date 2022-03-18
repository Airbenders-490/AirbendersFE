import React,  { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, View, TouchableOpacity, Text, Image, ScrollView, Pressable, TouchableHighlightBase, Dimensions} from 'react-native';
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

    this.acceptRequest = this.acceptRequest.bind(this);
    this.denyRequest = this.denyRequest.bind(this);

  };

    acceptRequest = () => {
      // TODO: ADD CONNECTION
      console.log("accept participant");  
    }

    denyRequest = () => {
      // TODO: ADD CONNECTION
      console.log("deny participant");
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
            <ContentRHS>
              { this.props.isAdmin && this.props.userTeamStatus == 'pending' &&
                <ButtonsContainer isAdmin={this.props.isAdmin} isPending={this.props.isPending}>
                  <ButtonContainer onPress={() => {this.acceptRequest()}}>
                    <AcceptButton source={ AcceptIcon }/>
                  </ButtonContainer>
                  <ButtonContainer onPress={() => {this.denyRequest()}}>
                    <DenyButton source={ DenyIcon }/>
                  </ButtonContainer>
                </ButtonsContainer>
              } 
              <TeamFormationStatus statusColor={this.setTeamFormationColor(this.props.userTeamStatus)} />
            </ContentRHS>
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
  flex-wrap: wrap;
`;

const ContentLHS = styled.View `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

`;

const ContentRHS = styled.View `
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

const ButtonsContainer = styled.View `
  display: flex;
  flex-direction: row;
  margin-right: ${theme.SPACING_SMALL}};
`;

const ButtonContainer = styled.TouchableOpacity `
  display: flex;
  flex-direction: row;
  margin-right: ${theme.SPACING_XSMALL}};
`;

const AcceptButton = styled.Image `
  height: 25;
  width: 25;
  tintColor: ${theme.COLOR_GREEN};
`

const DenyButton = styled(AcceptButton) `
  tintColor: ${theme.COLOR_RED};
`
export default ParticipantListItem;
