import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../styles/theme.style.js';
import { TextBody, Title, Subtitle, Caption } from '../../containers/TextContainer.js';
import BackIcon from '../../assets/images/icons/left-arrow.png';
import MessageInput from '../../components/MessageInput.js';
import FeatureButtons from '../../components/FeatureButtons.js';
import ParticipantListItem from '../../components/ParticipantListItem.js';

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

  toggleFeaturedSection(section) {
    // TODO: Create enums for featured sections
    switch(section) {
      case 'PIN': this.setState({
        isPinnedDisplayed: true, 
        isParticipantListDisplayed: false, 
        isCommonScheduleDisplayed: false, 
        isSearchResultDisplayed: false});
        break;
      case 'PARTICIPANTS': this.setState({
        isPinnedDisplayed: false, 
        isParticipantListDisplayed: true, 
        isCommonScheduleDisplayed: false, 
        isSearchResultDisplayed: false});
        break;
      case 'COMMON_SCHEDULE': this.setState({
        isPinnedDisplayed: false, 
        isParticipantListDisplayed: false, 
        isCommonScheduleDisplayed: true, 
        isSearchResultDisplayed: false});
        break;
      case 'SEARCH_RESULT': this.setState({
        isPinnedDisplayed: false, 
        isParticipantListDisplayed: false, 
        isCommonScheduleDisplayed: false, 
        isSearchResultDisplayed: true});
        break;
      default: this.setState({
        isPinnedDisplayed: false, 
        isParticipantListDisplayed: false, 
        isCommonScheduleDisplayed: false, 
        isSearchResultDisplayed: false});
    }
  }

  render() {
    const { navigation } = this.props;

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

            <ConversationContainer>
                <BubblesContainer />
                <MessageInput />
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
`;

const ConversationContainer = styled.View `
    background: ${theme.COLOR_WHITE};
    flex: 1;
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
  
    return <ConversationScreen {...props} navigation={navigation} />;
}