/**
 * Doubly linked List is a sequentially linked data items
 * which are not stored in consecutive spaces.
 * Each data item has a data-object and they point to the next and previous data items / nodes.
 * 
 * ![Doubly Linked List](https://upload.wikimedia.org/wikipedia/commons/5/5e/Doubly-linked-list.svg)
 * 
 * [![YouTube](http://img.youtube.com/vi/JdQeNxWCguQ/0.jpg)](http://www.youtube.com/watch?v=JdQeNxWCguQ)
 * 
 * @module DoublyLinkedList
 */
import {DoublyLinkedListNode as Node} from './DoublyLinkedListNode';
import {Comparator, comparatorFn} from '../utils/Comparator';

interface IValue {
  value: any,
  [x: string]: any 
};
interface ICallback {
  callback: (value: any) => boolean,
  [x: string]: any 
};
type findArg = IValue | ICallback;

/**
 * Doubly LinkedList data structure
 */
export class DoublyLinkedList {

  /**
   * @property head of the linked list
   */
  head: Node | null;
  /**
   * @property tail of the linked list
   */
  tail: Node | null;
  /**
   * @property A comparator instance
   */
  compare: Comparator;

  /**
   * 
   * @param comparator A comparator instance
   */
  constructor(comparator?: comparatorFn) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparator)
  }

  fromArray(values: any[]) {
    values.forEach((value: any) => this.append(value));
    return this;
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

  toArrayRev() {
    const arr = [];
    let currentNode = this.tail;
    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.previous;
    }
    return arr;
  }

  toString(callback?: (value: any) => string) {
    let currentNode = this.head;
    let arr = [];
    while (currentNode) {
      arr.push(currentNode.toString(callback));
      currentNode = currentNode.next;
    }
    return arr.toString();
  }

  toStringRev(callback?: (value: any) => string) {
    let currentNode = this.tail;
    let arr = [];
    while(currentNode) {
      arr.push(currentNode.toString(callback));
      currentNode = currentNode.previous;
    }
    return arr.toString();
  }

  append(value: any) {
    const node = new Node(value, null, this.tail);

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

  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedNode = this.head;

    if (this.head.next) {
      this.head = this.head.next;
      this.head.previous = null;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deletedNode;
  }

  deleteTail() {
    if (!this.tail) {
      return null;
    }
    const deletedNode = this.tail;
    
    // if there is only one node
    if(this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else { // there are more than one node
      this.tail = deletedNode.previous;
      if (this.tail) this.tail.next = null;
    }
    return deletedNode;
  }

  delete(value: any) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;
    let currentNode: Node | null = this.head;

    while(currentNode) {
      if(this.compare.equal(currentNode.value, value)) {
        deletedNode = currentNode;
        // if head is going to be deleted
        if (deletedNode === this.head) {
          this.head = deletedNode.next;
          if (this.head) this.head.previous = null;
          // if the deleted node is head and tail at the same time
          // it's the last node. so remove the tail as well.
          if (deletedNode === this.tail) {
            this.tail = null;
          }
        } else if (deletedNode === this.tail) { // if it's the tail
          this.tail = deletedNode.previous;
          if (this.tail) this.tail.next = null;
        } else { // if the node is in the middle
          const previousNode = currentNode.previous;
          const nextNode = currentNode.next;
          if (previousNode) previousNode.next = nextNode;
          if (nextNode) nextNode.previous = previousNode;
        }
      }
      currentNode = currentNode.next;
    }

    return deletedNode;
  }

  find({value, callback}: findArg) {
    if (!this.head) {
      return null;
    }

    let currentNode: Node | null = this.head;
    while (currentNode) {
      // find by callback
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }
      // find by value
      if (this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  reverse() {
    let currentNode = this.head;
    let previousNode = null;
    let nextNode = null;

    while(currentNode) {
      previousNode = currentNode.previous;
      nextNode = currentNode.next;

      currentNode.next = previousNode;
      currentNode.previous = nextNode;

      previousNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = previousNode;

    return this;
  }
}