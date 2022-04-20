import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View, Image } from 'react-native';
import theme from '../../styles/theme.style.js';
import TeamFormationTabs from "./TeamFormationTabs.js";
import ScreenContainer from '../../containers/ScreenContainer';
import { Title, Subtitle, TextBody } from '../../containers/TextContainer.js';
import MainContainer from '../../containers/MainContainer.js';

class Teams extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
      <TeamFormationTabs navigation={this.props.navigation} />
    );
  }
}

export default Teams;