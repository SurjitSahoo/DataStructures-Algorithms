import { threadId } from 'worker_threads';
import Comparator, { comparatorFn } from '../utils/Comparator';

export default abstract class Heap {
  compare: Comparator;
  heapContainer: any[];

  constructor(comparatorFn?: comparatorFn) {
    this.compare = new Comparator(comparatorFn);
    this.heapContainer = [];
  }

  getLeftChildIndex(parentIndex: number) {
    return (2 * parentIndex) + 1;
  }

  getRightChildIndex(parentIndex: number) {
    return (2 * parentIndex) + 2;
  }

  getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasParent(childIndex: number) {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasLeftChild(parentIndex: number) {
    return this.getLeftChildIndex(parentIndex) <= this.heapContainer.length;
  }

  hasRightChild(parentIndex: number) {
    return this.getRightChildIndex(parentIndex) <= this.heapContainer.length;
  }

  leftChild(parentIndex: number) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex: number) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex: number) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(index1: number, index2: number) {
    const temp = this.heapContainer[index1];
    this.heapContainer[index1] = this.heapContainer[index2];
    this.heapContainer[index2] = temp;
  }

  // Get the root node
  peak() {
    if (this.heapContainer.length === 0) {
      return null;
    } else {
      return this.heapContainer[0];
    }
  }

  // Remove the root node
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

  remove(item: any) {

  }

  find(item: any) {

  }

  heapifyUp() {
    
  }

  heapifyDown() {

  }

  isEmpty() {
    return !this.heapContainer.length;
  }

  toString() {
    return this.heapContainer.toString();
  }
}
