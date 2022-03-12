import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet, Button, TouchableOpacity, Text, View, Image, TextInput, Alert } from 'react-native';
import theme from '../styles/theme.style.js';

import ScreenContainer from '../containers/ScreenContainer';
import { Title, Subtitle, TextBody } from '../containers/TextContainer.js';
import MainContainer from '../containers/MainContainer.js';
import JoinTeam from '../components/modals/JoinTeam.js';

import FilterIcon from '../assets/images/icons/filter.png';
import Label from '../components/Label.js';
import XIcon from '../assets/images/icons/x-icon.png';


class Teams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classEntered: false,
      count: 0,
      className: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.showName = this.showName.bind(this);
    this.getClassName = this.getClassName.bind(this);
  }

  // className = "";

  handleSubmit = (text) => {
    this.setState({ className: text});
}

  showName = (className) => {
    console.log("Class taken entered: " + className);
    Alert.alert('Entered Class: ' + className);
 } 

  getClassName = () => {
    return this.className;
  }

  handleOnPress = () => {
    console.log(this.state.className);
    this.forceUpdate();
  }

  handleClick = () => {
    let count = this.state.count + 1
    this.setState({count}, () => {
      console.log(this.state.count);
    })
  }
  // Write functions here

  render() {
    const {count} =this.state
    return (
      <ScreenContainer screenTitle='Teams'>
        <TeamsContainer>
        <Container>
          <Button title = "Press Me" onPress={this.handleClick}></Button>
             <FilterButton onPress={() => this.showName(this.state.className)}>
             <FilterClick source={FilterIcon}/>
               <CustomText placeholder = "Enter class name"  onChangeText={(text) =>  this.className = text}/>
            </FilterButton>
               <LabelContainer>
               <Label labelColor={theme.COLOR_ORANGE} labelIcon={XIcon}>{this.state.className}</Label>
                 {/* <LabelClassName>{this.getClassName}</LabelClassName>
              </Label> */}
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
  display: flex;
  flex-direction: row;
  padding-left: 10px;
`;

const Container = styled.View `
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50;
  background-color:  ${theme.COLOR_BLUE};
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
  padding-left: 20px;
  align-items: center;
  margin-top: 10px;
  background: red;
`;

const LabelClassName = styled.TextInput  `
  display: flex;
  flex-direction: row;
`;

const TeamsContainer = styled.View `
  background-color:  ${theme.COLOR_LIGHT_GRAY};
  height: 720;
  border-radius: 12;
`;

export default Teams;
