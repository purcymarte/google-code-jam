//https://www.youtube.com/watch?v=1XC3p2zBK34
// https://www.youtube.com/watch?v=0qgaIMqOEVs

function Node(data) {
  this.data = data;
  this.children = [];
}

// a tree is a nested structure
// it consists ONLY of a root node object
// the node is an object with
// each child is a node with a children prop.
class RootedTree {
  constructor() {
    this.root = null;
  }
  // methods
  // add takes data and parent id
  add(data, toNodeData) {
    // create node
    const node = new Node(data);
    // find parent, if parent data is passed in
    const parent = toNodeData ? this.findBFS(toNodeData) : null;
    if (parent) {
      parent.children.push(node);
    } else {
      // if node has no parents
      if (!this.root) {
        // this node is the root
        this.root = node;
      } else {
        // if root already exists, return "error"
        console.warn('tried to store root when root already exists');
      }
    }
  }

  findBFS(nodeData) {
    let _node = null;
    this.traverseBFS(node => {
      if (node.data == nodeData) {
        _node = node;
        // can't we terminate once node is found?
      }
    });
    return _node;
  }

  // generic method to traverse the tree, breadth first
  traverseBFS(callback) {
    const queue = [this.root];

    if (callback) {
      while (queue.length) {
        // remove first node In array. Move it to const.
        const node = queue.shift();
        // call back with this node for any action to be performed
        callback(node);
        // add children to queue until leafs are reached (no more children)
        for (const child of node.children) {
          queue.push(child);
        }
      }
    }
  }
  // https://medium.com/@jpoechill/iterative-bfs-and-dfs-in-javascript-537bb7b0bbfd
  traverseDFS(callback) {
    let stack = [this.root];
    // OPTIONAL:
    // re-order to move from leave to root
    // const postOrderStack = [];
    // while (stack.length) {
    //   const cur = stack.pop();
    //   postOrderStack.push(cur);
    //   for (let i = 0; i < cur.children.length; i++) {
    //     stack.push(cur.children[i]);
    //   }
    // } // ... then use postorderStack instead of stack (without pushing)
    while (stack.length) {
      let curr = stack.pop();
      callback(curr);

      for (let i = 0; i < curr.children.length; i++) {
        stack.push(curr.children[i]);
      }
    }
  }

  findLeafs() {
    this.traverseDFS(node => {
      if (!node.children.length) {
        console.log(node.data + 'is a leaf');
      }
    });
  }
  // height of a tree = height of biggest branch + 1
  findHeight(node = this.root) {
    // in case of empty tree, return err
    if (node == null) {
      return -1;
    }
    // if we arrived at a leaf, return 0
    if (!node.children.length) {
      return 0;
    }
    // recursively call find height on all branches and subbranches
    // until we arrive at the leafs
    return Math.max(...node.children.map(child => this.findHeight(child))) + 1;
  }

  // recursive approach:
  traverseDFSRecur(callback) {
    if (callback) {
      const callBackWithChildren = node => {
        for (let child of node.children) {
          callBackWithChildren(child);
        }
        callback(node);
      };
      // starting at root, recursively find all child nodes
      callBackWithChildren(this.root);
    }
  }

  logNodes() {
    this.traverseDFSIterative(node => console.log(node));
  }
}

// test
const tree = new RootedTree();
tree.add('node0'); // no parent, this will be root
tree.add('node1', 'node0');
tree.add('node2', 'node0');
tree.add('node3', 'node1');

// tree.traverseBFS(node => {
//   console.log('current node: ', node);
// });

// tree.traverseDFSRecur(node => {
//     console.log("current node: ", node.data)
// })

// tree.findLeafs();
tree.logNodes();
// console.log(tree.findHeight())
