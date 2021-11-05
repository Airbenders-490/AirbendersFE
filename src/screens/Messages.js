import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { Text, View, TouchableOpacity, LayoutAnimation } from 'react-native';
import theme from '../styles/theme.style.js';
import Icon from "react-native-vector-icons/MaterialIcons";
import ScreenContainer from '../containers/ScreenContainer.js';
import MainContainer from '../containers/ScreenContainer.js';


class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded : false,
      isCurrentlyTeammate : true
    }
  }


  render() {
    return (
      <ScreenContainer screenTitle = 'Messages'>
          <TouchableOpacity onPress={()=>this.toggleExpand()}>
              <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30}/>
          </TouchableOpacity>
      </ScreenContainer>
    );
  }


toggleExpand=()=>{
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  this.setState({expanded : !this.state.expanded})
  }

}


export default Messages;
