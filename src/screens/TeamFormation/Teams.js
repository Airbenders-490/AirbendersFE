import React, { Component, } from 'react';
import TeamFormationTabs from "./TeamFormationTabs.js";

class Teams extends Component {
  constructor(props) {
    super(props);
  }

  // Write functions here

  render() {
    return (
      //<ScreenContainer screenTitle='Teams'>

      <TeamFormationTabs navigation={this.props.navigation} />


    //</ScreenContainer>
    );
  }
}

export default Teams;

