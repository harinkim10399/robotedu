import {tree, node} from './Tree_Struct/treeAll.js';
class Bug2 {
  constructor(start, end, obstacles) {
    this.start = start;
    this.end = end; //
    this.distanceThreshold = 10
    this.T = new tree(new node(start[0], start[1], null));
    this.start.x = start[0]
    this.start.y = start[1]
    this.end.x = end[0]
    this.end.y = end[1]
    this.current = start
    this.current.x = this.current[0]
    this.current.y = this.current[1]
    this.obstacles = obstacles
    this.distance = Math.sqrt( Math.pow(this.end.x -this.current.x, 2) + Math.pow(this.end.y-this.current.y), 2) 
    this.direction = {x: (this.end.x - this.current.x), y: (this.end.y - this.current.y)}
    const INITDIR = {x: (this.end.x - this.start.x), y: (this.end.y - this.start.y)}
    this.stepSize = 20
    this.direction_change = 30
  }

getNextPoint(direction) {
// gets next point in the current direction
return new node(this.current.x + (direction.x / (this.stepSize)), this.current.y + (direction.y / this.stepSize), this.current);
}
forward() {
// move in a straight line in current direction
if (this.distance < this.distanceThreshold) {
return;
}
var nextpoint = this.getNextPoint(this.direction)
return nextpoint;
}

isOnMLine(n) {

}
collide(n) {
// severs current node, changes angle by 10 degrees
// returns string to continue algorithm
n = n.prev;
let theta = 10;
let thetarad = theta * Math.PI/180
this.distance = this.distance1(this.end, n)
// rotation matrix to change the angle
// (x,y) -> (xcostheta - ysintheta, xsintheta + ycostheta)

var new_x = this.direction.x * Math.cos(thetarad) - this.direction.y* Math.sin(thetarad)
var new_y = this.direction.x * Math.sin(thetarad) + this.direction.y* Math.cos(thetarad)
this.direction = {x: new_x, y: new_y}
this.stepsize *= 0.95
// increases step size if it gets too small, helpful when there are multiple obstacles

this.current = n;

return "again";


}

wallFollow(n, theta) {
  // intuition: similar to collide(), but instead of rotating starting at the current direction, start at a ~90 degree angle from the current direction
  
  n = n.prev;
   var leftdir = {x: -this.direction.y, y: this.direction.x}
 // for(let i = -90; i < 90; i++) {
 // let theta = i;
  let thetarad = theta * Math.PI/180
  this.distance = this.distance1(this.end, n)
  // rotation matrix to change the angle
  // (x,y) -> (xcostheta - ysintheta, xsintheta + ycostheta)
  
 var new_x = this.direction.x * Math.cos(thetarad) - this.direction.y* Math.sin(thetarad)
 var new_y = this.direction.x * Math.sin(thetarad) + this.direction.y* Math.cos(thetarad)
//   var new_x = leftdir.x * Math.cos(thetarad) - leftdir.y* Math.sin(thetarad)
//   var new_y = leftdir.x * Math.sin(thetarad) + leftdir.y* Math.cos(thetarad)
  this.direction = {x: new_x, y: new_y}
  this.stepsize *= 1.01
  // increases step size if it gets too small, helpful when there are multiple obstacles
  this.current = n
  //return "again";
  return
  
}

extractPath(n) {
var current_n = n;
let path = [ new node(this.end.x, this.end.y, n) ];

while ( current_n != null) {
    path.push(current_n);
    current_n = current_n.prev;
}
return path;
}
// gets the node 90 degrees to the left, useful to check if that's part of an obstacle
get90Degrees() {
  var leftdir = {x: -this.direction.y, y: this.direction.x}
  var leftpt = this.getNextPoint(leftdir)
  return new node(leftpt.x, leftpt.y, this.current)
}

move(n, mline, addtopath) {     
// recursive step, alters distance, direction, and current node
this.distance = this.distance1(this.end, n)
this.current = n;  
if(mline) {
  // if on M-line, move towards the goal
this.direction = {x: this.end.x - n.x, y: this.end.y - n.y} 
}
if(!addtopath) {
  // if there's no useful path, rotate by 10 degrees
  let theta = 10;
  let thetarad = theta * Math.PI/180
  // rotation matrix to change the angle
  // (x,y) -> (xcostheta - ysintheta, xsintheta + ycostheta)
  var new_x = this.direction.x * Math.cos(thetarad) - this.direction.y* Math.sin(thetarad)
  var new_y = this.direction.x * Math.sin(thetarad) + this.direction.y* Math.cos(thetarad)
  let left = [n.getX(), n.getY()];
  this.direction = {x: new_x, y: new_y}
  if (this.distance1(left, this.end) < 0.5 ) {
    return this.extractPath(this.T, n);
}
  return "again"
}
// increases step size if it gets too small, helpful when there are multiple obstacles
if((this.direction.x / this.stepSize) > (this.direction.y / this.stepSize)) {
if((this.direction.x / this.stepSize) < 5) {
  this.stepSize *= 0.95
}
} else if ((this.direction.x / this.stepSize) < (this.direction.y / this.stepSize)) {
if((this.direction.y / this.stepSize) < 5) {
this.stepSize *= 0.95
}
}
// move the path forwards
// returns string to continue if not finished, returns tree if finished
this.T.insert(n);
let left = [n.getX(), n.getY()];
if (this.distance1(left, this.end) < 0.5 ) {
    return this.extractPath(this.T, n);
}

return "again";

}
distance1(p, n) {
return Math.sqrt( Math.pow(p[0]-n[0], 2) + Math.pow(p[1]-n[1], 2) );
}
}
export default Bug2;