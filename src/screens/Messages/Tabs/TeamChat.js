import React, { Component, } from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Button, View, TouchableOpacity, Text, Image, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styled from 'styled-components';
import ScreenContainer from '../../../containers/ScreenContainer';
import MessageListItem from '../../../components/GroupListItem.js';
import theme from '../../../styles/theme.style.js';
import { createStackNavigator } from '@react-navigation/stack';
import MessagingScreen from '../Messaging.js';
import FirstConvo from '../../../data/mock/FirstConversation.json';
import SecondConvo from '../../../data/mock/SecondConversation.json';

// for testing w/out login
let config = {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoibWljaGFlbCIsImxhc3RfbmFtZSI6InNjb3R0IiwiZXhwIjoxNjQ4MDAyOTI2LCJpc3MiOiJlYWY1NGZhZS0xYWI4LTRiNWEtODA0Ny01MTkwNGY2YWU4ODQifQ.981hDNWptwfNA609yiNotVRBSU5uB1fFp_4qjdJsE_o'
    }
}

class TeamChat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            userID: ''
        }

        this.navigateToChat = this.navigateToChat.bind(this);
        this.getChatRooms = this.getChatRooms.bind(this);
        this.getConfig = this.getConfig.bind(this)
    }

    getConfig = (token) => {
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    async getChatRooms() {
        let token = await AsyncStorage.getItem("token")
        let user = await AsyncStorage.getItem("userID")

        axios
            .get(`http://real.encs.concordia.ca/chat/api/rooms`, this.getConfig(token)) // w/ login
            // .get(`http://real.encs.concordia.ca/chat/api/rooms`, config) // for testing w/out login
            .then(
                response => {
                    this.setState({ rooms: response.data.Rooms, userID: user })
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    // only called on FIRST render
    componentDidMount() {
        this.getChatRooms();
    }

    navigateToChat(mockConversation, room) {
        this.props.navigation.navigate('ConversationScreen', {
            conversation: mockConversation,
            room: room,
            userID: this.state.userID
        })
    }

    render() {

        let listChatRooms = this.state.rooms.map(room => {
            return (
                <ConversationItem onPress={() => this.navigateToChat(FirstConvo, room)}>
                    <MessageListItem
                        backgroundColor={theme.COLOR_BLUE}
                        classNumber={room.class}
                        className={room.name}
                        numberParticipants={room.students.length} />
                </ConversationItem>
            )
        })

        return (
            <ScrollView contentContainerStyle={{ padding: theme.SPACING_MEDIUM }}>
                {listChatRooms}
            </ScrollView>
        );
    }
}

const ConversationItem = styled.Pressable`
    margin-bottom: ${theme.SPACING_SMALL};
`;

export default function (props) {
    const navigation = useNavigation();
    return <TeamChat {...props} navigation={navigation} />;
}
