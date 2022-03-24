import React,  { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, View, TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import styled from 'styled-components';
import theme from '../../../styles/theme.style.js';
import ParticipantListItem from '../../../components/ParticipantListItem';
import ListContainer from '../../../containers/ListContainer.js';
import { Subtitle } from '../../../containers/TextContainer.js';
import MainContainer from '../../../containers/MainContainer.js';

class Participants extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <ListContainer marginBottom={50}>
          
        </ListContainer>
              
      );
    }
}

export default Participants;
