import { MinHeap } from '../MinHeap';
import {} from '../../utils/Comparator';

describe('MinHeap', () => {
  it('should create an empty MinHeap', () => {
    const heap = new MinHeap();
    expect(heap).toBeDefined();
    expect(heap.peak()).toBeNull();
    expect(heap.isEmpty()).toBe(true);
  });

  it('should add items to the heap and Heapify them up', () => {
    const heap = new MinHeap();
    heap.add(5);
    expect(heap.isEmpty()).toBe(false);
    expect(heap.peak()).toBe(5);
    expect(heap.toString()).toBe('5');

    heap.add(3);
    expect(heap.peak()).toBe(3);
    expect(heap.toString()).toBe('3,5');

    heap.add(10);
    expect(heap.peak()).toBe(3);
    expect(heap.toString()).toBe('3,5,10');

    heap.add(2);
    expect(heap.peak()).toBe(2);
    expect(heap.toString()).toBe('2,3,10,5');

    heap.add(2);
    expect(heap.peak()).toBe(2);
    expect(heap.toString()).toBe('2,2,10,5,3');
  });

  it('should poll items from the heap and perform heapify down', () => {
    const heap = new MinHeap();
    heap.add(5).add(3).add(10).add(2).add(2);
    expect(heap.toString()).toBe('2,2,10,5,3');

    expect(heap.poll()).toBe(2);
    expect(heap.toString()).toBe('2,3,10,5');

    expect(heap.poll()).toBe(2);
    expect(heap.toString()).toBe('3,5,10');

    expect(heap.poll()).toBe(3);
    expect(heap.toString()).toBe('5,10');

    expect(heap.poll()).toBe(5);
    expect(heap.toString()).toBe('10');

    expect(heap.poll()).toBe(10);
    expect(heap.toString()).toBe('');

    expect(heap.poll()).toBeNull();
    expect(heap.toString()).toBe('');
  });

  it('should find item indices in the heap', () => {
    const heap = new MinHeap();
    heap.add(3).add(5).add(10).add(11).add(5);

    expect(heap.toString()).toBe('3,5,10,11,5');
    expect(heap.find(100)).toEqual([]);
    expect(heap.find(11)).toEqual([3]);
    expect(heap.find(3)).toEqual([0]);
    expect(heap.find(10)).toEqual([2]);
    expect(heap.find(5)).toEqual([1, 4]);
  });

  it('should perform heapify down when items above the last child are removed', () => {
    const heap = new MinHeap();

    heap.add(3);
    heap.add(12);
    heap.add(10);
    heap.add(11);
    heap.add(11);

    expect(heap.toString()).toBe('3,11,10,12,11');

    expect(heap.remove(3).toString()).toEqual('10,11,11,12');
    expect(heap.remove(3).peak()).toEqual(10);
    expect(heap.remove(11).toString()).toEqual('10,12');
    expect(heap.remove(3).peak()).toEqual(10);
  });
});
