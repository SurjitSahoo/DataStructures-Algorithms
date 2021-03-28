/**
 * LinkedList Node is a single node in the list, having a data item and link to the next data item
 * @module LinkedList-Node
 */
export class LinkedListNode {
  /**
   * @property Data item for the node
   */
  value: any;
  /**
   * @property Optional next data item for the node
   */
  next: LinkedListNode | null;

  /**
   * @param value - Data item for the node
   * @param next - Next data item for the node
   */
  constructor(value: any, next?: any) {
    this.value = value
    this.next = next || null;
  }

  /**
   * Convert the node to string
   * @param callback - A custom function to convert the data item into string representation
   * @returns string
   */
  toString(callback?: (value: any) => string) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}