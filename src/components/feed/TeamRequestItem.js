import React, { Component, } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme.style.js';
import MainContainer from '../../containers/MainContainer.js';
import Label from '../Label.js';

class TeamRequestItem extends Component {
  constructor(props) {
    super(props);
  };

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

  render() {
    return (
      <MainContainer marginBottom={10} isElevated>
        <ContentContainer>
          <ContentLHS>
            {this.props.roomName && <Label isReadOnly labelColor={this.props.labelColor}>{this.props.roomName}</Label>}
            <ParticipantName>{this.props.participantName}</ParticipantName>
          </ContentLHS>
          <ContentRHS>
            <TeamFormationStatus statusColor={this.setTeamFormationColor(this.props.userTeamStatus)} />
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

export default TeamRequestItem;
