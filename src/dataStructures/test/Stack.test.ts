import { Stack } from '../Stack';

describe('Stack', () => {
  it('should create an empty stack', () => {
    const stack = new Stack();
    expect(stack.isEmpty()).toBe(true);
    expect(stack.toString()).toBe('');
    expect(stack.peak()).toBeNull();
  });

  it('should push and pop values from the stack', () => {
    const stack = new Stack();
    stack.push(1).push(2).push(3);
    expect(stack.peak()).toBe(3);
    expect(stack.toArray()).toEqual([3, 2, 1]);
    expect(stack.toString()).toBe('3,2,1');

    expect(stack.pop()).toBe(3);
    expect(stack.toArray()).toEqual([2, 1]);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBeNull();
  });
});
