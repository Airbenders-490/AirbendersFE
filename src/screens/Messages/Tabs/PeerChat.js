import React,  { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, View, TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import styled from 'styled-components';
import theme from '../../../styles/theme.style.js';
import ParticipantListItem from '../../../components/ParticipantListItem';

class PeerChat extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <ScrollView contentContainerStyle={{ padding: theme.SPACING_MEDIUM }}>
            <ParticipantListItem
              participantName={"jane smith"}
              commonClass={'SOEN 490'}
              userTeamStatus={'pending'} />
        </ScrollView>
      );
    }
  }

export default PeerChat;