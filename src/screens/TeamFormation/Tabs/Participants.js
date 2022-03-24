import React,  { Component, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ParticipantListItem from '../../../components/ParticipantListItem';
import ListContainer from '../../../containers/ListContainer.js';

class Participants extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <ListContainer marginBottom={50}>
           {/* placing these for visualization */}
          <ParticipantListItem
            participantName={"jane smith"}
            commonClass={'SOEN 490'}
            userTeamStatus={'available'}
            isAdmin={false}
            marginTop={2}
        />
        <ParticipantListItem
            participantName={"john doe"}
            commonClass={'SOEN 385'}
            isAdmin={false}
        />
        <ParticipantListItem
            participantName={"alex moe"}
            commonClass={'SOEN 342'}
            userTeamStatus={'pending'}
            isAdmin={false}
        />
        </ListContainer>
              
      );
    }
}

export default Participants;
