import {tree, node} from './Tree_Struct/treeAll.js';
class Bug0 {
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
        this.stepSize = 10
        this.scalefactor = {x: (Math.abs(INITDIR.x - this.direction.x))/INITDIR.x, 
                            y: (Math.abs(INITDIR.y - this.direction.y))/INITDIR.y}
        this.direction_change = 30
      }

getNextPoint(direction) {
  if(this.scalefactor.x == 0 || this.scalefactor.y == 0) {
    return {x: this.current.x + (direction.x / (this.stepSize)), y: this.current.y + (direction.y / this.stepSize)};
  }
    return {x: this.current.x + (direction.x * (this.stepSize / this.scalefactor.x)), y: this.current.y + (direction.y *(this.stepSize / this.scalefactor.y))};
}
forward() {
  // move in a straight line in current direction
  if (this.distance < this.distanceThreshold) {
    return;
  }
  var nextpoint = this.getNextPoint(this.direction)

  var new_n = new node(nextpoint.x, nextpoint.y, this.current)

  return new_n;
}


collide (n) {
  n = n.prev;
  this.direction = {x: -this.direction.y, y: this.direction.x}
  this.distance = this.distance1(this.end, n)
  this.stepSize /= 1.3
  
 // this.direction = {x: this.end.x - nextpoint.x, y: this.end.y - nextpoint.y}
  this.current = n;
  return "again";
  // the next node should be the corner point of the obstacle??


}


calculateDistance(current, goal) {
  return Math.sqrt((goal.x - current.x) ** 2 + (goal.y - current.y) ** 2);
}

wallFollow(n) {
    // while the obstacle isn't next to you, keep changing the direction
      var totheleft = {x: -this.direction.x, y: this.direction.y}
      var leftpt = this.getNextPoint(totheleft)
      while (!this.isInsideObstacle(leftpt)) {
        this.direction.x += this.direction_change;
        this.direction.y -= this.direction_change;
        totheleft = {x: -this.direction.x, y: this.direction.y}
        leftpt = this.getNextPoint(totheleft)
      }
      //add to the x, subtract from the Y since we're turning to the left
      var nextpoint = this.getNextPoint(this.direction)
      this.distance = this.calculateDistance(nextpoint, this.end)
      var new_n = new node(nextpoint.x, nextpoint.y, this.current)
      this.current = nextpoint;
}



turnRight(n) {
  if (this.distance < this.distanceThreshold) {
    return;
  }
  var nextpoint = this.getNextPoint(this.direction)
 // let leftDirection = { x: -this.direction.y, y: this.direction.x };
  n.prev = null;
  var degrees = 10
  var radians = -degrees * (Math.PI/180)
  var new_x = -this.direction.y
  var new_y = this.direction.x 
  this.direction = {x: new_x, y: new_y};
  nextpoint = this.getNextPoint(this.direction)
  var new_n = new node(nextpoint.x, nextpoint.y, n)
  this.distance = this.distance1(nextpoint, this.end)
  this.current = nextpoint;
  return this.move(new_n);

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
  for (let obstacle in this.obstacles) {
    for (let i = 0; i < obstacle.length; i++) {

    }
  }
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

move(n) {     
  this.distance = this.distance1(this.end, n)
  this.direction = {x: this.end.x - n.x, y: this.end.y - n.y}
  this.current = n;   
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