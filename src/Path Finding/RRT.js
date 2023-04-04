import {tree, node} from './Tree_Struct/treeAll.js';
//import node from '../Path Finding/Tree_Struct/treeAll.js';
class RRT {

    constructor (start, goal, step_size, collision_resolution, goal_resolution, goal_biasing, environment_boundaries) {

        // start -> starting coordinates of player in size 2 array (all coordinates use the formating)
        
        this.start = start;

        // goal -> premade node on front end (this will change later to just using cartesian coordinats)
        this.goal = goal;

        // step_size -> size of step taken with each iteration of movement (straight number / integer)
        this.step_size = step_size;

        // collision_resultion -> may be removed later, for now just place 0
        this.collision_resolution = collision_resolution;

        // goal_resolution -> distance from the goal required to say the boal has been reached (number between 0-1 for now)
        // more changes later
        this.goal_resolution = goal_resolution;

        // goal_biasing -> number between 0-1 (double) that makes path add node towards the goal
        this.goal_biasing = goal_biasing;

        // environment_boundaries -> bounderies of the environment the algorithm uses to select
        // random point to return to the front end
        this.environment_boundaries = environment_boundaries;

        // Basic creation and initialization of new tree
        this.T = new tree(new node(start[0], start[1], null));
    }

    // uses pathagorian theorem to find distance
    // inputs:
    // p -> passed randomly generated point on canvas
    // n -> nearest found node to point
    distance(p, n) {
        return Math.sqrt( Math.pow(p[0]-n.getX(), 2) + Math.pow(p[1]-n.getY(), 2) );
    }
    
    // find nearest node to new node using distance calculations
    // inputs:
    // p -> passed randomly generated point on canvas
    // T -> tree the nodes are in
    findNearest(p, T) {

        let min_dist = 0;
        let n = T.nodes[0];
        let nodes = T.getNodeArray();
       
        
        for ( let i = 0; i < nodes.length; i++ ) {
            let d = this.distance(p, T.getNodeIndex(i));
            
            if ( min_dist > d || min_dist == 0 ) {
                min_dist = d;
                n = T.getNodeIndex(i);
                
            }
        }
       
        return n;
        
    }

    // takes "step" towards randomly selected position
    // inputs:
    // p -> passed randomly generated point on canvas
    // T -> tree the nodes are in
    // step -> step_size given by constructor
    step(p, T, step) {

        //n is undifined vvvv
        let n = this.findNearest(p, T);
        let d = this.distance(p, n);
        
        let direction = [(p[0] - n.getX())/d, (p[1] - n.getY())/d] ;      
        let new_n = new node(n.getX() + (direction[0] * step), n.getY() + (direction[1] * step), n);
        
        return new_n;

    }
    
   
    sampleRandom() {

        return [Math.random() * this.environment_boundaries[0], Math.random() * this.environment_boundaries[1]];
    }

    extractPath( n ) {
        let current_n = n;
        let path = [ new node(this.goal[0], this.goal[1], n) ];

        while ( current_n != null ) {
            path.push(current_n);
            current_n = current_n.prev;
        }

        return path;
    }

    // first step in algorithm process
    // selects random point, creates and returns node for collision evalution

    randomCheck () {
        //alert();
        let sample;
        
        if ( Math.random() < this.goal_biasing ) {
            sample = this.goal;

        } else {
            sample = this.sampleRandom();
        
        }
    
        let new_node = this.step(sample, this.T, this.step_size);

        
        return new_node;
        

    }

    // second steps if there is collision
    // severes node and is collected by garbage collection
    // returns basic string

    collide (n) {
        n.prev = null;
        return "again";
    }

    // second step if there is no collision
    // pass node from randomCheck
    // will return string if not finished and array of nodes [end -> start] if finished
    move (n) {
        
        this.T.insert(n);
        let left = [n.getX(), n.getY()];
        if ( this.distance1(left, this.goal) < this.goal_resolution ) {
            //alert("made it")
            return this.extractPath(this.T, n);
            
        }

        return "again";

    }

    distance1(p, n) {
        return Math.sqrt( Math.pow(p[0]-n[0], 2) + Math.pow(p[1]-n[1], 2) );
    }


}
export default RRT;