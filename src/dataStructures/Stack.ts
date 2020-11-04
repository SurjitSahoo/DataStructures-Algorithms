import LinkedList from "./LinkedList";

export default class Stack {
  private stack: LinkedList;

  constructor() {
    this.stack = new LinkedList();
  }

  isEmpty() {
    return !this.stack.head
  }

  peak() {
    return this.stack.head?.value || null;
  }

  push(value: any) {
    this.stack.prepend(value);
    return this;
  }

  pop() {
    return this.stack.deleteHead()?.value || null;
  }

  toArray() {
    return this.stack.toArray();
  }

  toString(callback?: (value: any) => string) {
    return this.stack.toString(callback);
  }
}