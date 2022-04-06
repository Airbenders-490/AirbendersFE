import React,  { Component, } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styled from 'styled-components';
import { AuthAPI } from '../../../api/auth.js';
import ListContainer from '../../../containers/ListContainer.js';
import TeamListItem from '../../../components/TeamListItem';
import CreateTeam from '../../../components/modals/CreateTeam.js';
import theme from '../../../styles/theme.style.js';

class Teams extends Component {
    constructor(props) {
      super(props);

      this.state = {
        teams: [],
        tabName: "team"
      }

      this.onSearchTeamByClass = this.onSearchTeamByClass.bind(this)
    }

    onSearchTeamByClass = async (className) => {
      let config
      try{
        config = await AuthAPI.getConfig()
      } catch(err) {
        console.log(err)
        // TODO: redirect to login
        return
      }

      if (className !== "") {
        axios.get(`http://real.encs.concordia.ca/chat/api/rooms/class/${className.toLowerCase().trim()}`, config)
        .then(res => {
          this.setState({teams: res.data})
        })
        .catch(err => console.log(err))
      }
    }


    render() {

      let displayTeams = this.state.teams.map(team => {
        return (
          <TeamListItem
          navigation={this.props.navigation}
          title={team.name}
          teamID={team.room_id}
          participants={team.students}
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
              marginBottom={40}
            >
            {displayTeams}
              <CreateTeam navigation={this.props.navigation} />
            </ListContainer>
          </TeamsTabContainer>
        );
    }
}

const TeamsTabContainer = styled.View`
  height: 100%;
  background-color: ${theme.COLOR_WHITE};
`;

export default function(props) {
    const navigation = useNavigation();
    return <Teams {...props} navigation={navigation} />;
 }
