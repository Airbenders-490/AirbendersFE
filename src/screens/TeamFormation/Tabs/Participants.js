import React,  { Component, } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import ParticipantListItem from '../../../components/ParticipantListItem';
import ListContainer from '../../../containers/ListContainer.js';
import axios from 'axios';
import styled from 'styled-components';
import theme from '../../../styles/theme.style.js';
import { AuthAPI } from '../../../api/auth';
import RecommendedTeammates from '../../../components/RecommendedTeammates';
import ParticipantUserProfile from './../../ExternalProfile.js';

const Stack = createStackNavigator();

class Participants extends Component {
    constructor(props) {
      super(props);
      this.state = {
        participants: [],
        tabName: "participant"
      }
      this.onParticipantSearch = this.onParticipantSearch.bind(this)
      this.onParticipantsFilter = this.onParticipantsFilter.bind(this)
      this.navigateToStudentProfile = this.navigateToStudentProfile.bind(this)
    }

    onParticipantSearch = async (name) => {
      const config = await AuthAPI.getConfig()

      axios.get(`http://real.encs.concordia.ca/profile/api/search/?firstName=${name}`, config)
        .then(res => this.setState({participants: res.data}))
        .catch(err => console.log(err))
    }

    onParticipantsFilter = async (className) => {
      let config
      try{
        config = await AuthAPI.getConfig()
      } catch(err) {
        console.log(err)
        // TODO: redirect to login
        return
      }

      axios.get(`http://real.encs.concordia.ca/profile/api/search/?classes=${className}`, config)
        .then(res => this.setState({participants: res.data}))
        .catch(err => console.log(err))
    }

    onFilteredParticpantSearch = async (participantName, className) => {
      let config
      try{
        config = await AuthAPI.getConfig()
      } catch(err) {
        console.log(err)
        // TODO: redirect to login
        return
      }

      axios.get(`http://real.encs.concordia.ca/profile/api/search/?firstName=${participantName}&classes=${className}`, config)
        .then(res => this.setState({participants: res.data}))
        .catch(err => console.log(err))
    }

    navigateToStudentProfile(studentID) {
      this.props.navigation.navigate('ParticipantUserProfile', {
        userID: studentID,
      });
    }

    render() {
      return (
        <ListContainer
          tabName={this.state.tabName}
          marginBottom={50}
          onSearch={this.onParticipantSearch}
          onFilter={this.onParticipantsFilter}
          onFilteredParticpant={this.onFilteredParticpantSearch}>

          <RecommendedTeammates navigateToStudentProfile={this.navigateToStudentProfile} />

           {this.state.participants ? this.state.participants.map(participant => (
             <ParticipantListItem id={participant.id}
             participantName={`${participant.first_name} ${participant.last_name}`}
             // commonClasses can be shown only if we keep state of current user's classes
            //  commonClass={'SOEN 490'}
            //  userTeamStatus={'available'}
            //  isAdmin={false}
             marginTop={2}
         />
           )) :
            <NotFoundError><ErrorMsg>No user found 😕</ErrorMsg></NotFoundError>}

        </ListContainer>

      );
    }
}

class TeammateNavigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Participants">
            {(props) => <Participants {...props} />}
          </Stack.Screen>
          <Stack.Screen name="ParticipantUserProfile" component={ParticipantUserProfile} />
        </Stack.Navigator>
    );
  }
}

const NotFoundError = styled.View `
  align-items: center;
  background-color: ${theme.COLOR_WHITE};
  border-radius: 10;
  padding: 10px;
`

const ErrorMsg = styled.Text `
font-family: ${theme.FONT_SEMIBOLD};
font-size: ${theme.FONT_SIZE_SLIGHT_LARGE};
text-transform: capitalize;
`

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();

  return <TeammateNavigation {...props} navigation={navigation} route={route} />;
}