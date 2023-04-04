import {tree, node} from './Tree_Struct/treeAll.js';
class Bug0 {

    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.current = start;
        this.heading = Math.atan2(end.y - start.y, end.x - start.x);
        this.isOnBoundary = false;
        distanceThreshold = 10
        this.T = new tree(new node(start[0], start[1], null));
      }
// distance function
  calculateDistance(current, goal) {
    return Math.sqrt((goal.x - current.x) ** 2 + (goal.y - current.y) ** 2);
  }

towardGoal() {
  // move in a straight line towards the goal
  let dx = end.x - current.x;
  let dy = end.y - current.y;
  let distanceToGoal = calculateDistance(current, goalPosition);
  if (distanceToGoal < distanceThreshold) {
    return; // goal reached
  }
  current.x += dx / distanceToGoal;
  current.y += dy / distanceToGoal;
  return new node(current.x, current.y, null) 
}
getPath() {
    const path = [];
    this.bug0();
    path.push({x: this.current.x, y: this.current.y});
    return path;
  }

collide (n) {
    // let dx = end.x - current.x;
    // let dy = end.y - current.y;
    // if (dx > 0) {
    //     current.x = obstacle.x - distanceThreshold;
    // } else if (dx < 0) {
    //     current.x = obstacle.x + obstacle.width + distanceThreshold;
    // }
    // if (dy > 0) {
    //     current.y = obstacle.y - distanceThreshold;
    // } else if (dy < 0) {
    //     current.y = obstacle.y + obstacle.height + distanceThreshold;
    // }
    return new node(current.x, current.y, null)     
}

extractPath(n) {
    let current_n = n;
    let path = [ new node(this.goal[0], this.goal[1], n) ];

    while ( current_n != null ) {
        path.push(current_n);
        current_n = current_n.prev;
    }

    return path;
}

move (n) {        
    this.T.insert(n);
    let left = [n.getX(), n.getY()];
    if ( this.calculateDistance(left, this.end) < 0.5 ) {
        //alert("made it")
        return this.extractPath(this.T, n);
        
    }

    return "again";

}
}
export default Bug0;