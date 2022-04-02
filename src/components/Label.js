import React, { Component } from 'react';
import styled from 'styled-components';
import theme from '../styles/theme.style.js';

class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReadOnly: true,
      isPressed: false,
    };
  }

  selectLabel = () => {
    this.setState({isPressed : !this.state.isPressed})
  }

  render() {
    return (
      <Container disabled={this.props.isReadOnly} onPress={this.selectLabel} stacked={this.props.stacked}>
        <TextContainer isPressed={this.state.isPressed} backgroundColor={this.props.labelColor} isReadOnly={this.props.isReadOnly}>
            <LabelText isCaption={this.props.isCaption} > 
              {this.props.children}
            </LabelText>
        </TextContainer>
        <IconTag isPressed={this.state.isPressed} backgroundColor={this.props.labelColor} isReadOnly={this.props.isReadOnly}>
          <LabelIcon source={this.props.labelIcon} />
        </IconTag>
      </Container>
    ); 
  }
}

// STYLED-COMPONENTS
const Container = styled.TouchableOpacity `
  display: flex;
  flex-direction: row;
  margin-right: 10;
  margin-bottom: ${(props) => props.stacked ? 5 : 0};
`;

const TextContainer = styled.View `
  padding-horizontal: 10;
  padding-vertical: 5;
  border-top-left-radius: 100;
  border-bottom-left-radius: 100;
  border-top-right-radius: ${props => props.isReadOnly ? '100' : '0'};
  border-bottom-right-radius: ${props => props.isReadOnly ? '100' : '0'};
  background-color: ${props => props.isPressed ? '#CECECE' : (props.backgroundColor ? props.backgroundColor : theme.COLOR_BLUE)};
`;

const LabelText = styled.Text`
  color: white;
  font-size: ${(props) => props.isCaption ? theme.FONT_SIZE_SMALL : theme.FONT_SIZE_MEDIUM};
  font-family: ${theme.FONT_SEMIBOLD};
  letter-spacing: ${theme.LETTER_SPACING_SMALL};
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
  display: ${props => props.isReadOnly ? 'none' : 'flex'};
  justify-content: center;
  padding-horizontal: 5;
  background-color: ${props => props.isPressed ? '#CECECE' : (props.backgroundColor ? `${props.backgroundColor}50` : `${theme.COLOR_BLUE}50`)};
`;

export default Label;
