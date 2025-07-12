class Node {
    constructor({ name, mobile }) {
      this.name = name; // Name of the contact
      this.mobile = mobile; // Mobile number of contact
      this.left = null; // Left child
      this.right = null; // Right child
    }
  }
  
  class BinarySearchTree {
    constructor() {
      if (BinarySearchTree.instance) {
        // Return the existing instance if it exists
        return BinarySearchTree.instance;
      }
      this.root = null;
      BinarySearchTree.instance = this; // Save the instance
      console.log('BinarySearchTree instance created');
    }
  
    // Get full tree structure
    getFullTree(node = this.root, result = []) {
      return this.root;
    }
  
    // Insert a value into the BST
    insert({ name, mobile }) {
      const newNode = new Node({ name, mobile });
      if (this.root === null) {
        this.root = newNode; // If tree is empty, set root
        return this;
      }
  
      let current = this.root;
      while (true) {
        // Avoid duplicates
        if (mobile === current.mobile) return undefined;
  
        if (mobile < current.mobile) {
          // Go left
          if (current.left === null) {
            current.left = newNode;
            return this;
          }
          current = current.left;
        } else {
          // Go right
          if (current.right === null) {
            current.right = newNode;
            return this;
          }
          current = current.right;
        }
      }
    }
  
    search(mobile) {
      let dummyNode = new Node({ name: '', mobile: '' });
      let current = this.root;
      while (current) {
        console.log(mobile, current.mobile);
        if (mobile === current.mobile) {
          dummyNode = current;
          return dummyNode; // Found the node
        }
        if (mobile < current.mobile) {
          current = current.left; // Go left
        } else {
          current = current.right; // Go right
        }
      }
    }
  
    // Pre-order traversal (Root -> Left -> Right)
    preOrderTraversal(node = this.root, result = []) {
      if (node) {
        // Visit current node
        result.push({ name: node.name, mobile: node.mobile });
  
        // Visit left subtree
        this.preOrderTraversal(node.left, result);
  
        // Visit right subtree
        this.preOrderTraversal(node.right, result);
      }
      return result;
    }
  
    // In-order traversal (Left -> Root -> Right)
    inOrderTraversal(node = this.root, result = []) {
      if (node) {
        // Visit left subtree
        this.inOrderTraversal(node.left, result);
  
        // Visit current node
        result.push({ name: node.name, mobile: node.mobile });
  
        // Visit right subtree
        this.inOrderTraversal(node.right, result);
      }
      return result;
    }
  
    // Post-order traversal (Left -> Right -> Root)
    postOrderTraversal(node = this.root, result = []) {
      if (node) {
        // Visit left subtree
        this.postOrderTraversal(node.left, result);
  
        // Visit right subtree
        this.postOrderTraversal(node.right, result);
  
        // Visit current node
        result.push({ name: node.name, mobile: node.mobile });
      }
      return result;
    }
  }
  
  // Export a single instance of the BinarySearchTree
  const bstInstance = new BinarySearchTree();
  export default bstInstance;
  