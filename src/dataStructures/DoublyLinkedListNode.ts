export default class DoublyLinkedListNode {
  value: any;
  next: DoublyLinkedListNode | null;
  previous: DoublyLinkedListNode | null;

  constructor(value: any, next?: any, previous?: any) {
    this.value = value;
    this.next = next || null;
    this.previous = previous || null;
  }

  toString(callback?: (node: any) => void) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}