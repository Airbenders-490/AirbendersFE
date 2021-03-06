import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import theme from '../../styles/theme.style.js';
import Participants from './Tabs/Participants.js';
import Teams from './Tabs/Teams';

const Tab = createMaterialTopTabNavigator();
const totalWidth = Dimensions.get('window').width;

class TeamFormationTabs extends Component {
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
          <Tab.Screen name="Participants" component={Participants} />
          <Tab.Screen name="Teams">
            {(props) => <Teams navigation={this.props.navigation} />}
          </Tab.Screen>
        </Tab.Navigator>
      );
  }
}

export default TeamFormationTabs;
