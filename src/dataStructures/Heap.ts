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
 * [![YouTube](http://img.youtube.com/vi/t0Cq6tVNRBA/0.jpg)](http://www.youtube.com/watch?v=t0Cq6tVNRBA)
 * 
 * @module Heap
 */
import {Comparator, comparatorFn } from '../utils/Comparator';

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
