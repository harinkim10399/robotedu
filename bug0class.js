//import {tree, node} from '../Tree_Struct/treeAll.js';
class Bug0 {

    constructor(start, end, obstacles) {
        this.start = start;
        this.end = end;
        this.obstacles = obstacles;
        this.current = start;
        this.heading = Math.atan2(end.y - start.y, end.x - start.x);
        this.isOnBoundary = false;
        distanceThreshold = 10
      }
// distance function
  calculateDistance(current, goal) {
    return Math.sqrt((goal.x - current.x) ** 2 + (goal.y - current.y) ** 2);
  }

  bug0() {
  // move in a straight line towards the goal
  let dx = end.x - current.x;
  let dy = end.y - current.y;
  let distanceToGoal = calculateDistance(current, goalPosition);
  if (distanceToGoal < distanceThreshold) {
    return; // goal reached
  }
  current.x += dx / distanceToGoal;
  current.y += dy / distanceToGoal;

  // obstacle
  for (let obstacle of obstacles) {
    if (
      current.x > obstacle.x &&
      current.x < obstacle.x + obstacle.width &&
      current.y > obstacle.y &&
      current.y < obstacle.y + obstacle.height
    ) {
      // follow obstacle boundary
      if (dx > 0) {
        current.x = obstacle.x - distanceThreshold;
      } else if (dx < 0) {
        current.x = obstacle.x + obstacle.width + distanceThreshold;
      }
      if (dy > 0) {
        current.y = obstacle.y - distanceThreshold;
      } else if (dy < 0) {
        current.y = obstacle.y + obstacle.height + distanceThreshold;
      }
      break;
    }
  }
}
getPath() {
    const path = [];
    let iterations = 0;
    while (this.distance(this.current, this.end) > 10 && iterations < 10000) {
      path.push({x: this.current.x, y: this.current.y});
      this.bug0();
      iterations++;
    }
    path.push({x: this.current.x, y: this.current.y});
    return path;
  }

}
export default Bug0;