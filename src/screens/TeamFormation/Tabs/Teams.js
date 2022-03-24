import React,  { Component, } from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Button, View, TouchableOpacity, Text, Image, ScrollView, Pressable} from 'react-native';
import styled from 'styled-components';
import ScreenContainer from '../../../containers/ScreenContainer';
import MessageListItem from '../../../components/GroupListItem.js';
import theme from '../../../styles/theme.style.js';
import { createStackNavigator } from '@react-navigation/stack';
import ListContainer from '../../../containers/ListContainer.js';
import MainContainer from '../../../containers/MainContainer.js';
import { Subtitle } from '../../../containers/TextContainer.js';
import FirstConvo from '../../../data/mock/FirstConversation.json';
import SecondConvo from '../../../data/mock/SecondConversation.json';import 
TeamFormationTabs from "../TeamFormationTabs.js";
import ParticipantListItem from '../../../components/ParticipantListItem';
import JoinTeam from '../../../components/modals/JoinTeam.js';
class Teams extends Component {
    constructor(props) {
      super(props);

   
    }

    
  
    render() {
        return (
            <ListContainer>
            <MainContainer><Subtitle>John</Subtitle></MainContainer><Text>{'\n'}</Text>
            <MainContainer><Subtitle>John</Subtitle></MainContainer><Text>{'\n'}</Text>
            <MainContainer><Subtitle>John</Subtitle></MainContainer><Text>{'\n'}</Text>
            <MainContainer><Subtitle>John</Subtitle></MainContainer><Text>{'\n'}</Text>
            <MainContainer><Subtitle>John</Subtitle></MainContainer><Text>{'\n'}</Text>


           
      <TeamsContainer>
        <JoinTeam 
          teamName='X'
          >
        </JoinTeam>
      </TeamsContainer>
     
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>

          </ListContainer>
                
           
        );
    }
}
const TeamsContainer = styled.View `
  background-color:  ${theme.COLOR_LIGHT_GRAY};
  border-radius: 12;
`;
const ConversationItem = styled.Pressable `
    margin-bottom: ${theme.SPACING_SMALL};
`;

export default function(props) {
    const navigation = useNavigation();
    return <Teams {...props} navigation={navigation} />;
 }
  