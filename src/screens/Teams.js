import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Button, TouchableOpacity, Text, View, Image, TextInput, Alert } from 'react-native';
import theme from '../styles/theme.style.js';
import ScreenContainer from '../containers/ScreenContainer';
import { Title, Subtitle, TextBody } from '../containers/TextContainer.js';
import MainContainer from '../containers/MainContainer.js';
import JoinTeam from '../components/modals/JoinTeam.js';
import ParticipantListItem from '../components/ParticipantListItem';
import FilterIcon from '../assets/images/icons/filter.png';
import ClassLabel from '../components/Label.js';
import XIcon from '../assets/images/icons/x-icon.png';


class Teams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      className: '',
      classEntered: false,
      isReady: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showName = this.showName.bind(this);
  }

  handleClass = (text) => {
    this.setState({ className: text});
  }

  handleSubmit = () => {
      this.setState({isReady : !this.state.isReady});
      this.className.clear();
  }
  showName = () => {
    this.setState({classEntered : !this.state.classEntered})
  } 

  render() {
    let {isReady} = this.state;

    const renderLabel = () => {
      if(isReady) {
        return <ClassLabel labelColor="#5089E9" labelIcon={XIcon}><LabelClassName>{this.state.className}</LabelClassName></ClassLabel>;
      }
    }
    return (
      <ScreenContainer screenTitle='Teams'>
        <TeamsContainer>
        <Container>
             <FilterButton onPress={this.showName}>
             <FilterClick source={FilterIcon}/>
               <CustomText placeholder = "Class Name" 
                classEntered = {this.state.classEntered} 
                ref= {input => {this.className = input}}
                value={this.state.className} 
                onChangeText={this.handleClass}
                onSubmitEditing= { this.handleSubmit }/>
            </FilterButton>
            <LabelContainer>
               {renderLabel()}
              </LabelContainer>
           </Container>
          <JoinTeam 
            teamName='X'
            >
          </JoinTeam>
        </TeamsContainer>
      </ScreenContainer>
    );
  }
}


const CustomText = styled.TextInput `
  display: ${props => props.classEntered ? 'flex' : 'none'};  
  flex-direction: row;
  padding-left: 10px;
`;

const Container = styled.View `
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50;
  background-color:  ${theme.COLOR_LIGHT_GRAY};
  border-radius: 12;
`;

const FilterButton = styled.TouchableOpacity `
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
`;

const FilterClick = styled.Image `
  tintColor: #000000;
  width: 30; 
  height: 30; 
`;

const LabelContainer = styled.View `
  display: flex;
  padding-left: 10px;
  top: 5px;
  align-items: center;
  margin-bottom: 10px;
  justify-content: center;
  background: ${theme.COLOR_LIGHT_GRAY};
`;

const LabelClassName = styled.Text  `
  display: flex;
  flex-direction: row;
`;

const TeamsContainer = styled.View `
  background-color:  ${theme.COLOR_LIGHT_GRAY};
  height: 720;
  border-radius: 12;
`;

export default Teams;
