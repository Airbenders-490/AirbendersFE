import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import theme from '../../styles/theme.style.js';
import PeerChat from './Tabs/PeerChat.js';
import TeamChat from './Tabs/TeamChat';

const Tab = createMaterialTopTabNavigator();
const totalWidth = Dimensions.get('window').width;

class MessageTabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: theme.FONT_SIZE_SLIGHT_MEDIUM,
              fontFamily: theme.FONT_SEMIBOLD,
              letterSpacing: theme.LETTER_SPACING_SMALL,
            },
            tabBarStyle: {
              backgroundColor: "transparent",
              marginBottom: theme.SPACING_SMALL,
              marginTop: theme.SPACING_LARGE, /* temporary marginTop */
            },
            tabBarIndicatorStyle: {
              backgroundColor: theme.COLOR_BLACK,
              height: 1.5,
              width: totalWidth / 10,
              left: totalWidth / 5,
            },
          }}
        >
          <Tab.Screen name="Peer Chats" component={PeerChat} />
          <Tab.Screen name="Team Chats">
            {(props) => <TeamChat navigation={this.props.navigation} />}
          </Tab.Screen>
        </Tab.Navigator>
      );
  }
}

export default MessageTabs;
