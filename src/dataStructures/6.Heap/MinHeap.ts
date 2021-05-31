/**
 * @module MinHeap
 * @ignore
 * */
/** */

import { Heap } from './Heap';

export class MinHeap extends Heap {
  /**
   * Parent must be less than or equal to the child node
   * @param parent Parent Node
   * @param child Child Node
   */
  isPairInCorrectOrder(parent: any, child: any) {
    return this.compare.lessThanOrEqual(parent, child);
  }
}
