import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, View, Switch } from 'react-native';
import { TextBody, Title, Subtitle, Caption } from '../containers/TextContainer.js';
import theme from '../styles/theme.style.js';
import ScreenContainer from '../containers/ScreenContainer';
import UserProfile from '../components/profile/UserProfile.js';

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  
  // Write functions here

  render() {
    return (
      <ScreenContainer>
          <UserProfile isReadOnly={true} userID={12345} />
      </ScreenContainer>
    );
  }
}

export default Profile;
