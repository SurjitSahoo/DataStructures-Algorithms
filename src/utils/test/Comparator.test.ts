import Comparator from '../Comparator';

describe('Comparator', () => {
  it('should compare two numbers', () => {
    const compare = new Comparator();
    expect(compare.equal(1, 1)).toBe(true);
    expect(compare.lessThan(1, 2)).toBe(true);
    expect(compare.greaterThan(1, 2)).toBe(false);
    expect(compare.lessThanOrEqual(1, 2)).toBe(true);
    expect(compare.lessThanOrEqual(2, 2)).toBe(true);
  });
})