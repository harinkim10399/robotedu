class tree  {

    constructor (root) {
        this.root = root;
        this.nodes = [root];
    }

    insert ( node ) {    
        //changed    
        //nodes.push(node);
        this.nodes.push(node);
    }

    getNodeIndex( i ) {
        return this.nodes[i];
    }

    getNodeArray() {
        return this.nodes;
    }

}

class node {

    constructor (x, y, prev) {
        this.prev = prev;
        this.x = x;
        this.y = y;
    }

    incomingEdge() {
        return this.prev;
    }

    getX() {
        return this.x;
    }

    getY () {
        return this.y;
    }

    getPrev() {
        return this.prev;
    }


}

export {tree, node} 

