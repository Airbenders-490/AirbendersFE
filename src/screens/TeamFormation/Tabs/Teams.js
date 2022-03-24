import React,  { Component, } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import ListContainer from '../../../containers/ListContainer.js';
import TeamListItem from '../../../components/TeamListItem';
import JoinTeam from '../../../components/modals/JoinTeam.js';
import CreateTeam from '../../../components/modals/CreateTeam.js';

class Teams extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
          <TeamsTabContainer>
            <ListContainer>
             {/* placing these for visualization */}
            <TeamListItem
              title="Airbenders"
              courseNumber="SOEN 490"
              numberCurrentParticipants={3}
              numberTotalParticipants={5} />
            <TeamListItem
              title="Momas"
              courseNumber="ENGR 490"
              numberCurrentParticipants={5}
              numberTotalParticipants={10} />
            <TeamListItem
              title="Fire"
              courseNumber="SOEN 385"
              numberCurrentParticipants={2}
              numberTotalParticipants={4} />

            {/* <JoinTeam 
              teamName='X'
              >
            </JoinTeam> */}
              <CreateTeam/>
            </ListContainer>
          </TeamsTabContainer>
        );
    }
}

const TeamsTabContainer = styled.View`
  height: 100%
`;

export default function(props) {
    const navigation = useNavigation();
    return <Teams {...props} navigation={navigation} />;
 }
  