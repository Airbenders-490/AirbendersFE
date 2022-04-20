import React, { Component, } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Text, View, Image } from 'react-native';
import theme from '../../styles/theme.style.js';
import TeamFormationTabs from "./TeamFormationTabs.js";
import ScreenContainer from '../../containers/ScreenContainer';
import { Title, Subtitle, TextBody } from '../../containers/TextContainer.js';
import MainContainer from '../../containers/MainContainer.js';



// const Stack = createStackNavigator();

class Teams extends Component {
  constructor(props) {
    super(props);


  }

  // Write functions here




  render() {
    return (
      <TeamFormationTabs navigation={this.props.navigation}  />
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
//           name="Teams">
//           {(props) => <Teams
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

export default Teams;
// export default function (props) {
//   const navigation = useNavigation();
//   const route = useRoute();

//   return <TeamNavigation {...props} navigation={navigation} route={route} />;
// }

