export default class LinkedListNode {
  value: any;
  next: any;

  constructor(value: any, next?: any) {
    this.value = value
    this.next = next || null;
  }

  toString(callback?: (node: any) => void) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}