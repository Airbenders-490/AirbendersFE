import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import theme from '../styles/theme.style.js';
import ScreenContainer from '../containers/ScreenContainer';
import { Title, Subtitle, TextBody } from '../containers/TextContainer.js';
import MainContainer from '../containers/MainContainer.js';
import JoinTeam from '../components/modals/JoinTeam.js';
import CreateTeam from '../components/modals/CreateTeam.js';
import TeamListItem from '../components/TeamListItem.js';

class Teams extends Component {
  constructor(props) {
    super(props);
  };

  // Write functions here

  render() {
    return (
      <ScreenContainer screenTitle='Teams'>
        <TeamsContainer>
          {/* <JoinTeam
              teamName='X'
            /> */}
          <CreateTeam />
        </TeamsContainer>
      </ScreenContainer>
    );
  }
}

export default Teams;
const TeamsContainer = styled.View`
  background-color:  ${theme.COLOR_LIGHT_GRAY};
  height: 720;
  border-radius: 12;
`;
