import Queue from '../Queue';

describe('Queue', () => {
  it('should create an empty queue', () => {
    const queue = new Queue();
    expect(queue.isEmpty()).toBe(true);
    expect(queue.peak()).toBeNull();
  })

  it('should enqueue and dequeue values in the queue', () => {
    const queue = new Queue();
    queue.enqueue(1).enqueue(2);
    expect(queue.toString()).toBe('1,2');
    expect(queue.peak()).toBe(1);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBeNull();
  })

})