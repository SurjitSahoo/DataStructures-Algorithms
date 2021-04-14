import { MinHeap } from '../MinHeap';
import {  } from '../../utils/Comparator';

describe('MinHeap', () => {
  it('should create an empty MinHeap', () => {
    const heap = new MinHeap();
    expect(heap).toBeDefined();
    expect(heap.peak()).toBeNull();
    expect(heap.isEmpty()).toBe(true);
  })

  it('should add items to the heap and Heapify them up',() => {
    const heap = new MinHeap();
    
  })
})