import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, View, Switch, Image } from 'react-native';
import { TextBody, Title, Subtitle, Caption } from '../containers/TextContainer.js';
import theme from '../styles/theme.style.js';
import ScreenContainer from '../containers/ScreenContainer';
import UserProfile from '../components/profile/UserProfile.js';
import GearIcon from '../assets/images/icons/gear.png';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settingState: false,
    };
    
    this.triggerSettings = this.triggerSettings.bind(this);
  }

  triggerSettings() {
    this.setState({ settingState: !this.state.settingState });
  }
  
  // Write functions here

  render() {
    return (
      <ScreenContainer>
        <SettingsButton
          onPress={this.triggerSettings} >
          <SettingsIcon source={GearIcon} />
        </SettingsButton>
        <UserProfile
          isReadOnly={!this.state.settingState}
          isCurrentUser
          // TODO: Update userID to dynamic current user ID
          // when login/register endpoints are done
          userID={'475a4c75-9006-4ab3-a9b8-2f6e704b0bfd'}
          triggerSettings={this.triggerSettings} />
      </ScreenContainer>
    );
  }
}

const SettingsButton = styled.TouchableOpacity `
  align-self: flex-end;
  margin-top: 2;
`;

const SettingsIcon = styled.Image `
  height: 20;
  width: 20;
`;

export default Profile;
