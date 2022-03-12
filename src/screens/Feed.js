import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import ScreenContainer from '../containers/ScreenContainer.js';
import { TextBody, Title, Subtitle } from '../containers/TextContainer.js';
import ParticipantListItem from "../components/ParticipantListItem.js";
import MessageIcons from "../components/MessageIcons.js";
import MessageBubble from '../components/MessageBubble.js';
import TeamListItem from '../components/TeamListItem.js';




class Feed extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
      <ScreenContainer screenTitle="Feed" >
      
      </ScreenContainer>
    );
  }
}

export default Feed;