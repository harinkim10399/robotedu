import React from 'react';

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleButton = this.toggleButton.bind(this)
  }
  toggleButton(e) {
    this.props.toggleButton(e.target.name)
  }

  render() {

    return (<div id="naving">
      <nav data-testid = "p" className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Interactive Robotics Education Tool</a>
          </div>

          <ul className="nav navbar-nav">
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Path Algorithms
                <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#Algorithm_1" data-testid = "a" onClick={this.toggleButton} name="RET">Rapidly Exploring Random Trees</a></li>
                <li><a href="#Algorithm_2" onClick={this.toggleButton} name="PRM">Probabilistic Road Map</a></li>
              </ul>
            </li>

            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Motion Models
                <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#Model_1" onClick={this.toggleButton} name="Diff. Drive">Differential Drive</a></li>
                <li><a href="#Model_2" onClick={this.toggleButton} name="Bicycle">Bicycle</a></li>
                <li><a href="#Model_3" onClick={this.toggleButton} name="Tricycle">Tricycle</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>)
  }
}