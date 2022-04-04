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

    this.state = {
      screenTitle: ''
    }

    this.updateScreenTitle = this.updateScreenTitle.bind(this);
  }

  // Write functions here
  updateScreenTitle(name) {
    this.setState({ screenTitle: name })
  }

  render() {
    const { route } = this.props;
    const { userID } = route.params;

    return (
      <ScreenContainer isSecondaryScreen screenTitle={this.state.screenTitle}>
        {/* TODO: Input respective user id as prop in parent */}
        <UserProfile isReadOnly userID={userID} updateTitle={this.updateScreenTitle}/>
      </ScreenContainer>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();

  return <Profile {...props} navigation={navigation} route={route} />;
}
