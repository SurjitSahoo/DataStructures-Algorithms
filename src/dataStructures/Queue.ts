/**
 * - A queue is an abstract list of nodes which follows First-In-First-Out data structure or FIFO
 * - In this data structure a node can be added to the list at the rear-terminal only, known as **Enqueue**
 * - and a node can be removed from the list at front-terminal only, known as **Dequeue**
 * - Example: Queue for tickets at movie theatre 🎦
 *
 * ![Queue](https://upload.wikimedia.org/wikipedia/commons/5/52/Data_Queue.svg)
 *
 * **Files:**
 * [Queue](https://github.com/SurjitSahoo/DataStructures-Algorithms/blob/main/src/dataStructures/Queue.ts) |
 * [Test](https://github.com/SurjitSahoo/DataStructures-Algorithms/blob/main/src/dataStructures/test/Queue.test.ts)
 *
 * [![YouTube](http://img.youtube.com/vi/wjI1WNcIntg/0.jpg)](http://www.youtube.com/watch?v=wjI1WNcIntg)
 *
 * @module 3. Queue
 */
import { LinkedList } from './LinkedList';

/**
 * Queue data structure
 */
export class Queue {
  /**
   * @property list of entities in the queue
   */
  private queue: LinkedList;

  constructor() {
    this.queue = new LinkedList();
  }

  isEmpty() {
    return !this.queue.head;
  }

  peak() {
    return this.queue.head?.value || null;
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
