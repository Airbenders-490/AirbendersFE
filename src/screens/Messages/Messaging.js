import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenContainer from '../../containers/ScreenContainer';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
      <ScreenContainer isSecondaryScreen ignorePadding screenTitle="Test" />
    );
  }
}

export default Profile;
