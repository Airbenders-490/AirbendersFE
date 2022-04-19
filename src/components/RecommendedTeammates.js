import React, { Component, } from 'react';
import axios from 'axios';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import Label from './Label.js';
import AcceptIcon from '../assets/images/icons/accept-icon.png'
import DenyIcon from '../assets/images/icons/deny-icon.png'
import { AuthAPI } from '../api/auth.js';

const totalWidth = Dimensions.get('window').width;

class RecommendedTeammates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendedTeammates: [],
      currentUserData: {}
    }

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.getRecommendedTeammates = this.getRecommendedTeammates.bind(this);
  };

  async getCurrentUser() {
    let userID = await AuthAPI.getUserID()
    const config = await AuthAPI.getConfig()
    axios
        .get(`http://${global.profileAPI}/api/student/${userID}`, config)
        .then(response => {
          console.log(response.data);
          this.setState({ currentUserData: response.data });
        })
        .catch(error => {
          console.log("User Profile does not exist",error)
          AuthAPI.setData("profileExists", "false")
        })
  }

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

  componentDidMount() {
      // this.getCurrentUser();
      this.getRecommendedTeammates();
  }

  render() {

    let listRecommendedTeammates = this.state.recommendedTeammates?.map((student) => {
      return (
          <StudentItem>
            <StudentName>{student.first_name} {student.last_name}</StudentName>
            <ViewStudentButton>View</ViewStudentButton>
          </StudentItem>
      )
    });
    return (
      <MainContainer marginBottom={5} padding={10} isElevated>
        <Title>Recommended Teammates</Title>
        {/* recommended label */}
        <ContentContainer>
          <ContentLHS>
            {/* {this.props.commonClass && <Label isReadOnly labelColor={theme.COLOR_ORANGE}>{this.props.commonClass}</Label>}
            <ParticipantName>{this.props.participantName}</ParticipantName> */}
          </ContentLHS>
          <ContentRHS>
            {/* {this.showJoinRequestButtons()}
            <TeamFormationStatus onLongPress={() => this.removeParticipantFromRoom()}
            statusColor={this.setTeamFormationColor(this.props.userTeamStatus)} /> */}
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

const Title = styled.Text `
  color: ${theme.COLOR_GRAY};
  font-size: ${theme.FONT_SIZE_SLIGHT_MEDIUM};
  font-family: ${theme.FONT_SEMIBOLD};
  letter-spacing: ${theme.LETTER_SPACING_LARGE};
  text-transform: uppercase;
  margin-bottom: 5;
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

const StudentItem = styled.View `
  background: pink
`

const StudentName = styled.Text `
  font-family: ${theme.FONT_SEMIBOLD};
  font-size: ${theme.FONT_SIZE_SLIGHT_LARGE};
  text-transform: capitalize;
`

const ViewStudentButton = styled.TouchableOpacity `
  display: flex;
  flex-direction: row;
  margin-right: ${theme.SPACING_XSMALL}};
`

const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-right: ${theme.SPACING_SMALL}};
`;

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  margin-right: ${theme.SPACING_XSMALL}};
`;

const AcceptButton = styled.Image`
  height: 25;
  width: 25;
  tintColor: ${theme.COLOR_GREEN};
`

export default RecommendedTeammates;
