import React from 'react';

export class RightParameterUI extends React.Component {
  constructor(props) {
    super(props);

    this.handleDegreeChange = this.handleDegreeChange.bind(this);
    this.handleAngularVelocityChange = this.handleAngularVelocityChange.bind(this);
    this.handleFrontWheelRadiusChange = this.handleFrontWheelRadiusChange.bind(this);
    this.handleDistF2BChange = this.handleDistF2BChange.bind(this);

  }
  handleDistF2BChange(e) {
    this.props.onDistF2BChange(e.target.value);
  };
  handleDegreeChange(e) {
    this.props.onDegreeChange(e.target.value);
  };
  handleAngularVelocityChange(e) {
    this.props.onAngularVelocityChange(e.target.value);
  };
  handleFrontWheelRadiusChange(e) {
    this.props.onFrontWheelRadiusChange(e.target.value);
  };

  render() {
    switch (this.props.jQuery) {
      case 'Diff. Drive':
        return (<div id="rightParameterUI">
          Parameters (just as a reminder for the future, we need to do error checking on all parameters)
          <br></br>
          <label for="parameter_1" id="label_1">Other:</label>
          <br></br>
          <input
            type="text"
            placeholder="Search..."
            id="parameter_1"
          />
          <br></br>
          <label for="parameter_2">Speed:</label>
          <br></br>
          <input type="number" placeholder="10" id="parameter_2" />
          <br></br>
          <label for="degree" >Degree:</label>
          <br></br>
          <input type="number" id="degree" placeholder='0'></input>
        </div>)
      case 'Bicycle':
        return (<div id="rightParameterUI">
          Parameter (just as a reminder for the future, we need to do error checking on all parameters)
          <br></br>
          <label for="parameter_1" id="label_1">Other:</label>
          <br></br>
          <input
            type="text"
            placeholder="Search..."
            id="parameter_1"

          />
          <br></br>
          <label data-testid = "done" for="fRadius">Front Wheel Radius:</label>
          <br></br>
          <input type="number" data-testid = "r" id="fRadius" placeholder='0' onChange={this.handleFrontWheelRadiusChange}></input>
          <br></br>

          <label for="degree" >Degree:</label>
          <br></br>
          <input type="number" id="degree" placeholder='0' onChange={this.handleDegreeChange}></input>
          <br></br>

          <label for="DistFrontToBack">Distance front to back:</label>
          <br></br>
          <input type="number" id="DistFrontToBack" placeholder='0' onChange={this.handleDistF2BChange}></input>
          <br></br>

          <label for="AnglularVelocity">Anglular Velocity:</label>
          <br></br>
          <input data-testid = "adam" type="number" id="AnglularVelocity" placeholder='0' onChange={this.handleAngularVelocityChange}></input>

        </div>)
      case 'Tricycle':
        return (<div id="rightParameterUI">
          Parametes (just as a reminder for the future, we need to do error checking on all parameters)
          <br></br>
          <label for="parameter_1" id="label_1">Other:</label>
          <br></br>
          <input
            type="text"
            placeholder="Search..."
            id="parameter_1"

          />
          <br></br>
          <label for="parameter_2">Speed:</label>
          <br></br>
          <input type="number" placeholder="10" id="parameter_2" />
          <br></br>
          <label for="degree" >Degree:</label>
          <br></br>
          <input type="number" id="degree" placeholder='0'></input>
        </div>)

      //for some reason, switching between bicycle and one of the pathfinding algorithms causes an unforseen error because the jQueryCode is still checking for a parameter for some reason. This is a 
      //way to fix it for now, just render an input that will be overwritten
      case 'PRM':
        return (<div id="rightParameterUI">
          <input type="number" id="degree" placeholder='0'></input>
        </div>
        )
      case 'RET':
        return (<div id="rightParameterUI">
          <input type="number" id="degree" placeholder='0'></input>
        </div>
        )
    }
}
}