/**
 * @module MaxHeap
 * @ignore 
 * */ 
/** */

import { Heap } from "./Heap";

export class MaxHeap extends Heap {
  /**
   * Parent must be greater than or equal to the child node
   * @param parent Parent Node
   * @param child Child Node
   */
  isPairInCorrectOrder(parent: any, child: any) {
    return this.compare.greaterThanOrEqual(parent, child);
  }
}