import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import theme from '../../styles/theme.style.js';
import Participants from './Tabs/Participants.js';
import Teams from './Tabs/Teams';
import ExternalProfile from './../ExternalProfile.js';

const Tab = createMaterialTopTabNavigator();
const totalWidth = Dimensions.get('window').width;
const Stack = createStackNavigator();

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
            <Tab.Screen name="Participants" >
            {(props) => <Participants navigation={this.props.navigation} />}
            </Tab.Screen>
            <Tab.Screen name="Teams">
              {(props) => <Teams navigation={this.props.navigation} />}
            </Tab.Screen>
            {/* <Tab.Screen name="ExternalProfile">
            {(props) => <ExternalProfile />}
          </Tab.Screen> */}
          </Tab.Navigator>
      );
  }
}

// class TeamNavigation extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Stack.Screen
//           name="TeamFormationTabs">
//           {(props) => <TeamFormationTabs
//             navigation={this.props.navigation}
//             route={this.props.route}
//             hideTabBar={this.props.hideTabBar} />}
//         </Stack.Screen>
//         <Stack.Screen name="ExternalProfile">
//           {(props) => <ExternalProfile />}
//         </Stack.Screen>
//       </Stack.Navigator>
//     );
//   }
// }

export default TeamFormationTabs;

// export default function (props) {
//   const navigation = useNavigation();
//   const route = useRoute();

//   return <TeamFormationTabs {...props} navigation={navigation} route={route} />;
// }
