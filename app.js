class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }

    // buildTree(array) function that takes an array 
    // and turns it into a balanced binary tree full of 
    // `Nodes` objects in appropriate place
    buildTree(array) {
        // remove duplicates and sort the array
        const uniqueSortedArr = [...new Set(array)].sort((a, b) => a - b);

        // build tree using array, start and end index
        return this.buildTreeRecursively(uniqueSortedArr, 0, uniqueSortedArr.length-1);
    }

    // Recursive function to build tree
    buildTreeRecursively(arr, start, end) {
        // define base function, checking if index of start is greater than end index
        if (start > end) {
            return null;
        }

        // find the middle element and make it the root
        const mid = Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);

        // recusively construct the left and right subtrees
        node.left = this.buildTreeRecursively(arr, start, mid - 1);
        node.right = this.buildTreeRecursively(arr, mid + 1, end);
        
        return node;
    }

    // insert(value) function
    insert(value) {
      // start at the root
      this.root = this.insertRecursive(this.root, value);
    }
    
    
    insertRecursive(node, value) {
      // base case - if the node is null, create a new node
      if (node === null) {
        return new Node(value);
      }

      // check if value is less than current node's data, go left
      if (value < node.data) {
        node.left = this.insertRecursive(node.left, value);
        // check if value is greater than current node's data, go right
      } else if (value > node.data) {
        node.right = this.insertRecursive(node.right, value);
      }
      // if value matches current node data, ignore
      return node;
    }

    // Delete a value with this function
    delete(value) {
      this.root = this.deleteRecursive(this.root, value);
    }

    deleteRecursive(node, value) {
      // base case
      if (node === null) {
        return null;
      }

      // if value is less than current node data, go left
      if (value < node.data) {
        node.left = this.deleteRecursive(node.left, value);
      }
      // if value is greater than current node data, go right
      else if (value > node.data) {
        node.right = this.deleteRecursive(node.right, value);
      }
      // if value is equal to node data, this is where delete happens
      else {
        // case 1 - node with no children (leaf node)
        if (node.left === null && node.right === null) {
          return null;
        }
        // case 2 - node with only right child
        else if (node.left === null) {
          return node.right;
        }
        // case 3 - node with only left child
        else if (node.right === null) {
          return node.left;
        }
        // case 4 - node with two children
        // find the inorder successor (smallest value in right subtree)
        node.data = this.findMin(node.right);

        // delete the inorder successor from the right subtree
        node.right = this.deleteRecursive(node.right, node.data);
      }
      return node
    }

    // helper function to gind the min value in a subtree
    findMin(node) {
      while (node.left !== null) {
        node = node.left;
      }
      return node.data;
    }

    // search and find a specific value in the tree
    find(value) {
      return this.findRecursive(this.root, value);
    }
    
    
    findRecursive(node, value) {
      // Base case - if value is null -> value not found
      if (node === null) {
        return null;
      }

      // if value equals current node data -> found!
      if (value === node.data) {
        return node;
      }

      // if value is less than current node data -> search left subtree
      if (value < node.data) {
        return this.findRecursive(node.left, value);
      }

      // if value is greater than current node data -> search right subtree
      if (value > node.data) {
        return this.findRecursive(node.right, value);
      }
    }
}


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};


const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const test_tree = new Tree(testArr);

// console.log(test_tree.root)
// prettyPrint(test_tree.root)

test_tree.insert(10);
console.log(test_tree.find(4));


// prettyPrint(test_tree.root)
