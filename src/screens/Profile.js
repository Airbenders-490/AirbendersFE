import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, View, Switch } from 'react-native';
import { TextBody, Title, Subtitle } from '../containers/TextContainer.js';
import theme from '../styles/theme.style.js';
import ScreenContainer from '../containers/ScreenContainer';
import MainContainer from '../containers/MainContainer.js';
import ToggleButton from '../components/ToggleButton.js';
import { TextInput } from 'react-native-gesture-handler';
import TextInputContainer from '../containers/TextInputContainer.js';

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  
  // Write functions here

  render() {
    return (
      <ScreenContainer screenTitle='Profile'>
        <MainContainer>
          <Subtitle>Settings</Subtitle>
          <ToggleButton labelName='Team chats'></ToggleButton>
          <ToggleButton labelName='DMs'></ToggleButton>
          <ToggleButton labelName='Schedule'></ToggleButton>
          <TextInputContainer labelName='School email'></TextInputContainer>
        </MainContainer>
      </ScreenContainer>
    );
  }
}

export default Profile;
