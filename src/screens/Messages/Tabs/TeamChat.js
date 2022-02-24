import React,  { Component, } from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Button, View, TouchableOpacity, Text, Image, ScrollView, Pressable} from 'react-native';
import styled from 'styled-components';
import ScreenContainer from '../../../containers/ScreenContainer';
import MessageListItem from '../../../components/GroupListItem.js';
import theme from '../../../styles/theme.style.js';
import { createStackNavigator } from '@react-navigation/stack';
import MessagingScreen from '../Messaging.js';
import FirstConvo from '../../../data/mock/FirstConversation.json';
import SecondConvo from '../../../data/mock/SecondConversation.json';

class TeamChat extends Component {
    constructor(props) {
      super(props);

      this.navigateToChat = this.navigateToChat.bind(this);
    }

    navigateToChat(mockConversation) {
        this.props.navigation.navigate('ConversationScreen', {
            conversation: mockConversation,
        })
    }
  
    render() {
        return (
            <ScrollView contentContainerStyle={{ padding: theme.SPACING_MEDIUM }}>
                <ConversationItem onPress={() => this.navigateToChat(FirstConvo)}>
                    <MessageListItem
                        backgroundColor={theme.COLOR_BLUE}
                        classNumber='SOEN 490'
                        className='capstone'
                        caption='Smarties'
                        numberParticipants={10} />
                </ConversationItem>
            </ScrollView>
        );
    }
}

const ConversationItem = styled.Pressable `
    margin-bottom: ${theme.SPACING_SMALL};
`;

export default function(props) {
    const navigation = useNavigation();
    return <TeamChat {...props} navigation={navigation} />;
 }
  