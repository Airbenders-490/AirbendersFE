import React , { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import When2meet from './When2meet'



const ClassStack = createStackNavigator();
class Messages extends Component {
  constructor(props) {
    super(props);
  }

  Message({ navigation }) {
 // navigate to when to meet
    const onPressHandler = () => {
      navigation.navigate('When2meet');
    }
  
    return (
      <View >
        <Text >
          classes!
        </Text>
        <Pressable
          onPress={onPressHandler}
          style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#6958' })}
        >
          <Text >
          Dummy button to access when to meet 
          </Text>
        </Pressable>
      </View>
    )
  }
  // Write functions here

  render() {
    return(
    <ClassStack.Navigator
 screenOptions={{ 
   headerStyle: {   
    height: 90,

        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0, } ,
        headerTitleStyle: {
          marginLeft:0,
          paddingRight:0,
            fontWeight: 'bold',
            fontSize:25,
          },}}
    
      
    
    >
      <ClassStack.Screen
    
        name="Messages"
        component={this.Message}
        
     
      />
      <ClassStack.Screen
        name="When2meet"
        component={When2meet}
  
      />
    </ClassStack.Navigator>

    )
  }
}

export default Messages;
























