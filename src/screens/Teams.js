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
import XIcon from '../assets/images/icons/x-icon.png';
import { set } from 'react-native-reanimated';


class Teams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      className: '',
      classEntered: false,
      deleteLabel: true,
      isReadOnly: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.showName = this.showName.bind(this);
    this.deleteLabel = this.deleteLabel.bind(this);
  }

  handleClass = (text) => {
    this.setState({ className: text});
  }

  
  deleteLabel = () => {
    this.setState({deleteLabel : !this.state.deleteLabel});
    console.log("Nouj");
  }

  handleSubmit = () => {
      this.setState({deleteLabel : !this.state.deleteLabel});
      this.className.clear();
  }
  showName = () => {
    this.setState({classEntered : !this.state.classEntered});
  } 

  render() {
    //let {isReady} = this.state;
    let {deleteLabel} = this.state;

    const renderLabel = () => {
      if(deleteLabel) {
        return <TouchableOpacity onPress={() => this.deleteLabel()} ><ClassLabel isReadOnly = {this.showName} >{deleteLabel ? <LabelClassName>{this.state.className}</LabelClassName> : <View>{null}</View> }<IconTag>
        <LabelIcon source={XIcon} />
      </IconTag></ClassLabel></TouchableOpacity>;
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

const ClassLabel = styled.View `
  display: ${props => props.isReadOnly ? 'flex' : 'none'};  
  flex-direction: row;
  padding-horizontal: 10;
  padding-vertical: 5;
  border-top-left-radius: 100;
  border-bottom-left-radius: 100;
  border-top-right-radius: 100;
  border-bottom-right-radius: 100;
  background-color: #5089E9;
`;

const LabelClassName = styled.Text  `
  color: white;
  top: 2;
  align-items: center;
  font-family: ${theme.FONT_SEMIBOLD};
  letter-spacing: ${theme.LETTER_SPACING_SMALL};
`;

const TeamsContainer = styled.View `
  background-color:  ${theme.COLOR_LIGHT_GRAY};
  height: 720;
  border-radius: 12;
`;

const LabelIcon = styled.Image`
  tintColor: #000000;
  width: 20;
  height: 20;
`;

const IconTag = styled.View `
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 100;
  border-bottom-right-radius: 100;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-horizontal: 5;
  background-color: #5089E9;
`;

export default Teams;
