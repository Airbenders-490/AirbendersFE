import React, { Component } from 'react';
import { View, Image, Switch,Text, Platform , ScrollView, TouchableOpacity} from 'react-native';
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
import XIcon from '../assets/images/icons/x-icon.png';
import SearchBar from '../components/SearchBar.js';

class ListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggled: false,
            className: '',
            classEntered: false,
            nameEntered: false,
            showLabel: false,
            isReadOnly: false,
            isFilterButtonSelected: false,
            participantName: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteLabel = this.deleteLabel.bind(this);
        this.searchBarVisibility = this.searchBarVisibility.bind(this);
        this.filterBarVisibility = this.filterBarVisibility.bind(this);
    }

    deleteLabel = () => {
        this.setState({ showLabel: false });
        console.log("Deleted");
      }
    
      handleSubmit = (event) => {
        this.setState({ showLabel: true });
        this.setState({ className: event.nativeEvent.text })
        this.className.clear();
      }

      handleSearchSubmit = () => {
        // TODO
        this.participantName.clear();

      }
      filterBarVisibility = () => {
        this.setState({ isFilterButtonSelected: true})
        this.setState({ classEntered: !this.state.classEntered });
      }
    
      searchBarVisibility = () => {
        this.setState({ isFilterButtonSelected: false})
        this.setState({ nameEntered: !this.state.nameEntered });
      }

    Header(props) {
        let { showLabel } = this.state;
        const renderLabel = () => {
        if (showLabel) {
        return <TouchableOpacity onPress={() => this.deleteLabel()} ><ClassLabel isReadOnly={this.filterBarVisibility} >{showLabel ? <LabelClassName>{this.state.className}</LabelClassName> : <View>{null}</View>}<IconTag>
          <LabelIcon source={XIcon} />
        </IconTag></ClassLabel></TouchableOpacity>;
      }
    }
        return (
            <HeaderIcon>
                <Header>
                  <SearchButton onPress={this.searchBarVisibility}>
                    <SearchIcon source={MagnifyingIcon} />
                  </SearchButton>
                  <FilterButton onPress={this.filterBarVisibility}>
                      <IconFilter source={Sort} />
                  </FilterButton>
                  { this.state.isFilterButtonSelected ?
                  <CustomText placeholder="Enter class name"
                      classEntered={this.state.classEntered}
                      ref={input => { this.className = input }}
                      onSubmitEditing={this.handleSubmit} /> :
                  <SearchField placeholder="Search participant name"
                      nameEntered={this.state.nameEntered}
                      onSubmitEditing={this.handleSearchSubmit}
                      ref={input => { this.participantName = input }}
                  /> }
                  <LabelContainer>
                    {renderLabel()}
                  </LabelContainer>
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
  background: ${props => props.backgroundColor ? props.backgroundColor : '`#fff`'};
  elevation: ${props => props.isElevated ? theme.CARD_ELEVATION : 0};

  /* iOS Shadows */
  shadowColor: ${props => props.backgroundColor ? props.backgroundColor : '#555'};
  shadowOpacity: ${props => props.backgroundColor ? '0.4' : '0.1'};
  shadowRadius: 10;
`;

const CustomText = styled.TextInput`
  display: flex
  flex-direction: row;
  padding-left: 10px;
  display: ${props => props.classEntered ? 'flex' : 'none'};  
`;

const SearchField = styled(CustomText)`
  display: ${props => props.nameEntered ? 'flex' : 'none'};  
`
const FilterButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchButton = styled(FilterButton)`
`

const LabelContainer = styled.View`
  display: flex; 
  padding-left: ${theme.SPACING_SMALL};
  top: 5px;
  align-items: center;
  margin-bottom: ${theme.SPACING_SMALL};
  justify-content: center;
  background: ${theme.COLOR_LIGHT_GRAY};
`;

const SearchIcon = styled.Image`
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

const ClassLabel = styled.View`
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

const LabelClassName = styled.Text`
  color: white;
  align-items: center;
  font-family: ${theme.FONT_SEMIBOLD};
  letter-spacing: ${theme.LETTER_SPACING_SMALL};
`;

const LabelIcon = styled.Image`
  tintColor: #ffff;
  width: 10;
  height: 10;
`;

const IconTag = styled.View`
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

ListContainer.propTypes = {
    children: PropTypes.element.isRequired,
};

export default ListContainer;