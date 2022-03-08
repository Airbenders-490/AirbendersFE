import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View, Image } from 'react-native';
import theme from '../styles/theme.style.js';

import ScreenContainer from '../containers/ScreenContainer';
import { Title, Subtitle, TextBody } from '../containers/TextContainer.js';
import MainContainer from '../containers/MainContainer.js';
<<<<<<< HEAD:src/screens/Teams.js
import JoinTeam from '../components/modals/JoinTeam.js';
class Teams extends Component {
=======
import AddTeamButton from '../components/AddButton.js';

class Classes extends Component {
>>>>>>> 5211972f6d4b39583693b8c98e9fb91108b8b752:src/screens/Classes.js
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
<<<<<<< HEAD:src/screens/Teams.js
      <ScreenContainer screenTitle='Teams'>
        <TeamsContainer>
          <JoinTeam 
            teamName='X'
            >
          </JoinTeam>
        </TeamsContainer>
=======
      <ScreenContainer screenTitle='Classes'>
        <TextBody bodyColor={theme.COLOR_BLACK}>Classes!</TextBody>
        <AddTeamButton buttonText='Create Team'></AddTeamButton>
>>>>>>> 5211972f6d4b39583693b8c98e9fb91108b8b752:src/screens/Classes.js
      </ScreenContainer>
    );
  }
}

export default Teams;
const TeamsContainer = styled.View `
  background-color:  ${theme.COLOR_LIGHT_GRAY};
  height: 720;
  border-radius: 12;
`;
