import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import { Title, Subtitle, TextBody, Caption } from '../containers/TextContainer.js';
import ScreenContainer from '../containers/ScreenContainer.js';
import UserProfile from '../components/profile/UserProfile.js';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
      <ScreenContainer isSecondaryScreen screenTitle="John Smith">
        <UserProfile isReadOnly={true} userID={this.props.userID} />
      </ScreenContainer>
    );
  }
}

export default Profile;
