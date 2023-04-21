import {tree, node} from './Tree_Struct/treeAll.js';
class Bug2 {
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
        this.distance = Math.sqrt((this.end.x - this.current.x) ** 2 + (this.end.y - this.current.y) ** 2)
        this.direction_change = 10
      }
getNextPoint(direction) {
    return {x: this.current.x + (direction.x / this.stepSize), y: this.current.y + (direction.y/this.stepSize)};
}
towardGoal() {
  // move in a straight line towards the goal
  if (this.distance < this.distanceThreshold) {
    return;
  }
  var nextpoint = this.getNextPoint(this.direction)
  var new_n = new node(nextpoint.x, nextpoint.y, this.current)
  this.distance = this.calculateDistance(nextpoint, this.end)
  this.current = nextpoint;
  return new_n;

}
getMLine() {
    this.towardGoal()
}

calculateDistance(current, goal) {
  return Math.sqrt((goal.x - current.x) ** 2 + (goal.y - current.y) ** 2);
}

wallFollow(n) {
    var obstacle = this.findClosestObstacle(n)
    // while the obstacle isn't next to you, keep changing the direction
    var totheleft = {x: -this.direction.x, y: this.direction.y}
    var leftpt = this.getNextPoint(totheleft)
    // while (!this.isInsideObstacle(leftpt, obstacle)) {
    //   //add to the x, subtract from the Y since we're turning to the left
    //   this.direction.x += this.direction_change;
    //   this.direction.y -= this.direction_change;
    // }
    var nextpoint = this.getNextPoint(this.direction)
    var new_n = new node(leftpt.x, leftpt.y, this.current)
    return new_n;
}
isInsideObstacle(n, obstacle) {
  var x = n.x;
  var y = n.y

  var inside = false;
  for (var i = 0, j = obstacle.length - 1; i < obstacle.length; j = i++) {
      var xi = obstacle[i].x, yi = obstacle[i].y;
      var xj = obstacle[j].x, yj = obstacle[j].y;

      var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if(intersect) { 
        inside = true;
        break;
      }
  }
  return inside;
}
findClosestObstacle(n) {
  var closest;
  for (var obstacle = 0; obstacle < this.obstacles.length - 1; obstacle++) {
    if (this.calculateDistance(n, this.obstacles[obstacle] < this.distanceThreshold)) {
      closest = this.obstacles[obstacle]
    }
}
return closest;
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
export default Bug2;