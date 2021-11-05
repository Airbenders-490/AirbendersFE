import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { TouchableOpacity, LayoutAnimation } from 'react-native';
import theme from '../styles/theme.style.js';
import Icon from "react-native-vector-icons/MaterialIcons";

class Collapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded : false,
    }
  }

  render() {
    return (
        <CollapsibleButton onPress={()=>this.toggleExpand()} isCurrentlyTeammate={this.props.isCurrentlyTeammate}>
            <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
            size={30} 
            />
        </CollapsibleButton>
    );
  }

toggleExpand=()=>{
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  this.setState({expanded : !this.state.expanded})
  }
}

const CollapsibleButton = styled.TouchableOpacity`
  display: ${props => props.isCurrentlyTeammate ? 'flex' : 'none'};
`
Collapse.propTypes = {
    isCurrentlyTeammate: PropTypes.bool.isRequired
};

export default Collapse;
