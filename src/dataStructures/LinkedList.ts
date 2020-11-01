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
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return arr;
  }

  fromArray(values: any[]) {
    values.forEach((value) => this.append(value));
    return this;
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

    let currentNode: Node | null = this.head;

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
    const deletedTail = this.tail;

    // if there's only one node in the list
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }

    // if there are many nodes in the list
    let currentNode = this.head;
    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;
    return deletedTail;
  }

  delete(value: any) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // search from start and keep deleting until head != value
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    // find and delete the rest
    let currentNode = this.head;
    while (currentNode?.next) {
      // if next is to be deleted
      if (this.compare.equal(currentNode.next.value, value)) {
        deletedNode = currentNode.next;
        currentNode.next = currentNode.next.next;
      } else {
        currentNode = currentNode.next;
      }
    }

    // if tail must be deleted
    if (this.compare.equal(this.tail?.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  reverse() {
    let currentNode = this.head;
    let nextNode = null;
    let prevNode = null;

    while (currentNode) {
      nextNode = currentNode.next;

      currentNode.next = prevNode;
      prevNode = currentNode;
      currentNode = nextNode;
    }

    this.head = this.tail;
    this.tail = currentNode;
    return this;
  }
}