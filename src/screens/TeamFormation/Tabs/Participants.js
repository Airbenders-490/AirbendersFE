import React,  { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, View, TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import styled from 'styled-components';
import theme from '../../../styles/theme.style.js';
import ParticipantListItem from '../../../components/ParticipantListItem';
import { Pressable } from 'react-native';
import ListContainer from '../../../containers/ListContainer.js';
import MainContainer from '../../../containers/MainContainer.js';
import { Subtitle } from '../../../containers/TextContainer.js';
class Participants extends Component {
    constructor(props) {
      super(props);
    }
  
 
    render() {
      return (
        <ListContainer>
            <MainContainer>
              <Subtitle>John Smith</Subtitle>
            </MainContainer>
        </ListContainer>
      );
    }
  }


  export default Participants;