import Comparator, { comparatorFn } from '../utils/Comparator';
import Node from './LinkedListNode';

interface IValue {
  value: any,
  [x: string]: any 
};
interface ICallback {
  callback: (value: any) => boolean,
  [x: string]: any 
};
type findArg = IValue | ICallback;

export default class LinkedList {
  head: Node | null;
  tail: Node | null;
  compare: Comparator

  constructor(comparator?: comparatorFn) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparator)
  }

  toArray() {
    const arr = [];
    let currentNode = this.head;

    while (currentNode) {
      arr.push(currentNode);
      currentNode = currentNode.next;
    }

    return arr;
  }

  toString(callback?: (node: any) => void) {
    return this.toArray().map((node: Node) => node.toString(callback)).toString()
  }

  append(value: any) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    }
    return this;
  }

  prepend(value: any) {
    const node = new Node(value, this.head);
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    return this;
  }

  find({value, callback}: findArg) {
    if (!this.head) return null;

    let currentNode = this.head;

    while(currentNode) {
      // if callback is given, try to find the node using callback
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      if (this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next
    }

    return null;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedNode = this.head;
    
    if(this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedNode;
  }

  deleteTail() {
    
  }
  delete(value: any) {

  }

  traverse(value: any) {

  }
}