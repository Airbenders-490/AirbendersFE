import React, { Component, } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import axios from 'axios';
import styled from 'styled-components';
import MessageListItem from '../../../components/GroupListItem.js';
import theme from '../../../styles/theme.style.js';
import FirstConvo from '../../../data/mock/FirstConversation.json';
import { AuthAPI } from '../../../api/auth'

// for testing w/out login
// let config = {
//     headers: {
//         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoibWljaGFlbCIsImxhc3RfbmFtZSI6InNjb3R0IiwiZXhwIjoxNjQ4MDAyOTI2LCJpc3MiOiJlYWY1NGZhZS0xYWI4LTRiNWEtODA0Ny01MTkwNGY2YWU4ODQifQ.981hDNWptwfNA609yiNotVRBSU5uB1fFp_4qjdJsE_o'
//     }
// }

class TeamChat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
        }

        // this.navigateToChat = this.navigateToChat.bind(this);
        this.getChatRooms = this.getChatRooms.bind(this);
        this.removeTeam = this.removeTeam.bind(this)
    }

    async getChatRooms() {
        const config = await AuthAPI.getConfig()

        axios
            .get(`http://real.encs.concordia.ca/chat/api/rooms`, config) // w/ login
            // .get(`http://real.encs.concordia.ca/chat/api/rooms`, config) // for testing w/out login
            .then(
                response => {
                    this.setState({ rooms: response.data.Rooms })
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
            userID: this.state.userID,
            getChatRooms: this.getChatRooms
        })
    }

    removeTeam = async (room) => {

        const config = await AuthAPI.getConfig()
        const user = await AuthAPI.getUserID()

        if (room.admin.id === user) {
            alert("Deleting delete room")
            console.log("Deleting delete room")

            axios
            .delete(`http://real.encs.concordia.ca/chat/api/rooms/${room.room_id}`, config) // w/ login
            // .delete(`http://real.encs.concordia.ca/chat/api/rooms/${room.room_id}`, config) // for testing w/out login
            .then(
                response => {
                    console.log(response.data)
                    this.getChatRooms()
                }
            )
            .catch(
                error => console.log(error)
            )
        } else {
            alert("Cannot delete room you are not admin")
            console.log("Cannot delete room you are not admin")
        }

    }

    getColor(name) {
        String.prototype.hashCode = function() {
            var hash = 0;
            for (var i = 0; i < this.length; i++) {
                var char = this.charCodeAt(i);
                hash = ((hash<<5)-hash)+char;
                hash = hash & hash; // Convert to 32bit integer
            }
            return hash;
        }

        let colors = [theme.COLOR_PURPLE,
        theme.COLOR_BLUE,
        theme.COLOR_YELLOW,
        theme.COLOR_GREEN,
        theme.COLOR_RED,
        theme.COLOR_ORANGE,
        theme.COLOR_GRAY]
        return colors[Math.abs(name.hashCode() % 7)]
    }

    render() {

        let listChatRooms = this.state.rooms.map(room => {
            return (
                <ConversationItem
                onLongPress={() => this.removeTeam(room)}
                onPress={() => this.navigateToChat(FirstConvo, room)}>
                    <MessageListItem
                        backgroundColor={this.getColor(room.name)}
                        classNumber={room.class}
                        roomName={room.name}
                        getChatRooms={this.getChatRooms}
                        numberParticipants={room.students.length} />
                </ConversationItem>
            )
        })

        return (
            <ScrollView 
            contentContainerStyle={{ padding: theme.SPACING_MEDIUM, paddingBottom: 60 }}>
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