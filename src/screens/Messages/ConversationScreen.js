import React, { Component } from 'react';
import { Pressable, Text, View, Image, TouchableOpacity, TouchableHighlight, ScrollView, LayoutAnimation, KeyboardAvoidingView, UIManager } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../styles/theme.style.js';
import { TextBody, Title, Subtitle, Caption } from '../../containers/TextContainer.js';
import BackIcon from '../../assets/images/icons/left-arrow.png';
import MessageInput from '../../components/MessageInput.js';
import FeatureButtons from '../../components/FeatureButtons.js';
import ParticipantListItem from '../../components/ParticipantListItem.js';
import MessageBubble from '../../components/MessageBubble.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ParticipantUserProfile from './../ExternalProfile.js';
import { createStackNavigator } from '@react-navigation/stack';

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Stack = createStackNavigator();

class ConversationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPinnedDisplayed: false,
      isParticipantListDisplayed: false,
      isCommonScheduleDisplayed: false,
      isSearchResultDisplayed: false,
      currentConversation: [],
      wso: null,
      userID: '',
      token: ''
    };

    this.toggleFeaturedSection = this.toggleFeaturedSection.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.updateConversation = this.updateConversation.bind(this);
    this.loadMessages = this.loadMessages.bind(this);
    this.onEditMessage = this.onEditMessage.bind(this);
    this.onDeleteMessage = this.onDeleteMessage.bind(this);
  }

  getConfig = (token) => {
    return {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    }
  }

  getData = async (key) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (e) {
        // error reading value
        return e;
    }
  }

  async componentDidMount() {
    // Remove tab bar from conversation screen
    const { route } = this.props;
    const { room } = route.params;

    const token = await this.getData("token")
    const userid = await this.getData("userID")
    this.setState({ userID: userid, token: token })

    this.props.hideTabBar(false);
    this.loadMessages(room.room_id, token);

    // Initializing web socket for current chat room
    let path = `${global.chatAPI}/chat/${room.room_id}?token=${token}`
    var ws = new WebSocket(`ws://${path}`);
    this.setState({wso: ws})

    ws.onmessage = (e) => {
      // a message was received
      var response = JSON.parse(e.data);
      
      if (response.message_type == 0) {
        this.setState(prevState => ({
          currentConversation: [...prevState.currentConversation, response.Message]
        }))
      } else if (response.message_type == 1) {

        let conversationCopy = [...this.state.currentConversation]
        let editMessage = conversationCopy.find(el => el.SentTimestamp == response.Message.SentTimestamp)
        if (editMessage) {
          editMessage.MessageBody = response.Message.MessageBody
          this.setState({currentConversation: conversationCopy})
        }
      } else if (response.message_type == 2) {
        let conversationCopy = [...this.state.currentConversation]
        conversationCopy = conversationCopy.filter(el => el.SentTimestamp != response.Message.SentTimestamp)
        this.setState({currentConversation: conversationCopy})
      }
    };
  }

  loadMessages(roomID, token, sentTimestamp = "2099-01-01T01:01:01.685296709Z") {
    let route = `${global.chatAPI}/api/chat/${roomID}`
    axios
      .post(
        `http://${route}?limit=30`, 
        {
          "SentTimestamp": sentTimestamp
        },
        this.getConfig(token))
      .then(
          response => {
              // Reverse in order to display oldest messages first
              this.setState(prevState => ({
                currentConversation: [...prevState.currentConversation, ...response.data?.reverse()]
              }), () => {
                console.log(this.state.currentConversation)
              });
          }
      )
      .catch(
          error => console.log("error: " + error)
      )
  }

  onEditMessage = (message) => {
    if (!message) {
      return Promise.resolve()
    }

    return axios.put(`http://${global.chatAPI}/api/chat/${message.RoomID}`, message, this.getConfig(this.state.token))
  }

  onDeleteMessage = (message) => {
    if (!message) {
      return Promise.resolve()
    }

    return axios.delete(`http://${global.chatAPI}/api/chat/${message.RoomID}/${message.SentTimestamp}`, this.getConfig(this.state.token))
  }

  handleBackPress(navigation) {
    navigation.goBack();
    // Put back tab bar on conversation exit
    this.props.hideTabBar(true);
  }

  sendMessage(messageBody) {
    const { route } = this.props;
    const { room } = route.params;
    this.state.wso?.send(messageBody)
    const message = {
      FromStudentID: this.state.userID,
      MessageBody: messageBody,
      RoomID: room.room_id,
      SentTimestamp: " " // todo: format and replace
    }
    this.setState(prevState => ({
      currentConversation: [...prevState.currentConversation, message]
    }))
  }

  componentDidUpdate() {
    // TODOx
  }

  componentWillUnmount() {
    this.setState({ wso: null });
  }

  updateConversation(updated) {
    this.setState({ currentConversation: updated });
  }
  

  toggleFeaturedSection(section) {
    // TODO: Create enums for featured sections
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    switch (section) {
      case 'PIN': this.setState({
        isPinnedDisplayed: !this.state.isPinnedDisplayed,
        isParticipantListDisplayed: false,
        isCommonScheduleDisplayed: false,
        isSearchResultDisplayed: false
      });
        break;
      case 'PARTICIPANTS': this.setState({
        isPinnedDisplayed: false,
        isParticipantListDisplayed: !this.state.isParticipantListDisplayed,
        isCommonScheduleDisplayed: false,
        isSearchResultDisplayed: false
      });
        break;
      case 'COMMON_SCHEDULE': this.setState({
        isPinnedDisplayed: false,
        isParticipantListDisplayed: false,
        isCommonScheduleDisplayed: this.state.isCommonScheduleDisplayed,
        isSearchResultDisplayed: false
      });
        break;
      case 'SEARCH_RESULT': this.setState({
        isPinnedDisplayed: false,
        isParticipantListDisplayed: false,
        isCommonScheduleDisplayed: false,
        isSearchResultDisplayed: this.state.isSearchResultDisplayed
      });
        break;
      default: this.setState({
        isPinnedDisplayed: false,
        isParticipantListDisplayed: false,
        isCommonScheduleDisplayed: false,
        isSearchResultDisplayed: false
      });
    }
  }

  navigateToUserProfile(studentID) {
    this.props.navigation.navigate('ParticipantUserProfile', {
      userID: studentID
    });
  }

  render() {
    const { navigation, route } = this.props;
    const { room, getChatRooms } = route.params;

    let conversationBubbles = this.state.currentConversation.map((data) => {
      return (
        <MessageBubble 
          onDelete={this.onDeleteMessage}
          onEdit={this.onEditMessage}
          message={data} 
          isAuthor={ data.FromStudentID === this.state.userID }
        >
          {data.MessageBody}
        </MessageBubble>
      )
    })

    let chatParticipants = room.students.map(student => {
      return (
        <Pressable onPress={() => this.navigateToUserProfile(student.id)}>
          <ParticipantListItem
            roomID={room.room_id}
            participantID={student.id}
            getChatRooms={getChatRooms}
            participantName={student.first_name}
            commonClass={room.class}
            userTeamStatus={student.isPending ? 'pending' : ''}
            isAdmin={this.state.userID === room.admin.id ? true : false}
          />
        </Pressable>
      )
    })

    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}>
        <Container>
          <Header>
            <LHSContainer>
              <BackButton isVisible={this.props.isSecondaryScreen} onPress={() => this.handleBackPress(navigation)} >
                <StyledBackIcon source={BackIcon} />
              </BackButton>
              <View>
                <Subtitle titleColor={theme.COLOR_BLACK}>{room.name}</Subtitle>
                {room.class && <TextBody captionColor={theme.COLOR_BLACK}>{room.class}</TextBody>}
              </View>
            </LHSContainer>
            <FeatureButtons toggleSection={this.toggleFeaturedSection} />
          </Header>

          <ExpandableSection nestedScrollEnabled={true} contentContainerStyle={{ padding: theme.SPACING_MEDIUM }} isDisplayed={this.state.isParticipantListDisplayed}>
            {chatParticipants}
          </ExpandableSection>

          <ConversationContainer onPress={() => this.toggleFeaturedSection('default')} >
            <BubblesContainer>
              {conversationBubbles}
            </BubblesContainer>
            <MessageInput sendMessageAction={this.sendMessage} />
          </ConversationContainer>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

class ChatNavigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ConversationScreen">
          {(props) => <ConversationScreen
            navigation={this.props.navigation}
            route={this.props.route}
            hideTabBar={this.props.hideTabBar} />}
        </Stack.Screen>
        <Stack.Screen name="ParticipantUserProfile">
          {(props) => <ParticipantUserProfile />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

//STYLED-COMPONENTS
const Container = styled.View`
  /* padding separated as the following to allow unitless values */
  padding-top: ${theme.SPACING_LARGE};
  height: 100%;
  display: flex;
`;

const Header = styled.View`
  margin-horizontal: ${theme.SPACING_MEDIUM};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LHSContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 15;
  display: flex;
`;

const StyledBackIcon = styled.Image`
  tint-color: ${theme.COLOR_BLACK};
  height: 30;
  width: 30;
`;

const ExpandableSection = styled.ScrollView`
  display: ${(props) => props.isDisplayed ? 'flex' : 'none'};
  background: transparent;
  margin-top: ${theme.SPACING_MEDIUM};
  flex: 1;
`;

const ConversationContainer = styled.Pressable`
  background: ${theme.COLOR_WHITE};
  flex: 2;
  padding-vertical: ${theme.SPACING_SLIGHT_MEDIUM};
  padding-horizontal: ${theme.SPACING_SLIGHT_MEDIUM};
  justify-content: space-between;
  border-top-left-radius: ${theme.SPACING_MEDIUM};
  border-top-right-radius: ${theme.SPACING_MEDIUM};
  margin-top: ${theme.SPACING_MEDIUM};
  elevation: 30;

  /* iOS Shadows */
  shadowColor: #555;
  shadowOpacity: 0.05;
  shadowRadius: 10;
`;

const BubblesContainer = styled.ScrollView`
  display: flex;
  flex: 1;
`;

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();

  return <ChatNavigation {...props} navigation={navigation} route={route} />;
}