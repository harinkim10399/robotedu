import React from 'react'

export class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }

  //THIS IS WHERE YOU PUT YOUR JAVASCRIPT/JQUERY CODE FOR MOTION MODELS/PATHFINDING ALGORITHMS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  jQueryCodeRET = () => {
    document.getElementById("canvas").setAttribute('data-testid', "c")
  }
    
  //rendering jQuery code when you first render the Canvas Component
  componentDidMount() {

    switch (this.props.jQuery) {
      case "RET":
        this.jQueryCodeRET();
        break;
      case "PRM":
        this.jQueryCodePRM();
        break;
      case "Diff. Drive":
        this.jQueryCodeDiffDrive();
        break;
      case "Bicycle":
        this.jQueryCodeBicycle();
        break;
      case "Tricycle":
        this.jQueryCodeTricycle();
        break;
    }
  }
  //using JQuery code when you re-render (update) the Canvas Component
  componentDidUpdate() {
    switch (this.props.jQuery) {
      case "RET":
        this.jQueryCodeRET();
        break;
      case "PRM":
        this.jQueryCodePRM();
        break;
      case "Diff. Drive":
        this.jQueryCodeDiffDrive();
        break;
      case "Bicycle":
        this.jQueryCodeBicycle();
        break;
      case "Tricycle":
        this.jQueryCodeTricycle();
        break;
    }
  }
  
  render() {
    return (<div id="canvasSpace">
      <canvas data-testid = "p" id="canvas" width={900} height={300}></canvas>
    </div>)
  }
}

