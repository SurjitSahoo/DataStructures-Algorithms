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

  it('should remove child', () => {
    const left = new BinaryTreeNode(1);
    const root = new BinaryTreeNode(2);
    const right = new BinaryTreeNode(3);

    root.setLeft(left).setRight(right);

    expect(root.traverseInOrder()).toEqual([1, 2, 3]);

    expect(root.removeChild(left)).toBe(true);
    expect(root.traverseInOrder()).toEqual([2, 3]);

    expect(root.removeChild(right)).toBe(true);
    expect(root.traverseInOrder()).toEqual([2]);

    expect(root.removeChild(right)).toBe(false);
    expect(root.traverseInOrder()).toEqual([2]);
  });

  it('should replace child', () => {
    const left = new BinaryTreeNode(1);
    const root = new BinaryTreeNode(2);
    const right = new BinaryTreeNode(3);

    root.setLeft(left).setRight(right);
    expect(root.traverseInOrder()).toEqual([1, 2, 3]);

    const replacementNode = new BinaryTreeNode(5);
    right.setRight(replacementNode);
    expect(root.traverseInOrder()).toEqual([1, 2, 3, 5]);

    expect(root.replaceChild(right, replacementNode)).toBe(true);
    expect(root.right?.value).toBe(5);
    expect(root.right?.right).toBeNull();
    expect(root.traverseInOrder()).toEqual([1, 2, 5]);

    expect(root.replaceChild(right, replacementNode)).toBe(false);
    expect(root.traverseInOrder()).toEqual([1, 2, 5]);

    expect(root.replaceChild(left, replacementNode)).toBe(true);
    expect(root.traverseInOrder()).toEqual([5, 2, 5]);

    expect(root.replaceChild(new BinaryTreeNode(), new BinaryTreeNode())).toBe(false);
  });

  it('should calculate node height', () => {
    const left = new BinaryTreeNode(1);
    const root = new BinaryTreeNode(2);
    const right = new BinaryTreeNode(3);

    expect(root.height).toBe(0);
    expect(root.balanceFactor).toBe(0);

    root.setLeft(left).setRight(right);

    expect(root.height).toBe(1);
    expect(root.balanceFactor).toBe(0);
    expect(left.height).toBe(0);
    expect(right.height).toBe(0);

    const leftLeft = new BinaryTreeNode(5);
    const leftRight = new BinaryTreeNode(7);
    left.setLeft(leftLeft).setRight(leftRight);

    expect(root.height).toBe(2);
    expect(root.balanceFactor).toBe(1);
    expect(left.height).toBe(1);
    expect(leftLeft.height).toBe(0);
    expect(leftRight.height).toBe(0);

    const ultraLeft = new BinaryTreeNode(9);
    leftLeft.setLeft(ultraLeft);

    expect(root.height).toBe(3);
    expect(left.height).toBe(2);
    expect(leftLeft.height).toBe(1);
    expect(leftRight.height).toBe(0);
    expect(ultraLeft.height).toBe(0);
    expect(root.balanceFactor).toBe(2);
  });

  it('should be possible to set node values', () => {
    const node = new BinaryTreeNode('initial_value');
    expect(node.value).toBe('initial_value');
    node.setValue('new_value');
    expect(node.value).toBe('new_value');
  });

  it('should be possible to copy node', () => {
    const root = new BinaryTreeNode('root');
    const left = new BinaryTreeNode('left');
    const right = new BinaryTreeNode('right');

    root.setLeft(left).setRight(right);
    expect(root.toString()).toBe('left,root,right');

    const newRoot = new BinaryTreeNode('new_root');
    const newLeft = new BinaryTreeNode('new_left');
    const newRight = new BinaryTreeNode('new_right');
    newRoot.setLeft(newLeft).setRight(newRight);
    expect(newRoot.toString()).toBe('new_left,new_root,new_right');

    BinaryTreeNode.copyNode(root, newRoot);
    expect(root.toString()).toBe('left,root,right');
    expect(newRoot.toString()).toBe('left,root,right');
  });

  it('should detect right uncle', () => {
    const grandParent = new BinaryTreeNode('grand_parent');
    const parent = new BinaryTreeNode('parent');
    const uncle = new BinaryTreeNode('uncle');
    const child = new BinaryTreeNode('child');

    expect(grandParent.uncle).not.toBeDefined();
    expect(parent.uncle).not.toBeDefined();

    grandParent.setLeft(parent);

    expect(parent.uncle).not.toBeDefined();
    expect(child.uncle).not.toBeDefined();

    parent.setLeft(child);

    expect(child.uncle).not.toBeDefined();

    grandParent.setRight(uncle);
    expect(parent.uncle).not.toBeDefined();
    expect(child.uncle).toBeDefined();
    expect(child.uncle).toEqual(uncle);
  });

  it('should detect left uncle as well', () => {
    const grandParent = new BinaryTreeNode('grand_parent');
    const parent = new BinaryTreeNode('parent');
    const uncle = new BinaryTreeNode('uncle');
    const child = new BinaryTreeNode('child');

    expect(grandParent.uncle).not.toBeDefined();
    expect(parent.uncle).not.toBeDefined();

    grandParent.setRight(parent);

    expect(parent.uncle).not.toBeDefined();
    expect(child.uncle).not.toBeDefined();

    parent.setRight(child);

    expect(child.uncle).not.toBeDefined();

    grandParent.setLeft(uncle);
    expect(parent.uncle).not.toBeDefined();
    expect(child.uncle).toBeDefined();
    expect(child.uncle).toEqual(uncle);
  });

  it('should be possible to create node with object as value', () => {
    const obj1 = { key: 'object_1', toString: () => 'object_1' };
    const obj2 = { key: 'object_2' };

    const node1 = new BinaryTreeNode(obj1);
    const node2 = new BinaryTreeNode(obj2);
    node1.setLeft(node2);

    expect(node1.value).toEqual(obj1);
    expect(node2.value).toEqual(obj2);
    expect(node1.left?.value).toEqual(obj2);

    node1.removeChild(node2);
    expect(node1.value).toEqual(obj1);
    expect(node2.value).toEqual(obj2);
    expect(node1.left).toBeNull();

    expect(node1.toString()).toBe('object_1');
    expect(node2.toString()).toBe('[object Object]');
  });

  it('should be possible to add metadata to the nodes', () => {
    const red = new BinaryTreeNode('R');
    const black = new BinaryTreeNode('B');

    red.meta.set('color', 'red');
    black.meta.set('color', 'black');

    expect(red.meta.get('color')).toBe('red');
    expect(black.meta.get('color')).toBe('black');
  });
});
