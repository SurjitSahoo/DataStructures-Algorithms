/**
 * Stack is an abstract list of entities which follows Last-In-First-Out data structure or LIFO
 * It comes from the analogy of physical items stacked on top of each other.
 * ## Operations
 * - **push** - Add item to the stack
 * - **pop** - Remove item from the stack
 * - **peak** - Get the top item without altering the stack
 * 
 * ![Stack](https://upload.wikimedia.org/wikipedia/commons/b/b4/Lifo_stack.png)
 * 
 * **Files:** [Stack](src/dataStructures/Stack.ts) | [Test](src/dataStructures/test/Stack.test.ts)
 * [![YouTube](http://img.youtube.com/vi/wjI1WNcIntg/0.jpg)](http://www.youtube.com/watch?v=wjI1WNcIntg)
 * 
 * @module 4. Stack
 */
import { LinkedList } from "./LinkedList";

/**
 * Stack data structure
 */
export class Stack {
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