import React,  { Component, } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import ListContainer from '../../../containers/ListContainer.js';
import TeamListItem from '../../../components/TeamListItem';
import JoinTeam from '../../../components/modals/JoinTeam.js';
import CreateTeam from '../../../components/modals/CreateTeam.js';

class Teams extends Component {
    constructor(props) {
      super(props);

      this.state = {
        teams: [],
        tabName: "team"
      }

      this.onSearchTeamByClass = this.onSearchTeamByClass.bind(this)
    }

    getConfig = (token) => {
      return {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
    }

    onSearchTeamByClass = async (className) => {
      let token
      try{
        token = await AsyncStorage.getItem("token")
      } catch(err) {
        console.log(err)
        // TODO: redirect to login
        return
      }

      if (className !== "") {
        axios.get(`http://real.encs.concordia.ca/chat/api/rooms/class/${className.toLowerCase().trim()}`, this.getConfig(token))
        .then(res => {
          console.log(res.data)
          this.setState({teams: res.data})
        })
        .catch(err => console.log(err))
      }
    }


    render() {

      let displayTeams = this.state.teams.map(team => {
        console.log(team)

        return (
          <TeamListItem
          title={team.name}
          courseNumber={team.class}
          numberCurrentParticipants={team.students.length}
          numberTotalParticipants={team.max_participants} />
        )
      })

        return (
          <TeamsTabContainer>
            <ListContainer
              tabName={this.state.tabName}
              onSearchTeamByClass={this.onSearchTeamByClass}
            >
            {displayTeams}
             {/* placing these for visualization */}
            {/* <TeamListItem
              title="Airbenders"
              courseNumber="SOEN 490"
              numberCurrentParticipants={3}
              numberTotalParticipants={5} />
            <TeamListItem
              title="Momas"
              courseNumber="ENGR 490"
              numberCurrentParticipants={5}
              numberTotalParticipants={10} /> */}

              {/* <JoinTeam teamName='X'/> */}
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
