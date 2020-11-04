import LinkedList from "./LinkedList";

export default class Queue {
  private queue: LinkedList;

  constructor() {
    this.queue = new LinkedList();
  }

  isEmpty() {
    return !this.queue.head;
  }

  peak() {
    if (this.queue.head) {
      return this.queue.head.value;
    } else {
      return null;
    }
  }

  enqueue(value: any) {
    this.queue.append(value);
    return this;
  }

  dequeue() {
    return this.queue.deleteHead()?.value || null;
  }

  toString(callback?: (value: any) => string) {
    return this.queue.toString(callback);
  }
}