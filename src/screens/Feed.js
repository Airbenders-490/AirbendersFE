import React, { Component } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styled from 'styled-components';
import { View, ScrollView, Text } from 'react-native';
import theme from '../styles/theme.style.js';
import ScreenContainer from '../containers/ScreenContainer.js';
import TeamRequestItem from '../components/feed/TeamRequestItem.js';
import TeamItem from '../components/feed/TeamItem.js';

// for testing w/out login
let config = {
  headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiU3RlbGxhIiwibGFzdF9uYW1lIjoiTmd1eWVuIiwiZXhwIjoxNjM3ODg2OTkyLCJpc3MiOiIwZWE1MmFhZi1jMmRiLTRkZTctYjAxNC03N2MxZDI2YjVlZWEifQ.JoLJUdi6rLAAhyDXbaUWoGvS_W1x2PyrdDjksjoL_I4'
  }
}

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserData: {},
      rooms: [],
      userID: ''
    }

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.getChatRooms = this.getChatRooms.bind(this);
  }

  getConfig = (token) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
  }

  async getCurrentUser() {
        let userID
        let token
        try {
          userID = await AsyncStorage.getItem("userID")
          token = await AsyncStorage.getItem("token")
        } catch (err) {
          console.log(err)
        }

    axios
        .get(`http://real.encs.concordia.ca/profile/api/student/${userID}`, this.getConfig(token))
        // .get(`http://real.encs.concordia.ca/profile/api/student/${userID}`, config) // for testing w/out login
        .then(response => { this.setState({ currentUserData: response.data, userID: userID }) })
        .catch(err => console.log(err))
  }

  async getChatRooms() {
    let token
    try {
      token = await AsyncStorage.getItem("token")
    } catch (err) {
      console.log(err)
    }

    axios
        .get(`http://real.encs.concordia.ca/chat/api/rooms`, this.getConfig(token)) // w/ login
        // .get(`http://real.encs.concordia.ca/chat/api/rooms`, config) // for testing w/out login
        .then(response => {this.setState({ rooms: response.data.Rooms })})
        .catch( error => {
          console.log(error)
          console.log(error.message)
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          console.log(error.config)
        })
  }

  // only called on FIRST render
  componentDidMount() {
      this.getCurrentUser();
      this.getChatRooms();
  }

  getColor(name) {
    name = name
    String.prototype.hashCode = function() {
        var hash = 0;
        for (var i = 0; i < this.length; i++) {
            var char = this.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    let colors = [theme.COLOR_PURPLE,
    theme.COLOR_BLUE,
    theme.COLOR_YELLOW,
    theme.COLOR_GREEN,
    theme.COLOR_RED,
    theme.COLOR_ORANGE,
    theme.COLOR_GRAY]
    return colors[Math.abs(name.hashCode() % 7)]
  }

  render() {
    let displayEnrolledClasses = this.state.currentUserData.current_classes?.map((enrolledClass) => {
      return (
          <EnrolledClassLabel backgroundColor={this.getColor(enrolledClass)} isReadOnly stacked>
              <ClassTitle>{enrolledClass}</ClassTitle>
          </EnrolledClassLabel>
      )
    });

    let displayTeams = this.state.rooms.map((room) => {
      return (
        <TeamItem
          backgroundColor={this.getColor(room.class)}
          classNumber={room.class}
          roomName={room.name}
          numberParticipants={room.students.length} />
      )
    });

    let displayTeamRequests = this.state.rooms.map((room) => {
      return (
        room.students.map(student => {
          if (this.state.userID === room.admin.id && student.isPending) {
            return (
              <TeamRequestItem
                roomName={room.name}
                class={room.class}
                participantName={student.first_name}
                labelColor={this.getColor(room.class)}
                userTeamStatus={student.isPending ? 'pending' : ''}
              />
            )
          }
        })
      )
    });

    return (
      <ScreenContainer screenTitle="Feed">
        <FeedSection marginTop={23}>
          <FeedSectionTitle>Enrolled Classes</FeedSectionTitle>
          <ScrollView horizontal marginTop={10}>
            {displayEnrolledClasses}
          </ScrollView>
        </FeedSection>
        <FeedSection marginTop={40}>
          <FeedSectionTitle>Recent Team Conversations</FeedSectionTitle>
          <ScrollView height={150} marginTop={10} nestedScrollEnabled={true}>
            {displayTeams}
          </ScrollView>
        </FeedSection>
        <FeedSection marginTop={40}>
          <FeedSectionTitle>Team Requests Status</FeedSectionTitle>
          <ScrollView height={150} marginTop={10} nestedScrollEnabled={true}>
            {displayTeamRequests}
          </ScrollView>
        </FeedSection>
        <View height={110}></View>
      </ScreenContainer>
    );
  }
}

const FeedSection = styled.View `
`

const FeedSectionTitle = styled.Text `
  text-transform: uppercase;
  font-family: ${theme.FONT_BOLD};
  font-size: ${theme.FONT_SIZE_MEDIUM};
  letter-spacing: ${theme.LETTER_SPACING_LARGE};
`

const EnrolledClassLabel = styled.View`
  width: 99;
  height:103;
  border-radius:10;
  margin-horizontal:7;
  justify-content: center;
  align-items:center;
`;

const ClassTitle = styled(FeedSectionTitle) `
  font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
`

export default Feed;