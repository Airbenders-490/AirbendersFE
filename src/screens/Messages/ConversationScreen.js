import React, { Component } from 'react';
import { Pressable, Text, View, Image, TouchableOpacity, ScrollView, LayoutAnimation, UIManager } from 'react-native';
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
import Test from '../../data/mock/FirstConversation.json';
import axios from 'axios';

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class ConversationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPinnedDisplayed: false,
      isParticipantListDisplayed: false,
      isCommonScheduleDisplayed: false,
      isSearchResultDisplayed: false,
      currentConversation: [],
      wso: null
    };

    this.toggleFeaturedSection = this.toggleFeaturedSection.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.updateConversation = this.updateConversation.bind(this);
    this.loadMessages = this.loadMessages.bind(this);
  }

  componentDidMount() {
    // Remove tab bar from conversation screen
    const { route } = this.props;
    const { chatroomID } = route.params;

    this.props.hideTabBar(false);
    this.loadMessages();

    // Initializing web socket for current chat room
    let temp = 'real.encs.concordia.ca/chat/chat/momas?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoibWljaGFlbCIsImxhc3RfbmFtZSI6InNjb3R0IiwiZXhwIjoxNjQ4MTQ3MDMyLCJpc3MiOiJlYWY1NGZhZS0xYWI4LTRiNWEtODA0Ny01MTkwNGY2YWU4ODQifQ.CKWCjR1se3T9X6j4_uWWkcVed1ySg1iDF5w2aJH2ezw'
    let replace = `${global.chatAPI}/chat/${chatroomID}`
    var ws = new WebSocket(`ws://${temp}`);
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
        editMessage.MessageBody = response.Message.MessageBody
        this.setState({currentConversation: conversationCopy})
      } else if (response.message_type == 2) {
        let conversationCopy = [...this.state.currentConversation]
        conversationCopy = conversationCopy.filter(el => el.SentTimestamp != response.Message.SentTimestamp)
        this.setState({currentConversation: conversationCopy})
      }
    };
  }

  loadMessages() {
    const { route } = this.props;
    const { chatroomID } = route.params;
    let replace = `${global.chatAPI}/api/chat/${chatroomID}`
    let temp = `real.encs.concordia.ca/chat/api/chat/momas?limit=30`
    axios
      .post(
      
        `http://${temp}?limit=30`, 
        {
          "SentTimestamp": "2099-03-19T21:12:54.685296709Z"
        },
        global.config)
      .then(
          response => {
              // Reverse in order to display oldest messages first
              this.setState(prevState => ({
                currentConversation: [...prevState.currentConversation, ...response.data.reverse()]
              }), () => {
                console.log(this.state.currentConversation)
              });
          }
      )
      .catch(
          error => console.log("error: " + error)
      )
  }

  handleBackPress(navigation) {
    navigation.goBack();
    // Put back tab bar on conversation exit
    this.props.hideTabBar(true);
  }

  sendMessage() {
    // TODO: Send message connection
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

    switch(section) {
      case 'PIN': this.setState({
        isPinnedDisplayed: !this.state.isPinnedDisplayed, 
        isParticipantListDisplayed: false, 
        isCommonScheduleDisplayed: false, 
        isSearchResultDisplayed: false});
        break;
      case 'PARTICIPANTS': this.setState({
        isPinnedDisplayed: false, 
        isParticipantListDisplayed: !this.state.isParticipantListDisplayed, 
        isCommonScheduleDisplayed: false, 
        isSearchResultDisplayed: false});
        break;
      case 'COMMON_SCHEDULE': this.setState({
        isPinnedDisplayed: false, 
        isParticipantListDisplayed: false, 
        isCommonScheduleDisplayed: this.state.isCommonScheduleDisplayed, 
        isSearchResultDisplayed: false});
        break;
      case 'SEARCH_RESULT': this.setState({
        isPinnedDisplayed: false, 
        isParticipantListDisplayed: false, 
        isCommonScheduleDisplayed: false, 
        isSearchResultDisplayed: this.state.isSearchResultDisplayed});
        break;
      default: this.setState({
        isPinnedDisplayed: false, 
        isParticipantListDisplayed: false, 
        isCommonScheduleDisplayed: false, 
        isSearchResultDisplayed: false});
    }
  }

  render() {
    const { navigation, route } = this.props;
    const { conversation } = route.params;

    let conversationBubbles = this.state.currentConversation.map((data) => {
      return (
        // TODO: Replace token with current token
        <MessageBubble isAuthor={data.FromStudentID === "808c194d-b2ef-42b2-8312-b7d246221866"}>
          {data.MessageBody}
        </MessageBubble>
      )
    })

    return (
        <Container>
            <Header>
              <LHSContainer>
                <BackButton isVisible={this.props.isSecondaryScreen} onPress={ () => this.handleBackPress(navigation) } >
                    <StyledBackIcon source={ BackIcon } />
                </BackButton>
                <View>
                    <Subtitle titleColor={theme.COLOR_BLACK}>Lorem Ipsum</Subtitle>
                    <TextBody captionColor={theme.COLOR_BLACK}>SOEN 490</TextBody>
                </View>
              </LHSContainer>
              <FeatureButtons toggleSection={this.toggleFeaturedSection} />
            </Header>

            <ExpandableSection isDisplayed={this.state.isParticipantListDisplayed}>
              <ParticipantListItem
                participantName={"stella nguyen"}
                commonClass={'SOEN 490'}
                userTeamStatus={'pending'} />
            </ExpandableSection>

            <ConversationContainer onPress={() => this.toggleFeaturedSection('default')} >
                <BubblesContainer >
                  {conversationBubbles}
                </BubblesContainer>
                <MessageInput sendMessageAction={this.sendMessage} />
            </ConversationContainer>
        </Container>
    );
  }
}

//STYLED-COMPONENTS
const Container = styled.View `
  /* padding separated as the following to allow unitless values */
  padding-top: ${theme.SPACING_LARGE};
  height: 100%;
  display: flex;
`;

const Header = styled.View `
  margin-horizontal: ${theme.SPACING_MEDIUM};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LHSContainer = styled.View `
  display: flex;
  flex-direction: row;
`;

const BackButton = styled.TouchableOpacity `
  margin-right: 15;
  display: flex;
`;

const StyledBackIcon = styled.Image `
  tint-color: ${theme.COLOR_BLACK};
  height: 30;
  width: 30;
`;

const ExpandableSection = styled.View `
  display: ${(props) => props.isDisplayed ? 'flex' : 'none'};
  background: ${theme.COLOR_WHITE};
  border-radius: ${theme.SPACING_MEDIUM};
  padding-vertical: ${theme.SPACING_MEDIUM};
  padding-horizontal: ${theme.SPACING_MEDIUM};
  margin-top: ${theme.SPACING_MEDIUM};
  margin-horizontal: ${theme.SPACING_MEDIUM};
  flex: 1;
`;

const ConversationContainer = styled.Pressable `
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

const BubblesContainer = styled.ScrollView `
  display: flex;
  flex: 1;
`;

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();

  return <ConversationScreen {...props} navigation={navigation} route={route} />;
}