import React,  { Component, } from 'react';
import styled from 'styled-components';
import SearchIcon from '../assets/images/icons/magnifying.png';
import ProfileIcon from '../assets/images/icons/user_fill.png';
import CalendarIcon from '../assets/images/icons/calendar_fill.png';
import PinIcon from '../assets/images/icons/pin.png';
import theme from '../styles/theme.style.js';

class FeatureButtons extends Component {
    constructor(props) {
      super(props);

      this.onFeatureButtonPress = this.onFeatureButtonPress.bind(this);
    }

    onFeatureButtonPress() {
      if (this.props.onPress) {
        this.props.onPress();
      }
    }
  
    render() {
      return (
        <FeatureButtonsContainer>
            <FeatureButton onPress={() => this.props.toggleSection('PIN')}>
                <CustomPinButton source= {PinIcon}/>
            </FeatureButton>
            <FeatureButton onPress={() => this.props.toggleSection('PARTICIPANTS')}>
                <CustomProfileButton source= {ProfileIcon}/>
            </FeatureButton>
            <FeatureButton onPress={() => this.props.toggleSection('COMMON_SCHEDULE')}>
                <CustomCalendarButton source= {CalendarIcon}/>
            </FeatureButton>
            <FeatureButton onPress={() => this.props.toggleSection('SEARCH_RESULT')}>
                <CustomSearchButton source= {SearchIcon}/>
            </FeatureButton>
        </FeatureButtonsContainer>
      );
    }
  }
  
  // STYLED-COMPONENTS
const FeatureButtonsContainer = styled.View`
    flexDirection: row;
`;

const FeatureButton = styled.TouchableOpacity`
    backgroundColor: white;
    height: 32;
    width: 32;
    borderRadius: 15;
    margin-right: 10;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CustomPinButton = styled.Image `
    tintColor: ${theme.COLOR_PURPLE};
    width: 15;
    height: 15;
`;

const CustomProfileButton = styled.Image `
    tintColor: ${theme.COLOR_PURPLE};
    width: 20; 
    height: 20;
`;

const CustomCalendarButton = styled.Image `
    tintColor: ${theme.COLOR_PURPLE};
    width: 18; 
    height: 18;
`;

const CustomSearchButton = styled.Image `
    tintColor: ${theme.COLOR_PURPLE};
    width: 20; 
    height: 20;
  `;

export default FeatureButtons;
