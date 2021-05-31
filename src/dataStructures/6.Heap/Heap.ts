/**
 * Heap is a specialized tree-based data-structure that satisfies following heap-properties
 * - **Min Heap** -> Key of __Parent Node__ is always less than or equal to the key of __Child Node__
 * - **Max Heap** -> Key of __Parent Node__ is always greater than or equal to the key of __Child Node__
 *
 * ### Min Heap
 * ![MinHeap](https://upload.wikimedia.org/wikipedia/commons/6/69/Min-heap.png)
 *
 * ### Max Heap
 * ![MaxHeap](https://upload.wikimedia.org/wikipedia/commons/3/38/Max-Heap.svg)
 *
 * **Files:**
 *
 * [Heap](https://github.com/SurjitSahoo/DataStructures-Algorithms/blob/main/src/dataStructures/6.Heap/Heap.ts)
 *
 * [MinHeap](https://github.com/SurjitSahoo/DataStructures-Algorithms/blob/main/src/dataStructures/6.Heap/MinHeap.ts) |
 * [Test](https://github.com/SurjitSahoo/DataStructures-Algorithms/blob/main/src/dataStructures/6.Heap/test/MinHeap.test.ts)
 *
 * [MaxHeap](https://github.com/SurjitSahoo/DataStructures-Algorithms/blob/main/src/dataStructures/6.Heap/MaxHeap.ts) |
 * [Test](https://github.com/SurjitSahoo/DataStructures-Algorithms/blob/main/src/dataStructures/test/6.Heap/MaxHeap.test.ts)
 *
 * [![YouTube](http://img.youtube.com/vi/t0Cq6tVNRBA/0.jpg)](http://www.youtube.com/watch?v=t0Cq6tVNRBA)
 *
 * @module 6. Heap
 */
import { Comparator, comparatorFn } from '../../utils/Comparator';

/**
 * Heap Data structure
 */
export abstract class Heap {
  compare: Comparator;
  heapContainer: any[];

  constructor(comparatorFn?: comparatorFn) {
    this.compare = new Comparator(comparatorFn);
    this.heapContainer = [];
  }

  /**
   * @param parentIndex Parent's index
   * @returns Index of the left child
   */
  getLeftChildIndex(parentIndex: number) {
    return 2 * parentIndex + 1;
  }

  /**
   *
   * @param parentIndex Parent's index
   * @returns Index of the right child
   */
  getRightChildIndex(parentIndex: number) {
    return 2 * parentIndex + 2;
  }

  /**
   * @param childIndex Index of the node
   * @returns Parent's index
   */
  getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * @param childIndex Index of the node
   */
  hasParent(childIndex: number) {
    return this.getParentIndex(childIndex) >= 0;
  }

  /**
   * @param childIndex Index of the node
   */
  hasLeftChild(parentIndex: number) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * @param parentIndex Parent's index
   */
  hasRightChild(parentIndex: number) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * @param parentIndex Parent's index
   */
  leftChild(parentIndex: number) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  /**
   * @param parentIndex Parent's index
   */
  rightChild(parentIndex: number) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  /**
   *
   * @param childIndex Index of the node
   * @returns
   */
  parent(childIndex: number) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  /**
   * @param index1 Index of the first item
   * @param index2 Index of the second item
   */
  swap(index1: number, index2: number) {
    const temp = this.heapContainer[index1];
    this.heapContainer[index1] = this.heapContainer[index2];
    this.heapContainer[index2] = temp;
  }

  /**
   * Get the root node without modifying the heap
   */
  peak(): any | null {
    if (this.heapContainer.length === 0) {
      return null;
    } else {
      return this.heapContainer[0];
    }
  }

  /**
   * Remove the root node
   */
  poll() {
    if (this.heapContainer.length === 0) {
      return null;
    } else if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    } else {
      const item = this.heapContainer[0];
      // move the last element to the root
      this.heapContainer[0] = this.heapContainer.pop();
      this.heapifyDown();
      return item;
    }
  }

  add(item: any) {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }

  /**
   * @param item Item to remove
   * @param comparator A comparator Instance
   */
  remove(item: any, comparator = this.compare) {
    // Find out how many items we need to remove
    const noOfItemsToRemove = this.find(item, comparator).length;

    for (let i = 0; i < noOfItemsToRemove; i += 1) {
      // we need to find item index to remove on each iteration
      // because indices are being changed after each heapify process
      const indexToRemove = this.find(item, comparator).pop() ?? -1;

      // if the item to be remove is the last child in the heap,
      // just remove it, no need to heapify
      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        // move last child in the heap to current vacant / removed position
        this.heapContainer[indexToRemove] = this.heapContainer.pop();
        // Get it's parent
        const parent = this.parent(indexToRemove);
        if (
          this.hasLeftChild(indexToRemove) && // make sure it's not the last child
          (!parent || this.isPairInCorrectOrder(parent, this.heapContainer[indexToRemove]))
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }
    return this;
  }

  /**
   * @param item item to find
   * @param comparator A comparator instance
   * @returns array of indices of the item in the heap
   */
  find(item: any, comparator = this.compare) {
    const foundItemIndices: number[] = [];
    for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex);
      }
    }
    return foundItemIndices;
  }

  /**
   * Take the last item (last in the container array or bottom left in the heap)
   * and lift it up until its in the correct position with respect to its parent
   * @param startIndex Index to start heapify process from
   */
  heapifyUp(startIndex?: number) {
    let currentIndex = startIndex ?? this.heapContainer.length - 1;
    while (
      this.hasParent(currentIndex) &&
      !this.isPairInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  /**
   * Compare the parent with both of it's children
   * and swap it with the appropriate child (smaller child for MinHeap and bigger child for MaxHeap).
   * Do the same for next children after swap.
   * @param startIndex Index to start heapify process from
   */
  heapifyDown(startIndex?: number) {
    let currentIndex = startIndex ?? 0;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        // for MaxHeap it'll test if the first argument is greater
        // and for MinHeap it'll test if the first argument is smaller
        this.isPairInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (this.isPairInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  isEmpty() {
    return !this.heapContainer.length;
  }

  toString() {
    return this.heapContainer.toString();
  }

  /**
   * MaxHeap: Parent must be greater than or equal to the child node
   * MinHeap: Parent must be less than or equal to the child node
   * @param parent Parent Node
   * @param child Child Node
   */
  abstract isPairInCorrectOrder(parent: any, child: any): boolean;
}
