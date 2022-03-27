import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, View, Switch, Image } from 'react-native';
import { TextBody, Title, Subtitle, Caption } from '../containers/TextContainer.js';
import theme from '../styles/theme.style.js';
import ScreenContainer from '../containers/ScreenContainer';
import UserProfile from '../components/profile/UserProfile.js';
import GearIcon from '../assets/images/icons/gear.png';
import YesNoModal from '../components/modals/YesNoModal.js'

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settingState: false,
      isEdited: false,
    };

    this.triggerSettings = this.triggerSettings.bind(this);
    this.openModalButton = this.openModalButton.bind(this)
    this.setIsEdited = this.setIsEdited.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  triggerSettings() {
    this.setState({ settingState: !this.state.settingState });
  }

  setIsEdited(bool) {
    this.setState({isEdited: bool})
  }

  openModalButton = () => {
    return (
      <SettingsButtonView>
        <SettingsIcon source={GearIcon} />
      </SettingsButtonView>
    )
  }

  handleConfirm = () => {
    this.triggerSettings()
    this.setState({isEdited: false})
  }


  render() {

    return (
      <ScreenContainer>
        {this.state.isEdited ?
          <YesNoModal
          modalMessage="You have unsaved changes, would you still like to exit edit mode?"
          handleConfirm={this.handleConfirm}
          openModalButton={this.openModalButton}
          />
          :
          <SettingsButton
          onPress={this.triggerSettings} >
            <SettingsIcon source={GearIcon} />
          </SettingsButton>
      }

        <UserProfile
          isReadOnly={!this.state.settingState}
          isCurrentUser
          setIsEdited={this.setIsEdited}
          triggerSettings={this.triggerSettings} >
        </UserProfile>
      </ScreenContainer>
    );
  }
}

const SettingsButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-top: 2;
`;

const SettingsButtonView = styled.View`
  align-self: flex-end;
  margin-top: 2;
`;

const SettingsIcon = styled.Image`
  height: 20;
  width: 20;
`;

export default Profile;
