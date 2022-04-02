import React, { Component } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import MessageTabs from "./MessageTabs.js";
import ConversationScreen from "./ConversationScreen.js";

const Stack = createStackNavigator();

class MessagesScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <ScreenContainer screenTitle="Messages" ignorePadding>
      <MessageTabs navigation={this.props.navigation} hideTabBar={this.props.hideTabBar} />
      // </ScreenContainer>
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

export default function (props) {
  const navigation = useNavigation();
  const hideTabBar = props.hideTabBar;
  return <Messages {...props} navigation={navigation} hideTabBar={hideTabBar} />;
}

