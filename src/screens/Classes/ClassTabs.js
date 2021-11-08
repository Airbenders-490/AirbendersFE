
import React , { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClassForum from './Tabs/ClassForum';
import Participants from './Tabs/Partcipants';
import Teams from './Tabs/Teams';
import TeamChat from './Tabs/TeamChat';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';



const Tab = createMaterialTopTabNavigator();
export default function  ClassTabs({ navigation }) {

    const onPressHandler = () => {
// go to previous page: classes
      navigation.goBack();
    }
  
    return (
      
        <Tab.Navigator
        
           screenOptions={{
                tabBarLabelStyle: { fontSize: 10, fontWeight:'bold',},
                tabBarStyle:{paddingTop: 10,  // just to visualize before adding the view containing the screen title
                backgroundColor: 'transparent'},
                  tabBarIndicatorStyle:{
                  backgroundColor: '#111',
                  width: 50,
                  marginLeft:25,},
                  tabBarActiveTintColor:'#111',
                  tabBarInactiveTintColor:'#111',
                  tabBarItemStyle:{MarginLeft:0, MarginRight:0,PaddingLeft:0,PaddingRight:0,},
                  
               
            }}
            
              tab
              >
                <Tab.Screen
                  name="ClassForum"
                  component={ClassForum}
                  
                />
                <Tab.Screen
                  name="Participants"
                  component={Participants}
                />
              <Tab.Screen
                  name="Teams"
                  component={Teams}
                  
                />
              <Tab.Screen
                  name="TeamChat"
                  component={TeamChat}
                  
                />
              </Tab.Navigator>
            
      
    
    )
  }






















  