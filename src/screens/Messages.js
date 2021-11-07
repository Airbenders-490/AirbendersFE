import React, { Component } from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import theme from '../styles/theme.style.js';
import ScreenContainer from '../containers/ScreenContainer.js';
import CollapsibleButton from '../components/Collapse.js';

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScreenContainer screenTitle = 'Messages'>
        <CollapsibleButton isCurrentlyTeammate={true} />
      </ScreenContainer>
    );
  }
}

export default Messages;
