class Node {
    constructor(data, left, right) {
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
prettyPrint(test_tree.root)