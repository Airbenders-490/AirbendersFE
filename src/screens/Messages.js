import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import theme from '../styles/theme.style.js';
import ScreenContainer from '../containers/ScreenContainer.js';
import CollapsibleButton from '../components/Collapse.js';
import StarIcon from '../assets/images/icons/star-icon.png';
import CustomLabel from '../components/Label';

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <ScreenContainer screenTitle="Messages">
          <CustomLabel isReadOnly={false} labelColor={theme.COLOR_ORANGE} labelIcon={StarIcon}>SOEN 490</CustomLabel>
          <CollapsibleButton isCurrentlyTeammate={true} />
        </ScreenContainer>
    );
  }
}

export default Messages;
