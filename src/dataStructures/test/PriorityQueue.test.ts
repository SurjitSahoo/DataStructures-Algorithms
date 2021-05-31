import { PriorityQueue } from '../PriorityQueue';

describe('Priority Queue', () => {
  it('should create default priority queue', () => {
    const priorityQueue = new PriorityQueue();
    expect(priorityQueue).toBeDefined();
  });

  it('should insert items into the queue and respect priorities', () => {
    const priorityQueue = new PriorityQueue();
    priorityQueue.add(3, 1);
    expect(priorityQueue.peak()).toBe(3);

    priorityQueue.add(10, 2);
    expect(priorityQueue.peak()).toBe(3);

    priorityQueue.add(20, 0);
    expect(priorityQueue.peak()).toBe(20);

    priorityQueue.add(30, 0);
    expect(priorityQueue.peak()).toBe(20);
  });

  it('should be possible to store objects in priority queue', () => {
    const priorityQueue = new PriorityQueue();

    const user1 = { name: 'surjit' };
    const user2 = { name: 'barsha' };
    const user3 = { name: 'sudhir' };

    priorityQueue.add(user1, 1);
    expect(priorityQueue.peak()).toBe(user1);

    priorityQueue.add(user2, 2);
    expect(priorityQueue.peak()).toBe(user1);

    priorityQueue.add(user3, 0);
    expect(priorityQueue.peak()).toBe(user3);
  });

  it('should poll from queue with respect to priorities', () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(20, 2);
    priorityQueue.add(30, 0);
    priorityQueue.add(40, 0);

    expect(priorityQueue.poll()).toBe(30);
    expect(priorityQueue.poll()).toBe(40);
    expect(priorityQueue.poll()).toBe(10);
    expect(priorityQueue.poll()).toBe(20);
  });

  it('should be possible to change priority of the head node', () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(20, 2);
    priorityQueue.add(30, 0);
    priorityQueue.add(40, 0);

    expect(priorityQueue.peak()).toBe(30);

    priorityQueue.changePriority(30, 5);
    priorityQueue.changePriority(10, 4);
    expect(priorityQueue.peak()).toBe(40);

    expect(priorityQueue.poll()).toBe(40);
    expect(priorityQueue.poll()).toBe(20);
    expect(priorityQueue.poll()).toBe(10);
    expect(priorityQueue.poll()).toBe(30);
  });

  it('should be possible to change priority of the internal nodes', () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(20, 2);
    priorityQueue.add(30, 0);
    priorityQueue.add(40, 0);

    priorityQueue.changePriority(40, 10);
    priorityQueue.changePriority(10, 12);
    priorityQueue.add(50, 15);

    expect(priorityQueue.poll()).toBe(30);
    expect(priorityQueue.poll()).toBe(20);
    expect(priorityQueue.poll()).toBe(40);
    expect(priorityQueue.poll()).toBe(10);
    expect(priorityQueue.poll()).toBe(50);
  });

  it('should be possible to search items by value in the queue', () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(20, 2);
    priorityQueue.add(30, 0);
    priorityQueue.add(40);

    expect(priorityQueue.hasValue(40)).toBe(true);
    expect(priorityQueue.hasValue(100)).toBe(false);
  });
});
