import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from 'styled-components';

import ClassesScreen from './src/screens/Classes.js';
import MessagesScreen from './src/screens/Messages.js';
import FeedScreen from './src/screens/Feed.js';
import ScheduleScreen from './src/screens/Schedule.js';
import ProfileScreen from './src/screens/Profile.js';

import ClassesIconOutline from './src/assets/images/icons/graduation_cap.png';
import MessagesIconOutline from './src/assets/images/icons/message_bubble.png';
import FeedIconOutline from './src/assets/images/icons/feed.png';
import ScheduleIconOutline from './src/assets/images/icons/calendar.png';
import ProfileIconOutline from './src/assets/images/icons/user.png';

import ClassesIconFill from './src/assets/images/icons/graduation_cap_fill.png';
import MessagesIconFill from './src/assets/images/icons/message_bubble_fill.png';
import FeedIconFill from './src/assets/images/icons/feed_fill.png';
import ScheduleIconFill from './src/assets/images/icons/calendar_fill.png';
import ProfileIconFill from './src/assets/images/icons/user_fill.png';

const Tab = createBottomTabNavigator();

function NavigationBar({ state, descriptors, navigation }) {
  return (
    <NavigationBarContainer>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }

          console.log(options)
        };

        const renderTabIcons = (routeName, focused) => {
          let icon;
            switch(routeName) {
              case 'Classes':
                icon = focused ? ClassesIconFill : ClassesIconOutline
                break;
              case 'Messages':
                icon = focused ? MessagesIconFill : MessagesIconOutline  
                break;
              case 'Feed':
                icon = focused ? FeedIconFill : FeedIconOutline  
                break;
              case 'Schedule':
                icon = focused ? ScheduleIconFill : ScheduleIconOutline  
                break;
              case 'Profile':
                icon = focused ? ProfileIconFill : ProfileIconOutline  
                break;
            }

          return <TabIcon
            tabIconTint={ isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor }
            source={ icon }
          />
        };

        return (
          <TouchableOpacity
            onPress={onPress} >
            { renderTabIcons(route.name, isFocused) }
          </TouchableOpacity>
        );
      })}
    </NavigationBarContainer>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={ () => ({
          tabBarActiveTintColor: '#5089E9',
          tabBarInactiveTintColor: '#CAD8F0',
          headerShown: false,
          showIcon: true,
          tabBarShowLabel: false,
        })}
        tabBar={(props) => <NavigationBar {...props} />}
      >
        <Tab.Screen name="Classes" component={ClassesScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Schedule" component={ScheduleScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


// STYLED-COMPONENTS
const NavigationBarContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  background-color: #fff;
  height: 60;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
  padding-horizontal: 20;
  justify-content: space-between;
  align-items: center;
  elevation: 30;
`

const TabIcon = styled.Image`
  width: 30;
  height: 30;
  tint-color: ${props => props.tabIconTint};
`