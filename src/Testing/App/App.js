import React from 'react';
import { Navbar } from '../Navbar/Navbar'
import { HomePage } from '../HomePage/HomePage'
import { Canvas } from '../Canvas/Canvas'
import { RightParameterUI } from '../RightParameterUI/RightParameterUI';

export class App extends React.Component {
  /*TO SUMMARIZE, THE APP CLASS MANAGES ALL STATE CHANGES AND ACTS ALMOST LIKE A PARENT CLASS. THE TERM 'CLASS' AND 'COMPONENT' ARE USED
  INTERCHANGEABLY. ALL STATE CHANGES ARE MADE, HOWEVER, BY CHILD CLASSES VIA EVENT HANDLERS. THINK ENCAPSULATION FROM COMP401.*/

  constructor(props) {
    super(props);
    this.state = {
      default: true,
      filterText: '',
      page: '',
      degree: 0,
    };
    this.toggleButton = this.toggleButton.bind(this);
    this.handleDegreeChange = this.handleDegreeChange.bind(this);
    this.handleDistF2BChange = this.handleDistF2BChange.bind(this);
    this.handleAngularVelocityChange = this.handleAngularVelocityChange.bind(this);
    this.handleFrontWheelRadiusChange = this.handleFrontWheelRadiusChange.bind(this)
  }
  toggleButton = (num) => {
    this.setState({ page: num }, () => {
      console.log('');
    });
  };

  handleDegreeChange = (num) => {
    this.setState({ degree: num }, () => {
      console.log('');
    });
  }

  handleDistF2BChange = (num) => {
    this.setState({ DistFrontToBack: num }, () => {
      console.log('');
    });
  }
  handleAngularVelocityChange = (num) => {
    this.setState({ AnglularVelocity: num }, () => {
      console.log('');
    });
  }
  handleFrontWheelRadiusChange = (num) => {
    this.setState({ fRadius: num }, () => {
      console.log('');
    });
  }

  //rendering components conditionally based on what tab you clicked on: (this.state.page). Right now, all tabs are rendering the same stuff but that can be changed. 
  render() {
    switch (this.state.page) {
      default:
        return (<><Navbar toggleButton={this.toggleButton} /><HomePage /></>)
    }
  }
}