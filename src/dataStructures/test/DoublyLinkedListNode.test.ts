import {DoublyLinkedListNode as Node} from '../DoublyLinkedListNode';

describe('Doubly LinkedList', () => {
  it('should create primitive node', () => {
    const node = new Node(1);
    expect(node.value).toBe(1);
    expect(node.next).toBeNull();
    expect(node.previous).toBeNull();
    expect(node.toString()).toBe('1');
  })

  it('should create complex object node', () => {
    const node = new Node({fname: 'surjit', lname: 'sahoo'});
    expect(node.value).toEqual({fname: 'surjit', lname: 'sahoo'});
    expect(node.next).toBeNull();
    expect(node.previous).toBeNull();
    expect(node.toString((node: any) => `${node.fname} ${node.lname}`)).toBe('surjit sahoo');
  })

  it('should link nodes together', () => {
    // prev - node - 2 - 1
    const node1 = new Node(1);
    const node2 = new Node(2, node1, null);
    expect(node2.next?.value).toBe(node1.value);

    const prevNode = new Node(3);
    const node = new Node(4, node2, prevNode);
    expect(node.previous?.value).toBe(prevNode.value);
    expect(node.next?.value).toBe(node2.value);
    expect(node.next?.next?.value).toBe(node1.value);
  })
})