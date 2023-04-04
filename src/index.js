import React from 'react';
import ReactDOM from 'react-dom';
import cycles from './Motion Models/js_versions/Motion_Model_Bicycle';
import tricycle from './Motion Models/js_versions/Motion_Model_Tricycle';
import diff from './Motion Models/js_versions/Motion_Model_Differential';
import RRT from './Path Finding/RRT';
import Bug0 from './Path Finding/bug0class'
import './index.css';
import reportWebVitals from './reportWebVitals';

reportWebVitals();

class App extends React.Component {
  /*TO SUMMARIZE, THE APP CLASS MANAGES ALL STATE CHANGES AND ACTS ALMOST LIKE A PARENT CLASS. THE TERM 'CLASS' AND 'COMPONENT' ARE USED
  INTERCHANGEABLY. ALL STATE CHANGES ARE MADE, HOWEVER, BY "CHILD" CLASSES VIA EVENT HANDLERS. THINK ENCAPSULATION FROM COMP401.
  Also, the constructor(props) {super(props)} syntax is not just a formality. You cannot use this keyword methods without calling the parent
  constructor, which in this case is the React.Component class */
  //the reason why console.log() proceeds all the state setters is to ensure that the state sets properly before calling anything else
  constructor(props) {
    super(props);
    //set up all parameters
    this.state = {
      page: '',
      steeringAngle: 0,
      angularVelocity: 0,
      distBetweenWheels: 0,
      leftAngularVelocity: 0,
      rightAngularVelocity: 0,
      leftWheelRadius: 0,
      rightWheelRadius: 0,
      frontWheelRadius: 0,
      distFrontToBack: 0,
      distBackTwoWheels: 0,
    };

    //Handling changes in page or parameter UI state
    this.togglePage = this.togglePage.bind(this);
    this.toggleResetParameters = this.toggleResetParameters.bind(this);
    //Handling changes in Bicycle/Tricycle Parameters
    this.handleSteeringAngleChange = this.handleSteeringAngleChange.bind(this); //steering angle
    this.handleDistFrontToBackChange = this.handleDistFrontToBackChange.bind(this); //distance front to back
    this.handleAngularVelocityChange = this.handleAngularVelocityChange.bind(this); //angular velocity
    this.handleFrontWheelRadiusChange = this.handleFrontWheelRadiusChange.bind(this); //front wheel radius
    this.handleDistBackTwoWheelsChange = this.handleDistBackTwoWheelsChange.bind(this); //back two wheels distance apart
    //Handling changes in differential drive parameters
    this.handleDistBetweenWheelsChange = this.handleDistBetweenWheelsChange.bind(this);
    this.handleLeftAngularVelocityChange = this.handleLeftAngularVelocityChange.bind(this);
    this.handleRightAngularVelocityChange = this.handleRightAngularVelocityChange.bind(this);
    this.handleLeftWheelRadiusChange = this.handleLeftWheelRadiusChange.bind(this);
    this.handleRightWheelRadiusChange = this.handleRightWheelRadiusChange.bind(this);
  }
  //reset parameters to 0 when hitting "reset" button
  toggleResetParameters = () => {
    this.setState({
      steeringAngle: 0,
      angularVelocity: 0,
      distBetweenWheels: 0,
      leftAngularVelocity: 0,
      rightAngularVelocity: 0,
      leftWheelRadius: 0,
      rightWheelRadius: 0,
      frontWheelRadius: 0,
      distFrontToBack: 0,
      distBackTwoWheels: 0,
    }, () => {
      console.log('');
    });
  }
  //reset all parameters to 0 when switching in between pages to ensure motion models don't continue to run in background
  togglePage = (num) => {
    this.setState({
      page: num,
      steeringAngle: 0,
      angularVelocity: 0,
      distBetweenWheels: 0,
      leftAngularVelocity: 0,
      rightAngularVelocity: 0,
      leftWheelRadius: 0,
      rightWheelRadius: 0,
      frontWheelRadius: 0,
      distFrontToBack: 0,
      distBackTwoWheels: 0,
    }, () => {
      console.log('');
    });
    //clear out all the input fields to ensure user doesn't get confused when motion model doesn't render via JQuery
    switch (this.state.page) {
      case 'Diff. Drive':
        document.getElementById('leftWheelRadius').value = '';
        document.getElementById('rightWheelRadius').value = '';
        document.getElementById('distBetweenWheels').value = '';
        document.getElementById('leftAngularVelocity').value = '';
        document.getElementById('rightAngularVelocity').value = '';
        break;
      case 'Bicycle':
        document.getElementById('frontWheelRadius').value = '';
        document.getElementById('distFrontToBack').value = '';
        document.getElementById('steeringAngle').value = '';
        document.getElementById('angularVelocity').value = '';
        break;
      case 'Tricycle':
        document.getElementById('frontWheelRadius').value = '';
        document.getElementById('distFrontToBack').value = '';
        document.getElementById('steeringAngle').value = '';
        document.getElementById('angularVelocity').value = '';
        document.getElementById('distBetweenBackWheels').value = '';
        break;
      //for some reason causes an error if you don't add the following case.
      case "RET":
        break;
    }
  };
  //state setters (syntax much more complex than Java)
  handleSteeringAngleChange = (num) => {
    this.setState({ steeringAngle: num }, () => {
      console.log('');
    });
  }

  handleDistBetweenWheelsChange = (num) => {
    this.setState({ distBetweenWheels: num }, () => {
      console.log('');
    });
  }

  handleLeftAngularVelocityChange = (num) => {
    this.setState({ leftAngularVelocity: num }, () => {
      console.log('');
    });
  }

  handleRightAngularVelocityChange = (num) => {
    this.setState({ rightAngularVelocity: num }, () => {
      console.log('');
    });
  }

  handleLeftWheelRadiusChange = (num) => {
    this.setState({ leftWheelRadius: num }, () => {
      console.log('');
    });
  }

  handleRightWheelRadiusChange = (num) => {
    this.setState({ rightWheelRadius: num }, () => {
      console.log('');
    });
  }

  handleDistFrontToBackChange = (num) => {
    this.setState({ distFrontToBack: num }, () => {
      console.log('');
    });
  }

  handleAngularVelocityChange = (num) => {
    this.setState({ angularVelocity: num }, () => {
      console.log('');
    });
  }

  handleDistBackTwoWheelsChange = (num) => {
    this.setState({ distBackTwoWheels: num }, () => {
      console.log('');
    });
  }

  handleFrontWheelRadiusChange = (num) => {
    this.setState({ frontWheelRadius: num }, () => {
      console.log('');
    });
  }

  //rendering components conditionally based on what tab you clicked on: (this.state.page). 
  render() {
    switch (this.state.page) {
      case 'RET':
        return (<><Navbar togglePage={this.togglePage} /><Canvas jQuery={this.state.page} /><RightDrawingUI /><LowerControlUI jQuery={this.state.page} /><Footer jQuery={this.state.page} /></>)
        break;
      case 'Bug0':
        return (<><Navbar togglePage={this.togglePage} /><Canvas jQuery={this.state.page} /><RightDrawingUI /><LowerControlUI jQuery={this.state.page} /><Footer jQuery={this.state.page} /></>)
        break;
      case 'Diff. Drive':
        return (<><Navbar toggleResetParameters={this.toggleResetParameters} togglePage={this.togglePage} /><Canvas
          leftWheelRadius={this.state.leftWheelRadius}
          rightWheelRadius={this.state.rightWheelRadius}
          leftAngularVelocity={this.state.leftAngularVelocity}
          rightAngularVelocity={this.state.rightAngularVelocity}
          distBetweenWheels={this.state.distBetweenWheels}
          jQuery={this.state.page} /><RightParameterUI onLeftAngularVelocityChange={this.handleLeftAngularVelocityChange}
            onRightAngularVelocityChange={this.handleRightAngularVelocityChange}
            onLeftWheelRadiusChange={this.handleLeftWheelRadiusChange}
            onRightWheelRadiusChange={this.handleRightWheelRadiusChange}
            onDistBetweenWheelsChange={this.handleDistBetweenWheelsChange}
            jQuery={this.state.page} /><LowerControlUI jQuery={this.state.page} toggleResetParameters={this.toggleResetParameters} /><Footer jQuery={this.state.page} /></>)
        break;
      case 'Bicycle':
        return (<><Navbar togglePage={this.togglePage} /><Canvas jQuery={this.state.page}
          steeringAngle={this.state.steeringAngle}
          angularVelocity={this.state.angularVelocity}
          distFrontToBack={this.state.distFrontToBack}
          frontWheelRadius={this.state.frontWheelRadius}
        /><RightParameterUI
            onAngularVelocityChange={this.handleAngularVelocityChange}
            onSteeringAngleChange={this.handleSteeringAngleChange}
            onFrontWheelRadiusChange={this.handleFrontWheelRadiusChange}
            onDistFrontToBackChange={this.handleDistFrontToBackChange}
            jQuery={this.state.page} /><LowerControlUI jQuery={this.state.page} toggleResetParameters={this.toggleResetParameters} /><Footer jQuery={this.state.page} /></>)
        break;
      case 'Tricycle':
        return (<><Navbar togglePage={this.togglePage} /><Canvas
          steeringAngle={this.state.steeringAngle}
          angularVelocity={this.state.angularVelocity}
          distFrontToBack={this.state.distFrontToBack}
          frontWheelRadius={this.state.frontWheelRadius}
          distBackTwoWheels={this.state.distBackTwoWheels} jQuery={this.state.page} />
          <RightParameterUI onAngularVelocityChange={this.handleAngularVelocityChange}
            onSteeringAngleChange={this.handleSteeringAngleChange}
            onDistBackTwoWheelsChange={this.handleDistBackTwoWheelsChange}
            onFrontWheelRadiusChange={this.handleFrontWheelRadiusChange}
            onDistFrontToBackChange={this.handleDistFrontToBackChange}
            jQuery={this.state.page} /><LowerControlUI jQuery={this.state.page} toggleResetParameters={this.toggleResetParameters} /><Footer jQuery={this.state.page} /></>)
        break;
      default:
        return (<><Navbar togglePage={this.togglePage} /><HomePage /></>)
    }
  }
}

class HomePage extends React.Component {
  render() {
    return (<div class="center">
      <p>Welcome to the Interactive Robotics Education Tool! This web application is designed to help visualize some important robotics concepts through hands-on manipulation.
        To begin, click on the Navbar above either on "Pathfinding Algorithms" or on "Motion Models".
        <br></br><br></br>Application developed by Avery Clark, Felimon Holland, Adam Nguyen, and Owen Zook for COMP523, Spring 2022. Visit our website for the project <a target="_blank" href="https://tarheels.live/comp523teaml/"><b>here</b></a></p>
    </div>)
  }
}

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.togglePage = this.togglePage.bind(this)
  }
  //these methods are defined to call the parent method of the same name
  togglePage(e) {
    this.props.togglePage(e.target.name)
  }

  render() {
    return (<div id="naving">
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" onClick={this.togglePage} name="HomePage">Interactive Robotics Education Tool</a>
          </div>
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">Path Algorithms
                <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#Algorithm_1" onClick={this.togglePage} name="RET">Rapidly Exploring Random Trees</a></li>
                <li><a href="#Algorithm_2" onClick={this.togglePage} name="Bug0">Bug 0</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">Motion Models
                <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#Model_1" onClick={this.togglePage} name="Diff. Drive">Differential Drive</a></li>
                <li><a href="#Model_2" onClick={this.togglePage} name="Bicycle">Bicycle</a></li>
                <li><a href="#Model_3" onClick={this.togglePage} name="Tricycle">Tricycle</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>)
  }
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);

  }
  //THIS IS WHERE YOU PUT YOUR JAVASCRIPT/JQUERY CODE FOR MOTION MODELS/PATHFINDING ALGORITHMS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  jQueryCodeRET = () => {
    //Does: Creates canvas based off screen size
    function establishCanvas() {
      var div = document.getElementById("canvasSpace");
      var canvas = document.createElement('canvas');
      if (window.innerWidth <= 700) {
        var sizeWidth = 100 * window.innerWidth / 100,
          sizeHeight = 65 * window.innerHeight / 100;
      } else {
        var sizeWidth = 80 * window.innerWidth / 100,
          sizeHeight = 62 * window.innerHeight / 100;
      }


      canvas.width = sizeWidth;
      canvas.height = sizeHeight;
      document.getElementById("canvas").remove();
      div.innerHTML += '<canvas id="canvas" width= ' + sizeWidth + ' height=' + sizeHeight + '></canvas>';
    }

    establishCanvas()
    var canvas = document.getElementById("canvas");
    document.getElementById("canvas").style.backgroundColor = "#e6edee";
    var context = canvas.getContext("2d");
    var cw = canvas.width;
    var ch = canvas.height;
    var offsetX, offsetY;
    //Does: Setups canvas so you can draw even after scrolling
    function reOffset() {
      var BB = canvas.getBoundingClientRect();
      offsetX = BB.left;
      offsetY = BB.top;
    }
    reOffset();
    window.onscroll = function (e) {
      reOffset();
    }
    //Does: Initalizes obstacles
    var coordinates = [];
    var isDone = 0;
    var innerArray = [];
    coordinates.push(innerArray);

    //Does: next mouse sets goal or start
    var setGoal = false;
    var goalCoord;
    var setStart = false;
    var startCoord;

    //set values for playing
    var play = false;
    let tree = null;
    var step = false;;

    //Does: deletes all obstacles
    $('#delete').click(function () {
      context.clearRect(0, 0, cw, ch);
      drawGoalandStart()
    });

    //Does: Delete all of canvas and obstacles
    $('#clear').click(function () {
      context.clearRect(0, 0, cw, ch);
      isDone = 0;
      coordinates = [];
      innerArray = [];
      coordinates.push(innerArray);
      drawGoalandStart()

    });
    //Does: sets up buttons for start and goal for robot 
    //Does: setup initalize robot pos/ goal position 
    //Does: setup collision detection when initalizing robot and obstacles 
    $('#goal').click(function () {
      setGoal = true;
      setStart = false;
    });

    $('#start').click(function () {
      setStart = true;
      setGoal = false;
    });
    //Does: handles when cavas is clicked
    //Do: make conditions for goal and start
    $("#canvas").mousedown(function (e) {
      if (setStart) {
        placeStart(e);
      } else if (setGoal) {
        placeGoal(e);
      } else {
        drawObstacle(e);
      }
    });
    function placeStart(e) {
      //Do: edgecase for pre drawn obstacles
      e.preventDefault();
      e.stopPropagation();
      var mouseX = parseInt(e.clientX - offsetX);
      var mouseY = parseInt(e.clientY - offsetY);

      //Edge case that "erases previous drawn circle"
      if (startCoord != null) {
        context.beginPath();
        context.arc(startCoord.x, startCoord.y, 9, 0, 2 * Math.PI);
        context.fillStyle = 'white';
        context.strokeStyle = 'white';
        context.stroke();
        context.fill()
      }

      context.beginPath();
      context.arc(mouseX, mouseY, 8, 0, 2 * Math.PI);
      context.fillStyle = 'blue';
      context.strokeStyle = 'blue';
      context.stroke();
      context.fill()
      startCoord = { x: mouseX, y: mouseY };
      setStart = false;
    };

    function placeGoal(e) {
      //Do: edgecase for predrawn obstacles
      e.preventDefault();
      e.stopPropagation();
      var mouseX = parseInt(e.clientX - offsetX);
      var mouseY = parseInt(e.clientY - offsetY);
      context.lineWidth = 0;
      //Edge case that "erases previous drawn circle"
      if (goalCoord != null) {
        context.beginPath();
        context.arc(goalCoord.x, goalCoord.y, 9, 0, 2 * Math.PI);
        context.fillStyle = 'white';
        context.strokeStyle = 'white';
        context.stroke();
        context.fill()
      }
      context.beginPath();
      context.arc(mouseX, mouseY, 8, 0, 2 * Math.PI);
      context.fillStyle = 'green';
      context.strokeStyle = 'green';
      context.stroke();
      context.fill()
      goalCoord = { x: mouseX, y: mouseY };
      setGoal = false;
    };
    function drawObstacle(e) {
      // Does: tell the browser we're handling this event
      e.preventDefault();
      e.stopPropagation();
      var mouseX = parseInt(e.clientX - offsetX);
      var mouseY = parseInt(e.clientY - offsetY);
      coordinates[isDone].push({ x: mouseX, y: mouseY });
      if (coordinates[isDone].length == 1) {
        context.beginPath();
        context.moveTo(mouseX, mouseY);
      } else {
        context.lineWidth = 10;
        //Check distance and snap if close enough to start
        var a = coordinates[isDone][0].x - mouseX;
        var b = coordinates[isDone][0].y - mouseY;
        var c = Math.sqrt(a * a + b * b);

        if (c < 20) {

          context.strokeStyle = 'red';
          context.lineTo(mouseX, mouseY);
          context.stroke();
          fill();
        } else {
          context.strokeStyle = 'red';
          context.lineTo(mouseX, mouseY);
          context.stroke();
        }
        context.lineWidth = 2;
      }
    }
    function fill() {
      context.fillStyle = 'red';
      context.fill();
      isDone = isDone + 1;
      var innerArray = [];
      coordinates.push(innerArray);
    }
    //Does: Draws all stored obstacles 
    function drawPolygons() {
      //Does: setup drawing
      context.lineWidth = 10;
      context.strokeStyle = 'red';
      for (var obstacle = 0; obstacle < coordinates.length - 1; obstacle++) {
        context.beginPath();

        context.moveTo(coordinates[obstacle][0].x, coordinates[obstacle][0].y);
        for (var index = 1; index < coordinates[obstacle].length; index++) {
          context.lineTo(coordinates[obstacle][index].x, coordinates[obstacle][index].y);
        }
        context.closePath();
        //Colors/Fills Shapes
        context.fillStyle = 'red';
        context.stroke();
        context.fill();

      }

      context.lineWidth = 2;
    }

    function drawGoalandStart() {
      context.lineWidth = 0;
      if (goalCoord != null) {
        context.beginPath();
        context.arc(goalCoord.x, goalCoord.y, 8, 0, 2 * Math.PI);
        context.fillStyle = 'green';
        context.strokeStyle = 'green';
        context.stroke();
        context.fill();

      }

      if (startCoord != null) {
        context.beginPath();
        context.arc(startCoord.x, startCoord.y, 8, 0, 2 * Math.PI);
        context.fillStyle = 'blue';
        context.strokeStyle = 'blue';
        context.stroke();
        context.fill();
      }
      return;
    }
    //Does: Plays algo
    $('#playRET').click(function () {

      play = true;
      var go = 'again';
      playAlgo(go);

    });

    $('#pauseRET').click(function () {

      play = false;

    });
    //recursive play for time delay
    function playAlgo(go) {
      if (play) {
        if ((typeof go) == 'string') {

          setTimeout(() => {

            go = oneStep();

            playAlgo(go);
          }, 1000 / 60);

        } else {
          if (tree != null) {
            //draw path from last part of array 
            //call prev until it its null
            var node = go[1];


            node = node.nodes[node.nodes.length - 1];

            var nodeNext = node.prev;

            while (nodeNext != null) {

              drawFullPath(node.x, node.y, nodeNext.x, nodeNext.y);
              node = nodeNext;
              nodeNext = node.prev;
            }

          }
        }
      }
    }
    //Does:  
    $('#resetRET').click(function () {

      context.clearRect(0, 0, cw, ch);
      tree = null;
      drawPolygons()
      drawGoalandStart();


    });
    $('#stepRET').click(function () {
      play = false;
      step = true;
      oneStep();
      step = false;

    });
    //Does: Detects red pixel and returns true if it is not red 
    function isOpenPixel(x, y) {

      var p = context.getImageData(x, y, 1, 1).data;

      if (p[0] == 255) {



        return false;
      } else {

        return true;
      }
    }




    //return if the distance is greater
    function midpointCalc(sx, sy, ex, ey) {
      //check distance
      var a = ex - sx;
      var b = ey - sy;
      var c = Math.sqrt(a * a + b * b);
      //return true if distance is within limit
      if (c < 4) {
        return true;
      }

      //get midpoint 
      var midx = (ex + sx) / 2;
      var midy = (ey + sy) / 2;

      //if point there return false
      if (!isOpenPixel(midx, midy)) {
        return false;
      }

      // call function twice both with midpoints 
      return (midpointCalc(sx, sy, midx, midy) && midpointCalc(midx, midy, ex, ey))
    }


    $('#line').click(function () {



    });


    function oneStep() {
      context.lineWidth = 2;
      if (goalCoord == null || startCoord == null) {
        return;


      } else {

        var AlgoGoal = [goalCoord.x, goalCoord.y];
        var AlgoStart = [startCoord.x, startCoord.y];

      }





      var go = 'again';
      if (tree == null) {
        tree = new RRT(AlgoStart, AlgoGoal, 20, 0, 8, .1, [cw, ch]);
      }

      var node = tree.randomCheck();
      //detects for colision
      var blocked = midpointCalc(node.prev.x, node.prev.y, node.x, node.y);


      drawNodesAndLine(node.prev.x, node.prev.y, node.x, node.y, blocked);


      if (blocked == false) {
        go = tree.collide(node);

        return go;
      } else {

        //if no collision
        go = tree.move(node);


        return go;
      }



    }
    function drawFullPath(x, y, x1, y1,) {

      x = parseInt(x);
      y = parseInt(y);
      x1 = parseInt(x1);
      y1 = parseInt(y1);
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x1, y1);
      context.strokeStyle = 'orange';
      context.stroke();

      context.beginPath();
      context.lineWidth = 0;
      context.fillStyle = 'black';
      context.arc(x1, y1, 3, 0, 2 * Math.PI);
      context.stroke();
      context.fill();
    }
    function drawNodesAndLine(x, y, x1, y1, isBlocked) {
      if (!step && !isBlocked) {
        return;
      }
      var nodeColor = `rgb(0, 255, 0)`;
      var lineColor = `rgb(0, 0, 255)`;
      if (!isBlocked) {
        nodeColor = `rgb(255, 0, 255)`;
        lineColor = `rgb(255, 255, 0)`;
      }

      x = parseInt(x);
      y = parseInt(y);
      x1 = parseInt(x1);
      y1 = parseInt(y1);


      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x1, y1);
      context.strokeStyle = lineColor;
      context.stroke();

      context.beginPath();
      context.fillStyle = nodeColor;
      context.arc(x1, y1, 2, 0, 2 * Math.PI);
      context.fill();




    }
  }
  // First pass at jquery code for Bug0, mostly copied from RRT impl
  jQueryCodeBug0 = () => {
    //Does: Creates canvas based off screen size
    function establishCanvas() {
      var div = document.getElementById("canvasSpace");
      var canvas = document.createElement('canvas');
      if (window.innerWidth <= 700) {
        var sizeWidth = 100 * window.innerWidth / 100,
          sizeHeight = 65 * window.innerHeight / 100;
      } else {
        var sizeWidth = 80 * window.innerWidth / 100,
          sizeHeight = 62 * window.innerHeight / 100;
      }


      canvas.width = sizeWidth;
      canvas.height = sizeHeight;
      document.getElementById("canvas").remove();
      div.innerHTML += '<canvas id="canvas" width= ' + sizeWidth + ' height=' + sizeHeight + '></canvas>';
    }

    establishCanvas()
    var canvas = document.getElementById("canvas");
    document.getElementById("canvas").style.backgroundColor = "#e6edee";
    var context = canvas.getContext("2d");
    var cw = canvas.width;
    var ch = canvas.height;
    var offsetX, offsetY;
    //Does: Setups canvas so you can draw even after scrolling
    function reOffset() {
      var BB = canvas.getBoundingClientRect();
      offsetX = BB.left;
      offsetY = BB.top;
    }
    reOffset();
    window.onscroll = function (e) {
      reOffset();
    }
    //Does: Initalizes obstacles
    var coordinates = [];
    var isDone = 0;
    var innerArray = [];
    coordinates.push(innerArray);

    //Does: next mouse sets goal or start
    var setGoal = false;
    var goalCoord;
    var setStart = false;
    var startCoord;

    //set values for playing
    var play = false;
    let bug0path = null;
    var step = false;;

    //Does: deletes all obstacles
    $('#delete').click(function () {
      context.clearRect(0, 0, cw, ch);
      drawGoalandStart()
    });

    //Does: Delete all of canvas and obstacles
    $('#clear').click(function () {
      context.clearRect(0, 0, cw, ch);
      isDone = 0;
      coordinates = [];
      innerArray = [];
      coordinates.push(innerArray);
      drawGoalandStart()

    });
    //Does: sets up buttons for start and goal for robot 
    //Does: setup initalize robot pos/ goal position 
    //Does: setup collision detection when initalizing robot and obstacles 
    $('#goal').click(function () {
      setGoal = true;
      setStart = false;
    });

    $('#start').click(function () {
      setStart = true;
      setGoal = false;
    });
    //Does: handles when cavas is clicked
    //Do: make conditions for goal and start
    $("#canvas").mousedown(function (e) {
      if (setStart) {
        placeStart(e);
      } else if (setGoal) {
        placeGoal(e);
      } else {
        drawObstacle(e);
      }
    });
    function placeStart(e) {
      //Do: edgecase for pre drawn obstacles
      e.preventDefault();
      e.stopPropagation();
      var mouseX = parseInt(e.clientX - offsetX);
      var mouseY = parseInt(e.clientY - offsetY);

      //Edge case that "erases previous drawn circle"
      if (startCoord != null) {
        context.beginPath();
        context.arc(startCoord.x, startCoord.y, 9, 0, 2 * Math.PI);
        context.fillStyle = 'white';
        context.strokeStyle = 'white';
        context.stroke();
        context.fill()
      }

      context.beginPath();
      context.arc(mouseX, mouseY, 8, 0, 2 * Math.PI);
      context.fillStyle = 'blue';
      context.strokeStyle = 'blue';
      context.stroke();
      context.fill()
      startCoord = { x: mouseX, y: mouseY };
      setStart = false;
    };

    function placeGoal(e) {
      //Do: edgecase for predrawn obstacles
      e.preventDefault();
      e.stopPropagation();
      var mouseX = parseInt(e.clientX - offsetX);
      var mouseY = parseInt(e.clientY - offsetY);
      context.lineWidth = 0;
      //Edge case that "erases previous drawn circle"
      if (goalCoord != null) {
        context.beginPath();
        context.arc(goalCoord.x, goalCoord.y, 9, 0, 2 * Math.PI);
        context.fillStyle = 'white';
        context.strokeStyle = 'white';
        context.stroke();
        context.fill()
      }
      context.beginPath();
      context.arc(mouseX, mouseY, 8, 0, 2 * Math.PI);
      context.fillStyle = 'green';
      context.strokeStyle = 'green';
      context.stroke();
      context.fill()
      goalCoord = { x: mouseX, y: mouseY };
      setGoal = false;
    };
    function drawObstacle(e) {
      // Does: tell the browser we're handling this event
      e.preventDefault();
      e.stopPropagation();
      var mouseX = parseInt(e.clientX - offsetX);
      var mouseY = parseInt(e.clientY - offsetY);
      coordinates[isDone].push({ x: mouseX, y: mouseY });
      if (coordinates[isDone].length == 1) {
        context.beginPath();
        context.moveTo(mouseX, mouseY);
      } else {
        context.lineWidth = 10;
        //Check distance and snap if close enough to start
        var a = coordinates[isDone][0].x - mouseX;
        var b = coordinates[isDone][0].y - mouseY;
        var c = Math.sqrt(a * a + b * b);

        if (c < 20) {

          context.strokeStyle = 'red';
          context.lineTo(mouseX, mouseY);
          context.stroke();
          fill();
        } else {
          context.strokeStyle = 'red';
          context.lineTo(mouseX, mouseY);
          context.stroke();
        }
        context.lineWidth = 2;
      }
    }
    function fill() {
      context.fillStyle = 'red';
      context.fill();
      isDone = isDone + 1;
      var innerArray = [];
      coordinates.push(innerArray);
    }
    //Does: Draws all stored obstacles 
    function drawPolygons() {
      //Does: setup drawing
      context.lineWidth = 10;
      context.strokeStyle = 'red';
      for (var obstacle = 0; obstacle < coordinates.length - 1; obstacle++) {
        context.beginPath();

        context.moveTo(coordinates[obstacle][0].x, coordinates[obstacle][0].y);
        for (var index = 1; index < coordinates[obstacle].length; index++) {
          context.lineTo(coordinates[obstacle][index].x, coordinates[obstacle][index].y);
        }
        context.closePath();
        //Colors/Fills Shapes
        context.fillStyle = 'red';
        context.stroke();
        context.fill();

      }

      context.lineWidth = 2;
    }

    function drawGoalandStart() {
      context.lineWidth = 0;
      if (goalCoord != null) {
        context.beginPath();
        context.arc(goalCoord.x, goalCoord.y, 8, 0, 2 * Math.PI);
        context.fillStyle = 'green';
        context.strokeStyle = 'green';
        context.stroke();
        context.fill();

      }

      if (startCoord != null) {
        context.beginPath();
        context.arc(startCoord.x, startCoord.y, 8, 0, 2 * Math.PI);
        context.fillStyle = 'blue';
        context.strokeStyle = 'blue';
        context.stroke();
        context.fill();
      }
      return;
    }
    //Does: Plays algo
    $('#playBug0').click(function () {

      play = true;
      var go = 'again';
      playAlgo(go);

    });

    $('#pauseBug0').click(function () {

      play = false;

    });
    //recursive play for time delay
    function playAlgo(go) {
      if (play) {
        if ((typeof go) == 'string') {

          setTimeout(() => {

            go = oneStep();

            playAlgo(go);
          }, 1000 / 60);

        } else {
          if (bug0path != null) {
            //draw path from last part of array 
            //call prev until it its null
            var node = go[1];


            node = node.nodes[node.nodes.length - 1];

            var nodeNext = node.prev;

            while (nodeNext != null) {

              drawFullPath(node.x, node.y, nodeNext.x, nodeNext.y);
              node = nodeNext;
              nodeNext = node.prev;
            }

          }
        }
      }
    }
    //Does:  
    $('#resetBug0').click(function () {

      context.clearRect(0, 0, cw, ch);
      bug0path = null;
      drawPolygons()
      drawGoalandStart();


    });
    $('#stepBug0').click(function () {
      play = false;
      step = true;
      oneStep();
      step = false;

    });
    //Does: Detects red pixel and returns true if it is not red 
    function isOpenPixel(x, y) {

      var p = context.getImageData(x, y, 1, 1).data;

      if (p[0] == 255) {



        return false;
      } else {

        return true;
      }
    }




    //return if the distance is greater
    function midpointCalc(sx, sy, ex, ey) {
      //check distance
      var a = ex - sx;
      var b = ey - sy;
      var c = Math.sqrt(a * a + b * b);
      //return true if distance is within limit
      if (c < 4) {
        return true;
      }

      //get midpoint 
      var midx = (ex + sx) / 2;
      var midy = (ey + sy) / 2;

      //if point there return false
      if (!isOpenPixel(midx, midy)) {
        return false;
      }

      // call function twice both with midpoints 
      return (midpointCalc(sx, sy, midx, midy) && midpointCalc(midx, midy, ex, ey))
    }


    $('#line').click(function () {



    });


    function oneStep() {
      context.lineWidth = 2;
      if (goalCoord == null || startCoord == null) {
        return;


      } else {

        var AlgoGoal = [goalCoord.x, goalCoord.y];
        var AlgoStart = [startCoord.x, startCoord.y];

      }





      var go = 'again';
      if (bug0path == null) {
        bug0path = new Bug0(AlgoStart, AlgoGoal);
      }

      var node = bug0path.towardGoal();
      //detects for colision
      var blocked = midpointCalc(node.prev.x, node.prev.y, node.x, node.y);


      drawNodesAndLine(node.prev.x, node.prev.y, node.x, node.y, blocked);


      if (blocked == false) {
        go = bug0path.collide(node);

        return go;
      } else {

        //if no collision
        go = bug0path.move(node);


        return go;
      }



    }
    function drawFullPath(x, y, x1, y1,) {

      x = parseInt(x);
      y = parseInt(y);
      x1 = parseInt(x1);
      y1 = parseInt(y1);
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x1, y1);
      context.strokeStyle = 'orange';
      context.stroke();

      context.beginPath();
      context.lineWidth = 0;
      context.fillStyle = 'black';
      context.arc(x1, y1, 3, 0, 2 * Math.PI);
      context.stroke();
      context.fill();
    }
    function drawNodesAndLine(x, y, x1, y1, isBlocked) {
      if (!step && !isBlocked) {
        return;
      }
      var nodeColor = `rgb(0, 255, 0)`;
      var lineColor = `rgb(0, 0, 255)`;
      if (!isBlocked) {
        nodeColor = `rgb(255, 0, 255)`;
        lineColor = `rgb(255, 255, 0)`;
      }

      x = parseInt(x);
      y = parseInt(y);
      x1 = parseInt(x1);
      y1 = parseInt(y1);


      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x1, y1);
      context.strokeStyle = lineColor;
      context.stroke();

      context.beginPath();
      context.fillStyle = nodeColor;
      context.arc(x1, y1, 2, 0, 2 * Math.PI);
      context.fill();




    }
  }
  jQueryCodeDiffDrive = () => {
    function establishCanvas() {
      var div = document.getElementById("canvasSpace");
      $("canvas").remove();
      div.innerHTML += '<canvas id="canvas"' + 'width="640"' + 'height="260"></canvas>';
      div.innerHTML += '<canvas id="canvas2"' + 'width="640"' + 'height="260"></canvas>';

    }
    establishCanvas()
    var canvas = document.getElementById("canvas");
    var canvas2 = document.getElementById("canvas2");
    var ctx = canvas.getContext("2d");
    var ctx2 = canvas2.getContext("2d");
    var proceed = true;
    //Do: Establish vehicle frame and and wheel off of a single X and Y coordinate ("concept" function below)
    //Do: Use current JS code (other folder) to change poistion and redraw below 
    //first take the remainder out of 360
    var leftWheelRadius = this.props.leftWheelRadius
    var rightWheelRadius = this.props.rightWheelRadius
    var distBetweenWheels = this.props.distBetweenWheels
    var leftAngularVelocity = this.props.leftAngularVelocity
    var rightAngularVelocity = this.props.rightAngularVelocity
    var startX = canvas.width / 2;
    var startY = canvas.height / 4;
    var diffBodyAngle = 0;

    $('#playMotionModel').click(function () {
      proceed = true;
    })
    $('#pauseMotionModel').click(function () {
      proceed = false;
    })
    const differential = new diff(leftWheelRadius, rightWheelRadius, distBetweenWheels, leftAngularVelocity, rightAngularVelocity, startX, startY, diffBodyAngle);
    //Does: Flips canvas to correct orientation
    ctx.transform(1, 0, 0, -1, 0, canvas.height);
    ctx2.transform(1, 0, 0, -1, 0, canvas.height);
    function concept() {
      //Does: Sets Focul point to center of canvas

      //Pause when off screen
      if (startX > canvas.width) {
        proceed = false;
      }
      if (0 > startX) {
        proceed = false;
      }
      if (startY > canvas.height) {
        proceed = false;
      }
      if (0 > startY) {
        proceed = false;
      }
      //Pause when stop is false
      if (proceed) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw a rotated rect
        var cPos = differential.main();
        startX = cPos[0];
        startY = cPos[1];
        var theta = cPos[2] - Math.PI / 2;

        //left wheel
        drawWheel(startX, startY, leftWheelRadius * 4, -distBetweenWheels * 8, theta);
        //right wheel
        drawWheel(startX, startY, rightWheelRadius * 4, distBetweenWheels * 8, theta)
        //body
        drawBody(startX, startY, distBetweenWheels * 8, theta)
        //trail
        drawTrail(startX, startY);

      }
      function drawTrail(x, y) {
        ctx2.beginPath()
        ctx2.arc(x, y, 1, 0, 2 * Math.PI);
        ctx2.fillStyle = "lime"
        ctx2.fill()
      }

      function drawBody(x, y, width, theta) {
        var bodyX = -width
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);

        ctx.rotate(theta);
        ctx.rect(bodyX, 0, distBetweenWheels * 16, 10);
        ctx.fillStyle = "purple";
        ctx.fill();
        ctx.restore();
      }

      function drawWheel(x, y, width, offset, theta) {
        // first save the untranslated/unrotated context
        ctx.save();
        ctx.beginPath();
        // move the rotation point to the center of the body
        ctx.translate(x, y);
        ctx.rotate(theta);
        //Center is now  0, 0 + offset / 2, now offset for size of box 
        ctx.translate(offset, 0);
        // Note: after transforming [0,0] is visually [x,y] so the rect needs to be offset accordingly when drawn
        ctx.rect(-width / 2, 0, width, 10);
        ctx.fillStyle = "red";
        ctx.fill();
        // restore the context to its untranslated/unrotated state
        ctx.restore();
      }

      setTimeout(() => { window.requestAnimationFrame(concept); }, 1000 / 65);
    }

    window.requestAnimationFrame(concept);

  }

  jQueryCodeBicycle = () => {
    function establishCanvas() {
      var div = document.getElementById("canvasSpace");
      $("canvas").remove();
      div.innerHTML += '<canvas id="canvas"' + 'width="640"' + 'height="260"></canvas>';
      div.innerHTML += '<canvas id="canvas2"' + 'width="640"' + 'height="260"></canvas>';

    }
    establishCanvas()
    var canvas = document.getElementById("canvas");
    var canvas2 = document.getElementById("canvas2");
    var ctx = canvas.getContext("2d");
    var ctx2 = canvas2.getContext("2d");
    var proceed = true;
    //Do: Establish vehicle frame and and wheel off of a single X and Y coordinate ("concept" function below)
    //Do: Use current JS code (other folder) to change poistion and redraw below 
    //first take the remainder out of 360
    var steeringAngle = (this.props.steeringAngle % 360)
    var distFrontToBack = this.props.distFrontToBack;
    var frontWheelRadius = this.props.frontWheelRadius;
    var angularVelocity = this.props.angularVelocity;
    var radians = 0;
    // convert to neg when greater than 180
    if (steeringAngle > 180) {
      steeringAngle = steeringAngle - 360;
    }
    radians = steeringAngle * Math.PI / 180;

    var startX = canvas.width / 2;
    var startY = canvas.height / 4;
    var bikeBodyAngle = 0;
    var notUsedForBikeVariable = 0;

    $('#playMotionModel').click(function () {
      proceed = true;
    })
    $('#pauseMotionModel').click(function () {
      proceed = false;
    })
    const bike = new cycles(frontWheelRadius, distFrontToBack, angularVelocity, radians, startX, startY, bikeBodyAngle, notUsedForBikeVariable);
    //Does: Flips canvas to correct orientation
    ctx.transform(1, 0, 0, -1, 0, canvas.height);
    ctx2.transform(1, 0, 0, -1, 0, canvas.height);
    function concept() {
      //Does: Sets Focul point to center of canvas

      //Pause when off screen
      if (startX > canvas.width) {
        proceed = false;
      }
      if (0 > startX) {
        proceed = false;
      }
      if (startY > canvas.height) {
        proceed = false;
      }
      if (0 > startY) {
        proceed = false;
      }
      //Pause when stop is false
      if (proceed) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw a rotated rect
        var cPos = bike.main();
        startX = cPos[0];
        startY = cPos[1];
        var theta = cPos[2] - Math.PI / 2;
        drawWheel(startX, startY, frontWheelRadius * 2, distFrontToBack / 4, steeringAngle, theta, distFrontToBack);
        drawBody(startX, startY, distFrontToBack, distFrontToBack / 4, theta);
        drawTrail(startX, startY);

      }
      //check rotation
      function drawTrail(x, y) {

        ctx2.beginPath()
        ctx2.arc(x, y, 1, 0, 2 * Math.PI);

        ctx2.fillStyle = "lime"
        ctx2.fill()


      }

      function drawBody(x, y, height, width, theta) {
        var bodyX = -width / 2;
        var bodyY = -height / 2;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(theta);
        ctx.rect(bodyX, bodyY, width, height);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.restore();
      }

      function drawWheel(x, y, height, width, steeringAngles, theta, offset) {
        // first save the untranslated/unrotated context
        ctx.save();
        ctx.beginPath();
        // move the rotation point to the center of the body
        ctx.translate(x, y);
        ctx.rotate(theta);
        //Center is now  0, 0 + offset / 2, now offset for size of box 
        ctx.translate(0, 0 + offset / 2);
        ctx.rotate(steeringAngles * Math.PI / 180);
        // Note: after transforming [0,0] is visually [x,y] so the rect needs to be offset accordingly when drawn
        ctx.rect(-width / 2, -height / 2, width, height);
        ctx.fillStyle = "red";
        ctx.fill();
        // restore the context to its untranslated/unrotated state
        ctx.restore();
      }

      setTimeout(() => { window.requestAnimationFrame(concept); }, 1000 / 65);
    }

    window.requestAnimationFrame(concept);
  }

  jQueryCodeTricycle = () => {
    function establishCanvas() {
      var div = document.getElementById("canvasSpace");
      $("canvas").remove();
      div.innerHTML += '<canvas id="canvas"' + 'width="640"' + 'height="260"></canvas>';
      div.innerHTML += '<canvas id="canvas2"' + 'width="640"' + 'height="260"></canvas>';

    }
    establishCanvas()
    var canvas = document.getElementById("canvas");
    var canvas2 = document.getElementById("canvas2");
    var ctx = canvas.getContext("2d");
    var ctx2 = canvas2.getContext("2d");
    var proceed = true;
    //Do: Establish vehicle frame and and wheel off of a single X and Y coordinate ("concept" function below)
    //Do: Use current JS code (other folder) to change poistion and redraw below 
    //first take the remainder out of 360
    var steeringAngle = (this.props.steeringAngle % 360)
    var distFrontToBack = this.props.distFrontToBack;
    var frontWheelRadius = this.props.frontWheelRadius;
    var angularVelocity = this.props.angularVelocity;
    var distBackTwoWheels = (this.props.distBackTwoWheels / 2);
    var radians = 0;
    // convert to neg when greater than 180
    if (steeringAngle > 180) {
      steeringAngle = steeringAngle - 360;
    }
    radians = steeringAngle * Math.PI / 180;

    var startX = canvas.width / 2;
    var startY = canvas.height / 4;
    var trikeBodyAngle = 0;
    var notUsedForTrikeVariable = 0;

    $('#playMotionModel').click(function () {
      proceed = true;
    })
    $('#pauseMotionModel').click(function () {
      proceed = false;
    })
    const trike = new tricycle(frontWheelRadius, distFrontToBack, angularVelocity, radians, startX, startY, trikeBodyAngle, notUsedForTrikeVariable);
    //Does: Flips canvas to correct orientation
    ctx.transform(1, 0, 0, -1, 0, canvas.height);
    ctx2.transform(1, 0, 0, -1, 0, canvas.height);
    function concept() {

      //Does: Sets Focul point to center of canvas

      //Pause when off screen
      if (startX > canvas.width) {
        proceed = false;
      }
      if (0 > startX) {
        proceed = false;
      }
      if (startY > canvas.height) {
        proceed = false;
      }
      if (0 > startY) {
        proceed = false;
      }
      //Pause when stop is false
      if (proceed) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw a rotated rect
        var cPos = trike.main();
        startX = cPos[0];
        startY = cPos[1];
        var theta = cPos[2];

        //front wheel
        drawWheel(startX, startY, frontWheelRadius, distFrontToBack / 4, steeringAngle, theta, distFrontToBack);
        //back left wheel
        drawWheels(startX, startY, frontWheelRadius, distFrontToBack / 4, steeringAngle, theta, -distBackTwoWheels, distFrontToBack);
        //back right wheel
        drawWheels(startX, startY, frontWheelRadius, -distFrontToBack / 4, steeringAngle, theta, distBackTwoWheels, distFrontToBack);


        drawBody(startX, startY, distFrontToBack, distFrontToBack / 4, theta);
        drawBackRectangle(startX, startY, distFrontToBack / 4, distBackTwoWheels, theta, distFrontToBack)
        drawTrail(startX, startY);




      }
      // drawBackRectangle(startX, startY, distFrontToBack / 4, distBackTwoWheels, theta)
      function drawBackRectangle(x, y, thick, length, theta, offset) {

        var bodyY = length / 2;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);

        ctx.rotate(theta);
        ctx.translate(-offset / 2, 0);


        ctx.rect(0, -bodyY, thick, length);
        ctx.fillStyle = "purple";
        ctx.fill();
        ctx.restore();
      }

      //drawWheels(startX, startY, frontWheelRadius , distFrontToBack / 4, steeringAngle, theta, distBackTwoWheels , distFrontToBack);
      function drawWheels(x, y, radius, thick, steeringAngles, theta, offset1, offset2) {
        // first save the untranslated/unrotated context
        ctx.save();
        ctx.beginPath();
        // move the rotation point to the center of the body
        ctx.translate(x, y);
        ctx.rotate(theta);
        //Center is now  0, 0 + offset / 2, now offset for size of box 
        ctx.translate(-offset2 / 2, offset1 / 2);
        // ctx.rotate(steeringAngles * Math.PI / 180);
        // Note: after transforming [0,0] is visually [x,y] so the rect needs to be offset accordingly when drawn
        //ctx.arc(thick / 2, radius/2, 2, 0, 2 * Math.PI);
        //ctx.arc(0, 0, 2, 0, 2 * Math.PI);

        ctx.rect(-radius / 2 + Math.abs(thick / 2), 0, radius, thick);

        ctx.fillStyle = "red";
        ctx.fill();
        // restore the context to its untranslated/unrotated state
        ctx.restore();
      }

      //wheelCenter(startX, startY, DistFrontToBack);
      function drawTrail(x, y) {

        ctx2.beginPath()
        ctx2.arc(x, y, 1, 0, 2 * Math.PI);
        ctx2.fillStyle = "lime"
        ctx2.fill()

      }

      function drawBody(x, y, height, width, theta) {
        var bodyX = -height / 2;

        var bodyY = -width / 2;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(theta);

        ctx.rect(bodyX, bodyY, height, width);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.restore();
      }
      // drawWheel(startX , startY, frontWheelRadius , distFrontToBack, steeringAngle, theta, distFrontToBack);
      function drawWheel(x, y, length, thick, steeringAngles, theta, offset) {

        // first save the untranslated/unrotated context
        ctx.save();
        ctx.beginPath();
        // move the rotation point to the center of the body
        ctx.translate(x, y);
        ctx.rotate(theta);
        //Center is now  0, 0 + offset / 2, now offset for size of box 
        ctx.translate(0 + offset / 2, 0);
        ctx.rotate(steeringAngles * Math.PI / 180);
        // Note: after transforming [0,0] is visually [x,y] so the rect needs to be offset accordingly when drawn
        ctx.rect(-length / 2, -thick / 2, length, thick);
        ctx.fillStyle = "red";
        ctx.fill();
        // restore the context to its untranslated/unrotated state
        ctx.restore();
      }

      setTimeout(() => { window.requestAnimationFrame(concept); }, 1000 / 65);
    }

    window.requestAnimationFrame(concept);
  }

  //rendering jQuery code when you first render the Canvas Component
  componentDidMount() {
    switch (this.props.jQuery) {
      case "RET":
        this.jQueryCodeRET();
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
  //using JQuery code when you re-render (update) the Canvas Component.
  componentDidUpdate() {
    switch (this.props.jQuery) {
      case "RET":
        this.jQueryCodeRET();
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
      <canvas id="canvas" width={900} height={300}></canvas>
    </div>)
  }
}

class LowerControlUI extends React.Component {
  constructor(props) {
    super(props);

    this.toggleResetParameters = this.toggleResetParameters.bind(this);
  }
  //resets parameters in parameter UI based on clicking "Reset" button
  toggleResetParameters() {
    this.props.toggleResetParameters()
    switch (this.props.jQuery) {
      case 'Diff. Drive':
        document.getElementById('leftWheelRadius').value = '';
        document.getElementById('rightWheelRadius').value = '';
        document.getElementById('distBetweenWheels').value = '';
        document.getElementById('leftAngularVelocity').value = '';
        document.getElementById('rightAngularVelocity').value = '';
        break;
      case 'Bicycle':
        document.getElementById('frontWheelRadius').value = '';
        document.getElementById('distFrontToBack').value = '';
        document.getElementById('steeringAngle').value = '';
        document.getElementById('angularVelocity').value = '';
        break;
      case 'Tricycle':
        document.getElementById('frontWheelRadius').value = '';
        document.getElementById('distFrontToBack').value = '';
        document.getElementById('steeringAngle').value = '';
        document.getElementById('angularVelocity').value = '';
        document.getElementById('distBetweenBackWheels').value = '';
        break;
    }
  }

  render() {
    if(this.props.jQuery === 'Bug0') {
      return (
        <div id="lowerControlUI">
          Simulation Control
          <div>
            <button id="playBug0"><img width="25" height="25" src="https://media.istockphoto.com/vectors/vector-play-button-icon-vector-id1066846868?k=20&m=1066846868&s=612x612&w=0&h=BikDjIPuOmb08aDFeDiEwDiKosX7EgnvtdQyLUvb3eA="></img></button>
            <button id="pauseBug0"><img width="40" height="25" src="data:image/png;base64,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"></img></button>
            <button id="stepBug0">1 Step</button>
            <button id="resetBug0">Reset</button>
          </div>
        </div>)
    }
    if (this.props.jQuery === 'RET') {
      return (
        <div id="lowerControlUI">
          Simulation Control
          <div>
            <button id="playRET"><img width="25" height="25" src="https://media.istockphoto.com/vectors/vector-play-button-icon-vector-id1066846868?k=20&m=1066846868&s=612x612&w=0&h=BikDjIPuOmb08aDFeDiEwDiKosX7EgnvtdQyLUvb3eA="></img></button>
            <button id="pauseRET"><img width="40" height="25" src="data:image/png;base64,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"></img></button>
            <button id="stepRET">1 Step</button>
            <button id="resetRET">Reset</button>
          </div>
        </div>)
    } else {
      return (
        <div id="lowerControlUI">
          Simulation Control
          <div>
            <button id="playMotionModel"><img width="25" height="25" src="https://media.istockphoto.com/vectors/vector-play-button-icon-vector-id1066846868?k=20&m=1066846868&s=612x612&w=0&h=BikDjIPuOmb08aDFeDiEwDiKosX7EgnvtdQyLUvb3eA="></img></button>
            <button id="pauseMotionModel"><img width="40" height="25" src="data:image/png;base64,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"></img></button>
            <button id="resetMotionModel" onClick={this.toggleResetParameters}>Reset</button>
          </div>
        </div>)
    }
  }
}

class RightParameterUI extends React.Component {
  constructor(props) {
    super(props);

    this.handleSteeringAngleChange = this.handleSteeringAngleChange.bind(this);
    this.handleAngularVelocityChange = this.handleAngularVelocityChange.bind(this);
    this.handleFrontWheelRadiusChange = this.handleFrontWheelRadiusChange.bind(this);
    this.handleDistFrontToBackChange = this.handleDistFrontToBackChange.bind(this);
    this.handleDistBackTwoWheelsChange = this.handleDistBackTwoWheelsChange.bind(this);
    this.handleDistBetweenWheelsChange = this.handleDistBetweenWheelsChange.bind(this);
    this.handleLeftWheelRadiusChange = this.handleLeftWheelRadiusChange.bind(this);
    this.handleRightWheelRadiusChange = this.handleRightWheelRadiusChange.bind(this);
    this.handleLeftAngularVelocityChange = this.handleLeftAngularVelocityChange.bind(this);
    this.handleRightAngularVelocityChange = this.handleRightAngularVelocityChange.bind(this);
  }
  //handling limits on parameters inputted by the user
  handleDistBackTwoWheelsChange(e) {
    if (e.target.value <= 30 || e.target.value > 200) {
    } else {
      this.props.onDistBackTwoWheelsChange(e.target.value);
    }
  };

  handleDistFrontToBackChange(e) {
    if (e.target.value <= 10 || e.target.value > 100) {
    } else {
      this.props.onDistFrontToBackChange(e.target.value);
    }
  };

  handleDistBetweenWheelsChange(e) {
    if (e.target.value <= 0 || e.target.value > 10) {
    } else {
      this.props.onDistBetweenWheelsChange(e.target.value);
    }
  };
  //this can be any real number, so checking user inputs isn't required
  handleSteeringAngleChange(e) {
    this.props.onSteeringAngleChange(e.target.value);
  };

  handleAngularVelocityChange(e) {
    if (e.target.value < 0 || e.target.value > 10) {
    } else {
      this.props.onAngularVelocityChange(e.target.value);
    }
  };

  handleLeftAngularVelocityChange(e) {
    if (e.target.value < 0 || e.target.value > 10) {
    } else {
      this.props.onLeftAngularVelocityChange(e.target.value);
    }
  };

  handleRightAngularVelocityChange(e) {
    if (e.target.value < 0 || e.target.value > 10) {
    } else {
      this.props.onRightAngularVelocityChange(e.target.value);
    }
  };

  handleFrontWheelRadiusChange(e) {
    if (e.target.value <= 0 || e.target.value > 50) {
    } else {
      this.props.onFrontWheelRadiusChange(e.target.value);
    }
  };

  handleLeftWheelRadiusChange(e) {
    if (e.target.value <= 0 || e.target.value > 10) {
    } else {
      this.props.onLeftWheelRadiusChange(e.target.value);
    }
  };

  handleRightWheelRadiusChange(e) {
    if (e.target.value <= 0 || e.target.value > 10) {
    } else {
      this.props.onRightWheelRadiusChange(e.target.value);
    }
  };

  render() {
    switch (this.props.jQuery) {
      case 'Diff. Drive':
        return (<div id="rightParameterUI">
          <h4>Parameters</h4>
          <h5>Robot Properties</h5>
          <label for="leftWheelRadius">Left Wheel Radius (0 &#60; x &#8804; 10)</label>
          <br></br>
          <input type="number" id="leftWheelRadius" placeholder='0' onChange={this.handleLeftWheelRadiusChange}></input>
          <br></br>

          <label for="rightWheelRadius">Right Wheel Radius (0 &#60; x &#8804; 10)</label>
          <br></br>
          <input type="number" id="rightWheelRadius" placeholder='0' onChange={this.handleRightWheelRadiusChange}></input>
          <br></br>

          <label for="distBetweenWheels">Distance Between Wheels (0 &#60; x &#8804; 10)</label>
          <br></br>
          <input type="number" id="distBetweenWheels" placeholder='0' onChange={this.handleDistBetweenWheelsChange}></input>
          <br></br>

          <h5>Control Inputs</h5>
          <label for="leftAngularVelocity">Left Angular Velocity (0 &#8804; x &#8804; 10)</label>
          <br></br>
          <input type="number" id="leftAngularVelocity" placeholder='0' onChange={this.handleLeftAngularVelocityChange}></input>
          <br></br>

          <label for="rightAngularVelocity">Right Angular Velocity (0 &#8804; x &#8804; 10)</label>
          <br></br>
          <input type="number" id="rightAngularVelocity" placeholder='0' onChange={this.handleRightAngularVelocityChange}></input>
        </div>)

      case 'Bicycle':
        return (<div id="rightParameterUI">
          <h4>Parameters</h4>
          <h5>Robot Properties</h5>
          <label for="frontWheelRadius">Front Wheel Radius (0 &#60; x &#8804; 50)</label>
          <br></br>
          <input type="number" id="frontWheelRadius" placeholder='0' onChange={this.handleFrontWheelRadiusChange}></input>
          <br></br>

          <label for="distFrontToBack">Distance front to back (10 &#60; x &#8804; 100)</label>
          <br></br>
          <input type="number" id="distFrontToBack" placeholder='0' onChange={this.handleDistFrontToBackChange}></input>
          <br></br>

          <h5>Control Inputs</h5>
          <label for="steeringAngle">Steering Angle(&#8477;)</label>
          <br></br>
          <input type="number" id="steeringAngle" placeholder='0' onChange={this.handleSteeringAngleChange}></input>
          <br></br>

          <label for="angularVelocity">Angular Velocity (0 &#8804; x &#8804; 10)</label>
          <br></br>
          <input type="number" id="angularVelocity" placeholder='0' onChange={this.handleAngularVelocityChange}></input>
        </div>)

      case 'Tricycle':
        return (<div id="rightParameterUI">
          <h4>Parameters</h4>
          <h5>Robot Properties</h5>
          <label for="frontWheelRadius">Front Wheel Radius (0 &#60; x &#8804; 50)</label>
          <br></br>
          <input type="number" id="frontWheelRadius" placeholder='0' onChange={this.handleFrontWheelRadiusChange}></input>
          <br></br>

          <label for="distFrontToBack">Distance front to back (10 &#60; x &#8804; 100)</label>
          <br></br>
          <input type="number" id="distFrontToBack" placeholder='0' onChange={this.handleDistFrontToBackChange}></input>
          <br></br>

          <label for="distBetweenBackWheels">Distance Between Back Wheels (30 &#60; x &#8804; 200)</label>
          <br></br>
          <input type="number" id="distBetweenBackWheels" placeholder='0' onChange={this.handleDistBackTwoWheelsChange}></input>
          <br></br>

          <h5>Control Inputs</h5>
          <label for="angularVelocity">Angular Velocity (0 &#8804; x &#8804; 10)</label>
          <br></br>
          <input type="number" id="angularVelocity" placeholder='0' onChange={this.handleAngularVelocityChange}></input>
          <br></br>

          <label for="steeringAngle">Steering Angle (&#8477;)</label>
          <br></br>
          <input type="number" id="steeringAngle" placeholder='0' onChange={this.handleSteeringAngleChange}></input>
          <br></br>
        </div>)
    }
  }
}

class RightDrawingUI extends React.Component {
  render() {
    return (<div id="rightDrawingUI">
      Drawing UI
      <div>
        <button id="clear">Click to clear all obstacles</button>
        <br></br>
        <button id="goal">Click to set goal</button>
        <br></br>
        <button id="start">Click to set start</button>
      </div>
    </div>)
  }
}
//footers for added information
class Footer extends React.Component {
  render() {
    switch (this.props.jQuery) {
      case 'RET':
        return (<div id="foot">How to get started <br></br><br></br><p>To get started, click on the button labeled <strong>"Click to set start"</strong> and lay down a start marker (colored blue) on the canvas. Then, click the button labeled <strong>"Click to set goal"</strong> and set down a goal marker (colored green) on the canvas. Finally, you can draw arbitrary obstacles on the canvas by clicking on the canvas itself and moving your cursor and clicking on another point in the canvas. After you have finished drawing arbitrary obstacles on the canvas, click the play button in the component labeled <strong>"Simulation Control"</strong> to watch RRT do its magic. During the running of RRT, you can pause it, reset it (clear the canvas of all things), or hit the <strong>"1 step"</strong> button.
          This will slow down execution of RRT to only one iteration at a time. You can continue clicking <strong>"1 Step"</strong> after this point or clicking the play button. <strong>Note that after the optimal path is found, you can continue to run the algorithm by hitting the play button or the 1 Step button.</strong> Remember, at any time if you feel like heading back to the home page, you can click
          the title <strong>"Interactive Robotics Education Tool"</strong>. Otherwise, click on <strong>"Motion Models"</strong> in the Navbar to explore other parts of the IRET.</p></div>)
        break;
      case 'Diff. Drive':
        return (<div id="foot">How to get started <br></br><br></br><p>To get started, enter valid numbers into all of the inputs you see on the screen. Any number not in the bounds listed beside the label of each input is invalid and will be ignored and will not factor into the rendering of the motion model. In addition, the motion model will not run until you have entered valid numbers into all of the inputs.
          In addition, you can also play (effect will take place only after you have hit the pause button) the running of the motion model, you can pause it, and you can reset it in the component labeled <strong>"Simulation Control"</strong>. Keep in mind that by hitting the <strong>"Reset"</strong> button you will erase what's on the canvas and will reset all parameters to 0.
          Remember, at any time if you feel like heading back to the home page, you can click
          the title <strong>"Interactive Robotics Education Tool"</strong>. Otherwise, click on <strong>"Motion Models"</strong> in the Navbar to explore the Bicycle and Tricycle Motion Models or <strong>"Pathfinding Algorithm"</strong> to explore RRT. <strong>Finally, note that your motion model will stop once it hits the edge of the canvas.</strong></p> <p>Another thing to note is that the right wheel starts towards the bottom of the screen for differential drive whereas the left wheel starts towards the top</p></div>)
        break;
      case 'Bicycle':
        return (<div id="foot">How to get started <br></br><br></br><p>To get started, enter valid numbers into all of the inputs you see on the screen. Any number not in the bounds listed beside the label of each input will be ignored and will not factor into the rendering of the motion model. In addition, the motion model will not run until you have entered valid numbers into all of the inputs.
          In addition, you can also play (effect will take place only after you have hit the pause button) the running of the motion model, you can pause it, and you can reset it in the component labeled <strong>"Simulation Control"</strong>. Keep in mind that by hitting the <strong>"Reset"</strong> button you will erase what's on the canvas and will reset all parameters to 0.
          Remember, at any time if you feel like heading back to the home page, you can click
          the title <strong>"Interactive Robotics Education Tool"</strong>. Otherwise, click on <strong>"Motion Models"</strong> in the Navbar to explore the Differential Drive and Tricycle Motion Models or <strong>"Pathfinding Algorithm"</strong> to explore RRT. <strong>Finally, note that your motion model will stop once it hits the edge of the canvas.</strong> </p></div>)
        break;
      case 'Tricycle':
        return (<div id="foot">How to get started <br></br><br></br><p>To get started, enter valid numbers into all of the inputs you see on the screen. Any number not in the bounds listed beside the label of each input will be ignored and will not factor into the rendering of the motion model. In addition, the motion model will not run until you have entered valid numbers into all of the inputs.
          In addition, you can also play (effect will take place only after you have hit the pause button) the running of the motion model, you can pause it, and you can reset it in the component labeled <strong>"Simulation Control"</strong>. Keep in mind that by hitting the <strong>"Reset"</strong> button you will erase what's on the canvas and will reset all parameters to 0.
          Remember, at any time if you feel like heading back to the home page, you can click
          the title <strong>"Interactive Robotics Education Tool"</strong>. Otherwise, click on <strong>"Motion Models"</strong> in the Navbar to explore the Differential Drive and Bicycle Motion Models or <strong>"Pathfinding Algorithm"</strong> to explore RRT. <strong>Finally, note that your motion model will stop once it hits the edge of the canvas.</strong></p></div>)
        break;
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));