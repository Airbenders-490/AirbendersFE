import React, { Component } from 'react';
import { View, Image, Switch,Text, Platform , ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';
import MainContainer from './MainContainer.js';
import { Caption, TextBody, Title, Subtitle } from './TextContainer.js';
import UserIcon from '../assets/images/icons/user_fill.png'
import { Pressable } from 'react-native';
import MagnifyingIcon from '../assets/images/icons/magnifying.png';
import Selection from '../assets/images/icons/selection.png';
import Sort from '../assets/images/icons/sort.png';

class ListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggled: false
        };

        this.onToggle = this.onToggle.bind(this)
    }

    onToggle() {
        this.setState({isToggled: !this.state.isToggled});
    }

    Header(props) {
        return (
            <HeaderIcon>
            <Header>
            <Icon source={MagnifyingIcon} />
            <IconFilter source={Sort} />
            </Header>
            <Header>
            <Icon source={Selection} />
            </Header>
            </HeaderIcon>
        );
      }
    
  

    render() {
    

        return (
        
            <Container
                isElevated={this.props.isElevated}
                backgroundColor='#E3E3E3' 
                marginTop={this.props.marginTop}
                marginBottom={this.props.marginBottom}>
               
        
                {this.Header()} 
                {this.props.children}
                
                
                
            </Container>
        );
    }
}

//STYLED-COMPONENTS
const Container = styled.ScrollView`
    /* padding separated as the following to allow unitless values */
    padding-horizontal: ${theme.SPACING_SLIGHT_MEDIUM};
    padding-vertical: ${theme.SPACING_SLIGHT_MEDIUM};
    margin-top: ${props => props.marginTop ? props.marginTop : 0}
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : 0}
    border-radius: ${theme.SPACING_SMALL};
    background: ${props => props.backgroundColor ? props.backgroundColor : '#fff'};
    elevation: ${props => props.isElevated ? theme.CARD_ELEVATION : 0};
  
  /* iOS Shadows */
  shadowColor: ${props => props.backgroundColor ? props.backgroundColor : '#555'};
  shadowOpacity: ${props => props.backgroundColor ? '0.4' : '0.1'};
  shadowRadius: 10;
`;

const Icon = styled.Image`
  width: 15;
  height: 15;
  tint-color: ${theme.COLOR_GRAY};
`;

const IconFilter = styled.Image`
margin-left: 20;
  width: 15;
  height: 15;
  tint-color: ${theme.COLOR_GRAY};
`;


const HeaderIcon = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom:15;
`;
const Header = styled.View`
    display: flex;
    flex-direction: row;
   
`;
const Header2 = styled.View`
    display: flex;
    flex-direction: row;
`;




const TeamStatus = styled.View `
    height: 10;
    width: 10;
    background: ${(props) => props.full ? theme.COLOR_RED : theme.COLOR_GREEN};
    border-radius: 100;
`;

const ParticipantsContainer = styled.View `
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10;
`;

const ParticipantSpot = styled.View `
    height: 25;
    width: 25;
    position: relative;
    margin-left: ${(props) => props.overlap ? '-10' : '0'};
    background: white;
    border-width: 1.5;
    border-radius: 100;
    border-style: ${(props) => props.available ? 'dotted' : 'solid'};
    border-color: ${(props) => props.available ? theme.COLOR_BLACK : theme.COLOR_BLUE};
`;

const Spots = styled.View `
    display: flex;
    flex-direction: row;
    margin-right: ${theme.SPACING_SMALL};
`;

ListContainer.propTypes = {
    children: PropTypes.element.isRequired,
};

export default ListContainer;