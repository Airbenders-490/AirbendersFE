import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Tab.Navigator // headerShown: false
        initialRouteName="Feed"
        screenOptions={({route}) => ({
          tabBarActiveTintColor: '#5089E9',
          tabBarInactiveTintColor: '#CAD8F0',
          headerShown: false,
          showIcon: true,
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            let icon;
            switch(route.name) {
              case 'Classes':
                console.log('we are here');
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

            return <Image
              style={{ width: size, height: size, tintColor: color }}
              source={ icon }
            />;
          },
        })}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
