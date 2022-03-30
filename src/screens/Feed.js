import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View, Image } from 'react-native';
import theme from '../styles/theme.style.js';
import MainContainer from '../containers/MainContainer.js';
import ScreenContainer from '../containers/ScreenContainer.js';
import { TextBody, Title, Subtitle } from '../containers/TextContainer.js';
import ParticipantListItem from "../components/ParticipantListItem.js";
import MessageIcons from "../components/MessageIcons.js";
import MessageBubble from '../components/MessageBubble.js';
import TeamListItem from '../components/TeamListItem.js';
import EyesGif from '../assets/images/eyes-looking.gif';


class Feed extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
      <ScreenContainer screenTitle="Feed" >
      <View><Image source={EyesGif} style={styles.gif} /></View>
      </ScreenContainer>
    );
  }
}

const styles = StyleSheet.create({
  gif: {
    width: 200,
    height: 100,
    margin: 100,
    marginLeft:'auto',
    marginRight:'auto'
  }
});

export default Feed;