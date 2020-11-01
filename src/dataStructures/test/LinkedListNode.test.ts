import Node from '../LinkedListNode';

describe('Linked List Node', () => {
  it('should create node with primitive value', () => {
    const node = new Node(2);
    expect(node.value).toBe(2);
    expect(node.next).toBeNull;
    expect(node.toString()).toBe('2');
  });

  it('should create node with object value', () => {
    const node = new Node({name: 'surjit'});
    expect(node.value).toEqual({name: 'surjit'});
    expect(node.next).toBeNull;
  });

  it('should convert the node to string', () => {
    const node = new Node(1);
    expect(node.toString()).toEqual('1');
    node.value = 'prachee';
    expect(node.toString()).toBe('prachee');
  })

  it('should convert the node to string using custom stringifier', () => {
    const node = new Node({name: 'surjit', loves: 'programing'});
    expect(node.toString((node: any)=>`${node.name} loves ${node.loves}`)).toBe('surjit loves programing');
  })

  it('should link nodes together', () => {
    const node1 = new Node(2);
    const node = new Node(1, node1);

    expect(node.value).toBe(1)
    expect(node.next).toEqual(node1);
    expect(node.next.next).toBeNull;
    expect(node.next.value).toBe(2)
  })
})