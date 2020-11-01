import LinkedList from '../LinkedList';

describe('LinkedList', () => {
  it('should create empty linked list', () => {
    const list = new LinkedList();
    expect(list.toString()).toEqual('');
    expect(list.toArray().length).toEqual(0);
  })

  it('should append values in the list', () => {
    const list = new LinkedList();

    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();

    list.append(1);
    list.append(2);

    expect(list.head?.value).toBe(1);
    expect(list.tail?.value).toBe(2);
  })

  it('should prepend values in the list', () => {
    const list = new LinkedList();
    list.prepend(1);
    expect(list.head?.value).toBe(1);
    expect(list.tail?.value).toBe(1);
    
    list.prepend(2);
    expect(list.head?.value).toBe(2);
    expect(list.tail?.value).toBe(1);
    list.prepend(3);
    expect(list.toString()).toBe('3,2,1');
  })

  it('should find node by value', () => {
    const list = new LinkedList();
    expect(list.find({value: 1})).toBe(null);

    list.append(2);
    expect(list.find({value: 2})).toBeDefined();

    list.append(3).append(4).append(9);

    expect(list.find({value: 4})?.value).toBe(4);
    expect(list.find({value: 8})).toBeNull();
  })

  it('should find node by callback', () => {
    const list = new LinkedList();
    list.append({key: 1, value: 'val 1'})
        .append({key: 2, value: 'val 2'})
        .append({key: 3, value: 'val 3'});

    const node = list.find({callback: (value: any) => value.key === 2});
    expect(node).toBeDefined();
    expect(node?.value).toEqual({key: 2, value: 'val 2'});

    expect(list.find({callback: (value: any) => value.key === 5})).toBeNull();
  })
  
  it('should delete head', () => {
    const list = new LinkedList();
    list.append(1);
    expect(list.deleteHead()?.value).toBe(1);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();

    list.append(1).append(2).append(3);
    const deleted = list.deleteHead();
    expect(deleted?.value).toBe(1);
    expect(list.head?.value).toEqual(2);
    expect(list.tail?.value).toEqual(3);
  })
})