import React, { Component } from 'react';
import { Pressable, Text, View, Image, TouchableOpacity, ScrollView, LayoutAnimation, KeyboardAvoidingView, UIManager } from 'react-native';
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
    };

    this.toggleFeaturedSection = this.toggleFeaturedSection.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    // Remove tab bar from conversation screen
    this.props.hideTabBar(false);
  }

  handleBackPress(navigation) {
    navigation.goBack();
    // Put back tab bar on conversation exit
    this.props.hideTabBar(true);
  }

  sendMessage() {
    // TODO: Send message connection
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

  render() {
    const { navigation, route } = this.props;
    const { conversation, room, userID, getChatRooms } = route.params;

    let conversationBubbles = conversation.messages.map((data) => {
      return (
        <MessageBubble isAuthor={data.isAuthor}>
          {data.description}
        </MessageBubble>
      )
    })

    let showParticipantListItems = room.students.map(student => {
      return (
        <ParticipantListItem
          roomID={room.room_id}
          participantID={student.id}
          getChatRooms={getChatRooms}
          participantName={student.first_name}
          commonClass={room.class}
          userTeamStatus={student.isPending ? 'pending' : ''}
          isAdmin={userID === room.admin.id ? true : false}
        />
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
                <Subtitle titleColor={theme.COLOR_BLACK}>Lorem Ipsum</Subtitle>
                <TextBody captionColor={theme.COLOR_BLACK}>SOEN 490</TextBody>
              </View>
            </LHSContainer>
            <FeatureButtons toggleSection={this.toggleFeaturedSection} />
          </Header>

          <ExpandableSection isDisplayed={this.state.isParticipantListDisplayed}>
            <ScrollView nestedScrollEnabled={true}>
              {showParticipantListItems}
            </ScrollView>
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

const ExpandableSection = styled.View`
  display: ${(props) => props.isDisplayed ? 'flex' : 'none'};
  background: ${theme.COLOR_WHITE};
  margin-top: ${theme.SPACING_MEDIUM};
  margin-horizontal: ${theme.SPACING_MEDIUM};
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

  return <ConversationScreen {...props} navigation={navigation} route={route} />;
}