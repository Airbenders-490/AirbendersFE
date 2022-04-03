import React, { Component } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import theme from "../../styles/theme.style.js";
import { StyleSheet, View, Text, Pressable, Dimensions, ScrollView } from "react-native";
import ScreenContainer from "../../containers/ScreenContainer.js";
import MessageTabs from "./MessageTabs.js";
import ConversationScreen from "./ConversationScreen.js";
import styled from "styled-components";
import { Title } from "../../containers/TextContainer.js";

const Stack = createStackNavigator();

class MessagesScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MessageTabs navigation={this.props.navigation} hideTabBar={this.props.hideTabBar} />
    );
  }
}

class Messages extends Component {
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
          name="MessagesScreen">
          {(props) => <MessagesScreen navigation={this.props.navigation} />}
        </Stack.Screen>
        <Stack.Screen name="ConversationScreen">
          {(props) => <ConversationScreen hideTabBar={this.props.hideTabBar} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

// STYLED-COMPONENTS
const Container = styled.View`
  /* padding separated as the following to allow unitless values */
  padding-top: ${theme.SPACING_LARGE};
`;

const Header = styled.View`
  margin-horizontal: ${theme.SPACING_MEDIUM};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function (props) {
  const navigation = useNavigation();
  const hideTabBar = props.hideTabBar;
  return <Messages {...props} navigation={navigation} hideTabBar={hideTabBar} />;
}

