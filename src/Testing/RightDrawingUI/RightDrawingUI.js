import React from "react";

export class RightDrawingUI extends React.Component {
  render() {
    return (<div id="rightDrawingUI">
      Drawing UI
      <div>

        <button data-testid="done">Click when done assigning points</button>
        <br></br>
        <button id="clear">Click to clear all obstacles</button>
        <br></br>
        <button id="delete">Click to delete all shapes</button>
        <br></br>
        <button id="goal">Click to set goal</button>
        <br></br>
        <button id="start">Click to set start</button>
      </div>
    </div>)
  }
}