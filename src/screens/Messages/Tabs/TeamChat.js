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

class TeamChat extends Component {
    constructor(props) {
      super(props);

      this.navigateToChat = this.navigateToChat.bind(this);
    }

    navigateToChat() {
        this.props.navigation.navigate('ConversationScreen')
    }
  
    render() {
        return (
            <ScrollView contentContainerStyle={{ padding: theme.SPACING_MEDIUM }}>
                <Pressable onPress={this.navigateToChat}>
                    <MessageListItem
                        backgroundColor={theme.COLOR_BLUE}
                        classNumber='SOEN 490'
                        className='capstone'
                        caption='Smarties'
                        numberParticipants={10} />
                </Pressable>
            </ScrollView>
        );
    }
}

export default function(props) {
    const navigation = useNavigation();
    return <TeamChat {...props} navigation={navigation} />;
 }
  