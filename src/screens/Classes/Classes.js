import React , { Component } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import ClassTabs from './ClassTabs'

const Stack = createStackNavigator();
class Classes extends Component {
  constructor(props) {
    super(props);
  }

  


   ClassList({ navigation }) {

    const onPressHandler = () => {
      navigation.navigate('ClassTabs');
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
          Dummy button to access class tabs 
          </Text>
        </Pressable>
      </View>
    )
  }


 render() {
  return (
    
// stack to navigate from classes to one class tabs
    <Stack.Navigator
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
      <Stack.Screen
    
        name="Classes"
        component={this.ClassList}
        options={{backgroundColor:'transparent', borderRadius:0, borderWidth:0,}}
     
      />
      <Stack.Screen
        name="ClassTabs"
        component={ClassTabs}
        options={{backgroundColor:'transparent', borderRadius:0,borderWidth:0,}}
      />
    </Stack.Navigator>

)
}
}



export default Classes;