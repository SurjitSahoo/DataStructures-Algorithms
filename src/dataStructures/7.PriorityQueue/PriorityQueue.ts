/**
 * - A priority queue is an abstract data type which is like regular queue or stack data structure,
 * but where additionally each element has a priority attached to it.
 * - In a priority queue an element with high priority is served before an element with low priority.
 * - If tow elements have the same priority, they're served according to the order in which they were
 * added to the queue.
 *
 * While priority queues are mostly implemented with heaps, they're distinct from heaps.
 * A priority queue is an abstract concept like a "List" or a "Map", just like a list can be implemented
 * with linked list or an array, a priority queue can be implemented with a heap or a verity of other
 * methods such as an unordered array
 *
 * ### Used case
 * - suppose in a class of students you want to get the next best student or the next worst student
 * based on the marks they got in a test,
 * Priority queue can do that without going through the entire list of students one by one
 * - Time complexity to peak() = O(n)
 *
 * **Files:**
 * [PriorityQueue](https://github.com/SurjitSahoo/DataStructures-Algorithms/blob/main/src/dataStructures/7.PriorityQueue/PriorityQueue.ts) |
 * [Test](https://github.com/SurjitSahoo/DataStructures-Algorithms/blob/main/src/dataStructures/7.PriorityQueue/test/PriorityQueue.test.ts)
 *
 * [![YouTube](http://img.youtube.com/vi/wptevk0bshY/0.jpg)](http://www.youtube.com/watch?v=wptevk0bshY)
 *
 * @module 7. Priority Queue
 */
import { Comparator } from '../../utils/Comparator';
import { MinHeap } from '../6.Heap/MinHeap';

/**
 * Priority Queue data structure
 */
export class PriorityQueue extends MinHeap {
  priorities: Map<any, any>;

  constructor() {
    // call the MinHeap constructor first
    super();

    // setup priorities map
    this.priorities = new Map();
    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  add(item: any, priority = 0) {
    this.priorities.set(item, priority);
    super.add(item);
    return this;
  }

  remove(item: any, comparator?: Comparator) {
    super.remove(item, comparator);
    this.priorities.delete(item);
    return this;
  }

  changePriority(item: any, priority: number) {
    this.remove(item, new Comparator(this.compareValues));
    this.add(item, priority);
    return this;
  }

  findByValue(item: any) {
    return this.find(item, new Comparator(this.compareValues));
  }

  hasValue(item: any) {
    return this.findByValue(item).length > 0;
  }

  /**
   * @param a Item A
   * @param b Item B
   */
  comparePriority(a: any, b: any) {
    if (this.priorities.get(a) === this.priorities.get(b)) {
      return 0;
    }
    return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
  }

  compareValues(a: number | string, b: number | string) {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }
}
