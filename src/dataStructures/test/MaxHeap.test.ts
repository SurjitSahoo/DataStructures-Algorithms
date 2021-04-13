import { MaxHeap } from '../MaxHeap';
import { Comparator } from '../../utils/Comparator';

describe('MaxHeap', () => {
  it('should create an empty Heap', () => {
    const heap = new MaxHeap();
    expect(heap).toBeDefined();
    expect(heap.peak()).toBeNull();
    expect(heap.isEmpty()).toBe(true);
  })

  it('should add items to the heap and Heapify them up', () => {
    const heap = new MaxHeap();
    
    heap.add(5);
    expect(heap.isEmpty()).toBe(false);
    expect(heap.peak()).toBe(5);
    expect(heap.toString()).toBe('5');

    heap.add(3);
    expect(heap.peak()).toBe(5);
    expect(heap.toString()).toBe('5,3');
    
    heap.add(10);
    expect(heap.peak()).toBe(10);
    expect(heap.toString()).toBe('10,3,5');

    heap.add(2);
    expect(heap.peak()).toBe(10);
    expect(heap.toString()).toBe('10,3,5,2');
    
    heap.add(2);
    expect(heap.toString()).toBe('10,3,5,2,2');
  })
  
  it('should poll items from the heap and perform heapify down', () => {
    const heap = new MaxHeap();
    heap.add(5).add(3).add(10).add(2).add(2);

    expect(heap.poll()).toBe(10);
    expect(heap.toString()).toBe('5,3,2,2');
  
    expect(heap.poll()).toBe(5);
    expect(heap.toString()).toBe('3,2,2');
    
    expect(heap.poll()).toBe(3);
    expect(heap.toString()).toBe('2,2');
  })

  it('should find item indices in the heap', () => {
    const heap = new MaxHeap();
    heap.add(3).add(5).add(10).add(11).add(5);

    expect(heap.toString()).toBe('11,10,5,3,5');
    expect(heap.find(100)).toEqual([]);
    expect(heap.find(11)).toEqual([0]);
    expect(heap.find(3)).toEqual([3]);
    expect(heap.find(10)).toEqual([1]);
    expect(heap.find(5)).toEqual([2,4]);
  })

  it('should remove items from the heap and perform appropriate heapify operation', () => {
    const heap = new MaxHeap();
  })
});