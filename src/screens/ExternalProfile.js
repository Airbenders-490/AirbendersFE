import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import { Title, Subtitle, TextBody, Caption } from '../containers/TextContainer.js';
import ScreenContainer from '../containers/ScreenContainer.js';
import UserProfile from '../components/profile/UserProfile.js';
import { useNavigation, useRoute } from '@react-navigation/native';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    const { route } = this.props;
    const { userID } = route.params;

    return (
      <ScreenContainer isSecondaryScreen screenTitle="John Smith">
        {/* TODO: Input respective user id as prop in parent */}
        <UserProfile isReadOnly={true} userID={userID} />
      </ScreenContainer>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();

  return <Profile {...props} navigation={navigation} route={route} />;
}
