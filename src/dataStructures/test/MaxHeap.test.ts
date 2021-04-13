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

  it('should perform heapify down when items are removed from the top of the Heap', () => {
    const heap = new MaxHeap();
    heap.add(3).add(5).add(10).add(11).add(5);

    expect(heap.toString()).toBe('11,10,5,3,5');
    expect(heap.remove(11).toString()).toBe('10,5,5,3');
    expect(heap.remove(11).peak()).toBe(10);
    expect(heap.remove(10).toString()).toBe('5,5,3');
    expect(heap.remove(5).toString()).toBe('3');
  })

  it('should perform heapify up when items are removed from in between or bottom of the tree', () => {
    const heap = new MaxHeap();
    heap.add(3).add(10).add(5).add(6).add(7).add(4).add(6).add(8).add(2).add(1);

    expect(heap.toString()).toBe('10,8,6,7,6,4,5,3,2,1');
    expect(heap.remove(4).toString()).toEqual('10,8,6,7,6,1,5,3,2');
    expect(heap.remove(3).toString()).toEqual('10,8,6,7,6,1,5,2');
    expect(heap.remove(5).toString()).toEqual('10,8,6,7,6,1,2');
    expect(heap.remove(10).toString()).toEqual('8,7,6,2,6,1');
    expect(heap.remove(6).toString()).toEqual('8,7,1,2');
    expect(heap.remove(2).toString()).toEqual('8,7,1');
    expect(heap.remove(1).toString()).toEqual('8,7');
    expect(heap.remove(7).toString()).toEqual('8');
    expect(heap.remove(8).toString()).toEqual('');
  })

  it('should be possible to find and remove items from heap using custom comparator', () => {
    const comparator = new Comparator((a: string, b: string) => {
      if (a.length === b.length) return 0;
      else return a.length > b.length ? 1 : -1;
    });

    const heap = new MaxHeap();
    heap.add('a').add('bb').add('ccc').add('dddd');

    expect(heap.toString()).toBe('dddd,ccc,bb,a');
    expect(heap.remove('hey', comparator).toString()).toBe('dddd,a,bb');
  })
});