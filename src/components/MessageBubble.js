import React, { Component } from 'react';
import { View, Image, Switch } from 'react-native';
import PropTypes from 'prop-types';
import MessageInput from './MessageInput';
import TextInputContainer from '../containers/TextInputContainer';


class MessageBubble extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthor: true,
        isSelectable: false,
      };
    }
  
    selectBubble = () => {
      this.setState({isSelectable : !this.state.isSelectable})
    }
    render() {
      return (
          <TextInputContainer isAuthor={this.state.isAuthor} backgroundColor={this.props.labelColor} isSelectable={this.selectBubble}>
              <MessageInput> 
                {this.props.children}
              </MessageInput>
        </TextInputContainer>
      ); 
    }
  }

  
const TextInputContainer = styled.View `
background-color: ${props => props.isAuthor ? theme.COLOR_ORANGE : (props.backgroundColor ? props.backgroundColor :  theme. COLOR_LIGHT_GRAY)};
`;