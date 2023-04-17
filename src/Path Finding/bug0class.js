import {tree, node} from './Tree_Struct/treeAll.js';
class Bug0 {
    constructor(start, end, obstacles) {
        this.start = start;
        this.end = end; //
        this.isOnBoundary = false;
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
        this.stepSize = 30
        this.direction = {x: this.end.x - this.start.x, y: this.end.y - this.start.y}
        this.path = [start]
        this.distance = Math.sqrt((this.end.x - this.current.x) ** 2 + (this.end.y - this.current.y) ** 2)
      }
// distance function
getNextPoint() {
    return {x: this.current.x + (this.direction.x / this.stepSize), y: this.current.y + (this.direction.y/this.stepSize)};
}
towardGoal() {
  // move in a straight line towards the goal
  if (this.distance < this.distanceThreshold) {
    return;
  }
  var nextpoint = this.getNextPoint()
  var new_n = new node(nextpoint.x, nextpoint.y, this.current)
  this.distance = this.calculateDistance(nextpoint, this.end)
  this.current = nextpoint;
  return new_n;

}

calculateDistance(current, goal) {
  return Math.sqrt((goal.x - current.x) ** 2 + (goal.y - current.y) ** 2);
}

collide (n) {
    let dx = this.end.x - this.current.x;
    let dy = this.end.y - this.current.y;
    let distanceToGoal = this.calculateDistance(this.current, this.end);
    if (distanceToGoal < this.distanceThreshold) {
      return; // goal reached
    }
    this.current.x += dx / distanceToGoal;
    this.current.y += dy / distanceToGoal;
    return new node(this.current.x, this.current.y, null)   

}

extractPath(n) {
    var current_n = n;
    let path = [ new node(this.end.x, this.end.y, n) ];
//    alert("MADEITTTTT")

    while ( current_n != null) {
        path.push(current_n);
        current_n = current_n.prev;
    }
    return path;
}

move (n) {        
    this.T.insert(n);
    let left = [n.getX(), n.getY()];
    if (this.distance1(left, this.end) < 0.5 ) {
 //       alert("made it")
        return this.extractPath(this.T, n);
    }

    return "again";

}
distance1(p, n) {
    return Math.sqrt( Math.pow(p[0]-n[0], 2) + Math.pow(p[1]-n[1], 2) );
}
}
export default Bug0;