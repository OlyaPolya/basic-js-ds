const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    this.treeRoot = addInsideTree(this.treeRoot, data);

    function addInsideTree(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addInsideTree(node.left, data);
      } else {
        node.right = addInsideTree(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return hasTree(this.treeRoot, data);

    function hasTree(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data < node.data ? hasTree(node.left, data) : hasTree(node.right, data);
    }
  }

  find(data) {
    return searchInTree(this.treeRoot, data);

    function searchInTree(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return data < node.data ? searchInTree(node.left, data) : searchInTree(node.right, data);
    }
  }

  remove(data) {
    this.treeRoot = removeFromTree(this.treeRoot, data);

    function removeFromTree(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeFromTree(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeFromTree(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeFromTree(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    let minValue = this.treeRoot;

    while (minValue.left) {
      minValue = minValue.left;
    }
    return minValue.data;
  }

  max() {
    let maxValue = this.treeRoot;

    while (maxValue.right) {
      maxValue = maxValue.right;
    }
    return maxValue.data;
  }
}

module.exports = {
  BinarySearchTree,
};
