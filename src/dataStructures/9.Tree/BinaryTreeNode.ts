/**
 * @module BinaryTreeNode
 * @category Data Structure
 */
import { Comparator } from '../../utils/Comparator';
import { HashTable } from '../5.HashTable/HashTable';

export class BinaryTreeNode {
  /**
   * @property Value of the Node
   */
  value: any;

  /**
   * @property Left child
   */
  left: BinaryTreeNode | null;

  /**
   * @property Right child
   */
  right: BinaryTreeNode | null;

  /**
   * @property Parent node
   */
  parent: BinaryTreeNode | null;

  /**
   * @property Any meta-data about the node
   */
  meta: HashTable;

  /**
   * @property A comparator to compare nodes with each other
   */
  nodeComparator: Comparator;

  constructor(value?: any) {
    this.value = value || null;
    this.left = null;
    this.right = null;
    this.parent = null;

    this.meta = new HashTable();

    this.nodeComparator = new Comparator();
  }

  get leftHeight(): number {
    if (!this.left) {
      return 0;
    } else {
      return this.left.height + 1;
    }
  }

  get rightHeight(): number {
    if (!this.right) {
      return 0;
    } else {
      return this.right.height + 1;
    }
  }

  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  get balanceFactor(): number {
    return this.leftHeight - this.rightHeight;
  }

  /**
   * Get parent's sibling if it exists.
   */
  get uncle(): BinaryTreeNode | undefined {
    // check if current node has a parent
    if (!this.parent) {
      return undefined;
    }

    // check if current node has a grand-parent
    if (!this.parent.parent) {
      return undefined;
    }

    // check if the grand-parent has two children
    if (!this.parent.parent.right || !this.parent.parent.left) {
      return undefined;
    }

    // now we know this node does have an uncle.
    // time to figure out who is the uncle.
    if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
      return this.parent.parent.right;
    } else {
      return this.parent.parent.left;
    }
  }

  setValue(value: any) {
    this.value = value;
    return this;
  }

  setLeft(node: BinaryTreeNode) {
    // before removing the left node, cut off it's all links with the tree
    if (this.left) {
      this.left.parent = null;
    }

    this.left = node;
    this.left.parent = this;
    return this;
  }

  setRight(node: BinaryTreeNode) {
    // before removing the right node, cut off it's all links with the tree
    if (this.right) {
      this.right.parent = null;
    }

    this.right = node;
    this.right.parent = this;
    return this;
  }

  removeChild(nodeToRemove: BinaryTreeNode) {
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
      this.left = null;
      return true;
    } else if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
      this.right = null;
      return true;
    } else return false;
  }

  replaceChild(nodeToReplace: BinaryTreeNode, replacementNode: BinaryTreeNode) {
    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.left = replacementNode;
      return true;
    } else if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.right = replacementNode;
      return true;
    } else return false;
  }

  static copyNode(sourceNode: BinaryTreeNode, targetNode: BinaryTreeNode) {
    targetNode.setValue(sourceNode.value);
    sourceNode.right && targetNode.setRight(sourceNode.right);
    sourceNode.left && targetNode.setLeft(sourceNode.left);
  }

  traverseInOrder(): any[] {
    let traverse: any[] = [];
    // Add the left node(s)
    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder());
    }

    // add the root
    traverse.push(this.value);

    // add the right node(s)
    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder());
    }

    return traverse;
  }

  toString() {
    return this.traverseInOrder().toString();
  }
}
