/**
 * Doubly Linked List node is a single data item having a data-object and links to it's previous-node and next-node
 *
 * **Files:**
 * [Doubly Linked List Node](https://github.com/SurjitSahoo/DataStructures-Algorithms/blob/main/src/dataStructures/DoublyLinkedListNode.ts) |
 * [Test](https://github.com/SurjitSahoo/DataStructures-Algorithms/blob/main/src/dataStructures/test/DoublyLinkedListNode.test.ts)
 *
 * @module 2.a. Doubly-LinkedList-Node
 */

/** */
export class DoublyLinkedListNode {
  /**
   * @property data object
   */
  value: any;
  /**
   * @property Link to next data object in the list
   */
  next: DoublyLinkedListNode | null;
  /**
   * @property Link to previous data object in the list
   */
  previous: DoublyLinkedListNode | null;

  /**
   * @param value data object
   * @param next Link to next data object in the list
   * @param previous Link to previous data object in the list
   */
  constructor(value: any, next?: any, previous?: any) {
    this.value = value;
    this.next = next || null;
    this.previous = previous || null;
  }

  toString(callback?: (node: any) => string) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
