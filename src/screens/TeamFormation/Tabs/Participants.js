import React,  { Component, } from 'react';
import ParticipantListItem from '../../../components/ParticipantListItem';
import ListContainer from '../../../containers/ListContainer.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {  Text, View } from 'react-native';
import styled from 'styled-components';

class Participants extends Component {
    constructor(props) {
      super(props);
      this.state = {
        participants: []
      }
      this.onParticipantSearch = this.onParticipantSearch.bind(this)
    }

    getConfig = (token) => {
      return {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
    }

    onParticipantSearch = async (name) => {
      let token
      try{
        token = await AsyncStorage.getItem("token")
      } catch(err) {
        console.log(err)
        // TODO: redirect to login
        return
      }

      axios.get(`http://real.encs.concordia.ca/profile/api/search/?firstName=${name}`, this.getConfig(token))
        .then(res => this.setState({participants: res.data}))
        .catch(err => console.log(err))
    }
  
    render() {
      return (
        <ListContainer marginBottom={50} onSearch={this.onParticipantSearch}>
           {/* placing these for visualization */}
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
           // todo: STELLA CAN YOU PLEASE FIX THIS AND SHOW WHAT YOU LIKE OR LEAVE IT EMPTY.. IDC
            <NotFoundError><Text>No user found 😕</Text></NotFoundError>}
          {/* <ParticipantListItem
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
        /> */}
        </ListContainer>
              
      );
    }
}

const NotFoundError = styled.View `
  align-items: center;
  background-color: white;
  border-radius: 10;
  padding: 10px;
`

export default Participants;
