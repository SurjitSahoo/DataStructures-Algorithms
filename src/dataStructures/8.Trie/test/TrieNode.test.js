import { TrieNode } from '../TrieNode';

describe('TrieNode', () => {
  it('should create a Trie Node', () => {
    const node = new TrieNode('a', true);
    expect(node.character).toBe('a');
    expect(node.isCompleteWord).toBe(true);
    expect(node.toString()).toBe('a*');
  });

  it('should add child nodes to the TrieNode', () => {
    const node = new TrieNode('c', false);
    node.addChild('a');
    node.addChild('r', true);
    expect(node.toString()).toBe('c:a,r');
  });

  it('should get child nodes', () => {
    const node = new TrieNode('c', false);
    node.addChild('a');
    node.addChild('b', true);
    expect(node.getChild('a').character).toBe('a');
    expect(node.getChild('a').toString()).toBe('a');
    expect(node.getChild('b').toString()).toBe('b*');
    expect(node.getChild('o')).toBeUndefined();
  });

  it('should check if the child node has children', () => {
    const node = new TrieNode('c', false);
    expect(node.hasChildren()).toBeFalsy();

    node.addChild('a');
    expect(node.hasChildren()).toBeTruthy();
  });

  it('should check if a node has a specific child', () => {
    const node = new TrieNode('c', false);
    node.addChild('a');
    node.addChild('r', true);
    expect(node.hasChild('a')).toBe(true);
    expect(node.hasChild('r')).toBe(true);
    expect(node.hasChild('d')).toBe(false);
  });

  it('should suggest next children', () => {
    const node = new TrieNode('c', false);
    node.addChild('a');
    node.addChild('r', true);
    expect(node.suggestChildren()).toEqual(['a', 'r']);
  });

  it("should delete a child node if it doesn't have children or doesn't complete any word", () => {
    const node = new TrieNode('c', false);
    node.addChild('a');
    node.addChild('r', true);
    expect(node.hasChild('r')).toBe(true);
    expect(node.getChild('r').isCompleteWord).toBe(true);
    node.removeChild('r');
    expect(node.hasChild('r')).toBe(true);

    expect(node.hasChild('a')).toBe(true);
    expect(node.getChild('a').isCompleteWord).toBe(false);
    node.removeChild('a');
    expect(node.hasChild('a')).toBe(false);
  });

  it('should not delete a child if it has children', () => {
    const node = new TrieNode('c', false);
    node.addChild('b');
    const child = node.getChild('b');
    child.addChild('d');

    node.removeChild('b');
    expect(node.hasChild('b')).toBe(true);
  });

  it('should not delete a child if it completes a word', () => {
    const node = new TrieNode('c', false);
    node.addChild('a');
    node.addChild('r', true);

    node.removeChild('r');
    expect(node.hasChild('r')).toBe(true);
  });
});
