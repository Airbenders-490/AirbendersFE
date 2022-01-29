import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../styles/theme.style.js';
import { TextBody, Title, Subtitle, Caption } from '../../containers/TextContainer.js';
import BackIcon from '../../assets/images/icons/left-arrow.png';

class ConversationScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Remove tab bar from conversation screen
    this.props.hideTabBar();
  }

  render() {
    const { navigation } = this.props;
    
    return (
        <Container>
        <Header>
            <BackButton isVisible={this.props.isSecondaryScreen} onPress={ () => navigation.goBack() } >
                <StyledBackIcon source={ BackIcon } />
            </BackButton>
            <View>
                <Subtitle titleColor={theme.COLOR_BLACK}>Lorem Ipsum</Subtitle>
                <TextBody captionColor={theme.COLOR_BLACK}>SOEN 490</TextBody>
            </View>
        </Header>
        <ConversationContainer contentContainerStyle={ this.props.ignorePadding ? {} : { padding: theme.SPACING_MEDIUM }}>
        </ConversationContainer>
    </Container>
    );
  }
}

//STYLED-COMPONENTS
const Container = styled.View`
  /* padding separated as the following to allow unitless values */
  padding-top: ${theme.SPACING_LARGE};
  height: 100%;
`;

const Header = styled.View`
  margin-horizontal: ${theme.SPACING_MEDIUM};
  display: flex;
  flex-direction: row;
  align-items: center;
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

const ConversationContainer = styled.ScrollView `
    background: ${theme.COLOR_WHITE};
    flex: 1;
    border-top-left-radius: ${theme.SPACING_MEDIUM};
    border-top-right-radius: ${theme.SPACING_MEDIUM};
    margin-top: ${theme.SPACING_MEDIUM};
    elevation: 30;
  
    /* iOS Shadows */
    shadowColor: #555;
    shadowOpacity: 0.05;
    shadowRadius: 10;
`;

export default function(props) {
    const navigation = useNavigation();
  
    return <ConversationScreen {...props} navigation={navigation} />;
}