import React,  { Component, } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, View, TouchableOpacity, Text, Image} from 'react-native';
import styled from 'styled-components';
import SearchIcon from '../assets/images/icons/magnifying.png';
import ProfileIcon from '../assets/images/icons/user_fill.png';
import CalendarIcon from '../assets/images/icons/calendar_fill.png';
import PinIcon from '../assets/images/icons/pin.png';
import theme from '../styles/theme.style.js';

class FeatureButtons extends Component {
    constructor(props) {
      super(props);

      this.onButtonPress = this.onButtonPress.bind(this);
    }

    onButtonPress() {
      if (this.props.onPress) {
        this.props.onPress();
      }
    }
  
    render() {
      return (
        <FeatureButtonsContainer>
            <ButtonContainer>
                <PinButton onPress={this.onButtonPress}>
                    <CustomPinButton source= {PinIcon}/>
                </PinButton>
            </ButtonContainer>
            <ButtonContainer>
                <ProfileButton onPress={this.onButtonPress}>
                    <CustomProfileButton source= {ProfileIcon}/>
                </ProfileButton>
            </ButtonContainer>
            <ButtonContainer>
                <CalendarButton onPress={this.onButtonPress}>
                    <CustomCalendarButton source= {CalendarIcon}/>
                </CalendarButton>
            </ButtonContainer>
            <ButtonContainer>
                <SearchButton onPress={this.onButtonPress}>
                    <CustomSearchButton source= {SearchIcon}/>
                </SearchButton>
            </ButtonContainer>
        </FeatureButtonsContainer>
      );
    }
  }
  
  // STYLED-COMPONENTS
const FeatureButtonsContainer = styled.View`
    flexDirection: row;
    left: 230;
`;

const ButtonContainer = styled.View`
    backgroundColor: white;
    height: 30;
    width: 30;
    borderRadius: 15;
    margin-right: 10;
`;

const CustomPinButton = styled.Image `
    tintColor: ${theme.COLOR_PURPLE};
    width: 20;
    height: 20;
`;

const CustomProfileButton = styled.Image `
    tintColor: ${theme.COLOR_PURPLE};
    width: 20; 
    height: 20;
`;

const CustomCalendarButton = styled.Image `
    tintColor: ${theme.COLOR_PURPLE};
    width: 20; 
    height: 20;
`;

const CustomSearchButton = styled.Image `
    tintColor: ${theme.COLOR_PURPLE};
    width: 20; 
    height: 20;
  `;

const PinButton = styled.TouchableOpacity `
    alignItems: center;
    top: 4;
`;

const ProfileButton = styled.TouchableOpacity `
    alignItems: center;
    top: 4;
`;

const CalendarButton = styled.TouchableOpacity `
    alignItems: center;
    top: 4;
`;

const SearchButton = styled.TouchableOpacity `
    alignItems: center;
    top: 4;
`;

export default FeatureButtons;
