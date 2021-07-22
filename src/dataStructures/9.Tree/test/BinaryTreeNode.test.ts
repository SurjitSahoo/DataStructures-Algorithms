import { BinaryTreeNode } from '../BinaryTreeNode';

describe('Binary Tree Node', () => {
  it('should create node', () => {
    const node = new BinaryTreeNode();

    expect(node).toBeDefined();
    expect(node.value).toBeNull();
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();

    const leftNode = new BinaryTreeNode(1);
    const rightNode = new BinaryTreeNode(3);
    node.setValue(2);

    node.setLeft(leftNode).setRight(rightNode);

    expect(node.value).toBe(2);
    expect(node.left?.value).toBe(1);
    expect(node.right?.value).toBe(3);
  });

  it('should set parent', () => {
    const left = new BinaryTreeNode(1);
    const root = new BinaryTreeNode(2);
    const right = new BinaryTreeNode(3);

    root.setLeft(left).setRight(right);

    expect(root.parent).toBeNull();
    expect(root.left?.parent?.value).toBe(2);
    expect(root.right?.parent?.value).toBe(2);
    expect(root.right?.parent).toEqual(root);
    expect(root.left?.parent).toEqual(root);
  });

  it('should traverse nodes in order', () => {
    const left = new BinaryTreeNode(1);
    const root = new BinaryTreeNode(2);
    const right = new BinaryTreeNode(3);

    root.setLeft(left).setRight(right);
    expect(root.traverseInOrder()).toEqual([1, 2, 3]);
    expect(root.toString()).toBe('1,2,3');
  });
  //TODO: Complete Test cases
});
