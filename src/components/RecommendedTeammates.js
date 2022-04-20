import React, { Component, } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { View } from 'react-native';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import { AuthAPI } from '../api/auth.js';
import ParticipantUserProfile from './../screens/ExternalProfile.js';

const Stack = createStackNavigator();

class RecommendedTeammates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendedTeammates: []
    }

    this.getRecommendedTeammates = this.getRecommendedTeammates.bind(this);
  };

  async getRecommendedTeammates() {
    axios
    .get(`http://${global.profileAPI}/api/recommended/teammates`, await AuthAPI.getConfig())
    .then( response => {
      console.log(response.data);
      this.setState({recommendedTeammates: response.data})
    })
    .catch(error => {
      console.log(error)
      console.log(error.message)
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.config)
    })
  };


  navigateToStudentProfile(studentID) {
    this.props.navigation.navigate('ParticipantUserProfile', {
      userID: studentID,
    });
  }

  componentDidMount() {
      this.getRecommendedTeammates();
  }

  render() {
    const {recommendedTeammates} = this.state
    // const {navigateToStudentProfile} = this.props

    let listRecommendedTeammates = () => {
      var studentsList = []
      for (let i = 0 ;  i< 3 && i < recommendedTeammates.length ; i++) {
        studentsList.push(
          <StudentItem>
              <UserProfileImage />
              <StudentName>{recommendedTeammates[i].first_name.trim()} {recommendedTeammates[i].last_name.trim()}</StudentName>
              <ViewStudentButton onPress={this.navigateToStudentProfile(recommendedTeammates[i].id)}><ViewBtnText>View</ViewBtnText></ViewStudentButton>
          </StudentItem>
        )
      }
      return studentsList
    }

    return (
        <MainContainer marginBottom={5} padding={10} isElevated>
          {recommendedTeammates.length > 0 ?
            <RecommendedContainer>
              <Title>Recommended Teammates</Title>
              {listRecommendedTeammates()}
            </RecommendedContainer>
            :
            <View></View>
          }
        </MainContainer>
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
        <Stack.Screen
          name="RecommendedTeammates">
          {(props) => <RecommendedTeammates
            navigation={this.props.navigation}
            route={this.props.route}
            hideTabBar={this.props.hideTabBar} />}
        </Stack.Screen>
        <Stack.Screen name="ParticipantUserProfile">
          {(props) => <ParticipantUserProfile />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

const RecommendedContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Title = styled.Text `
  color: ${theme.COLOR_GRAY};
  font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
  font-family: ${theme.FONT_SEMIBOLD};
  letter-spacing: ${theme.LETTER_SPACING_LARGE};
  text-transform: uppercase;
  margin-bottom: 5;
  padding: 15px;
`;

const StudentItem = styled.View `
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-horizontal:15px;
  padding-vertical:15px;
`

const StudentName = styled.Text `
  font-family: ${theme.FONT_BOLD};
  font-size: ${theme.FONT_SIZE_MEDIUM};
  text-transform: capitalize;
  text-align-vertical: center;
`

const ViewStudentButton = styled.TouchableOpacity `
  margin-left: auto;
  border-radius: 14;
  width: 30%;
  align-items:center;
  justify-content: center;
  background: #46C7EF;
`
const ViewBtnText = styled.Text `
  font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
  color:white;
`

const UserProfileImage = styled.View`
  height: 30;
  width: 30;
  border-radius: 40;
  align-self: center;
  background: ${theme.COLOR_GREEN};
  margin-right: 20px;
`;

// export default RecommendedTeammates;

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();

  return <TeammateNavigation {...props} navigation={navigation} route={route} />;
}
