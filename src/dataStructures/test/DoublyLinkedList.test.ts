import { lstat } from 'fs';
import LinkedList from '../DoublyLinkedList';

describe('Doubly Linked List', () => {
  it('should create empty linked list', () => {
    const list = new LinkedList();
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  })

  it('should append values to the list', () => {
    const list = new LinkedList();
    list.append(1);
    expect(list.head?.value).toBe(1);
    expect(list.tail?.value).toBe(1);
    expect(list.head?.next).toBeNull();
    expect(list.head?.previous).toBeNull();
    expect(list.tail?.next).toBeNull();
    expect(list.tail?.previous).toBeNull();

    list.append(2).append(3);
    expect(list.head?.value).toBe(1);
    expect(list.tail?.value).toBe(3);
    expect(list.head?.next?.value).toBe(2);
    expect(list.tail?.previous?.value).toBe(2);
  })

  it('should convert the list to string', () => {
    const list = new LinkedList();
    list.append(1).append(2).append(3);
    expect(list.toString()).toBe('1,2,3');
    expect(list.toStringRev()).toBe('3,2,1');
  })

  it('should convert list to string by callback', () => {
    const list = new LinkedList();
    list.append({fname: 'surjit', lname: 'sahoo'})
        .append({fname: 'prachee', lname: 'patil'});

    const stringify = (node: any) => `${node.fname} ${node.lname}`;
    expect(list.toString(stringify)).toBe('surjit sahoo,prachee patil');
    expect(list.toStringRev(stringify)).toBe('prachee patil,surjit sahoo');
  })

  it('should convert the list to array', () => {
    const list = new LinkedList();
    list.append(1).append(2).append(3);
    expect(list.toArray()).toEqual([1,2,3]);
    expect(list.toArrayRev()).toEqual([3,2,1]);
  })

  it('should create list from array', () => {
    const list = new LinkedList();
    list.fromArray([1,2,3,4,5]);
    expect(list.toString()).toBe('1,2,3,4,5');
  })

  it('should prepend values in the list', () => {
    const list = new LinkedList();
    list.prepend(3).prepend(2).prepend(1);
    expect(list.toString()).toBe('1,2,3');
  })

  it('should delete the head', () => {
    const list = new LinkedList();
    expect(list.deleteHead()).toBeNull();
    list.append(1);
    expect(list.deleteHead()?.value).toBe(1);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();

    list.append(1).append(2).append(3);
    expect(list.deleteHead()?.value).toBe(1);
    expect(list.head?.previous).toBeNull();
    expect(list.head?.value).toBe(2);
    expect(list.head?.next?.value).toBe(3);
    expect(list.tail?.value).toBe(3);
  })

  it('should delete tail', () => {
    const list = new LinkedList();
    expect(list.deleteTail()).toBeNull();

    list.append(1).append(2).append(3);
    expect(list.deleteTail()?.value).toBe(3);
    expect(list.tail?.value).toBe(2);
    expect(list.tail?.next).toBeNull();
    expect(list.tail?.previous?.value).toBe(1);
  })

  it('should delete the node by value', () => {
    const list = new LinkedList();
    expect(list.delete(1)).toBeNull();
    list.append(1).append(1).append(2).append(3).append(4);
    expect(list.delete(3)?.value).toBe(3);
    expect(list.delete(2)?.value).toBe(2);
    expect(list.toString()).toBe('1,1,4');
    expect(list.delete(1)?.value).toBe(1);
    expect(list.toString()).toBe('4');
    expect(list.delete(4)?.value).toBe(4);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  })
})