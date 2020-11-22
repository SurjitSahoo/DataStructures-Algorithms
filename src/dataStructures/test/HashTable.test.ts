import HashTable from '../HashTable';

describe('Hash Table', () => {
  it('should create hash table of certain size', () => {
    const defaultHashTable = new HashTable();
    expect(defaultHashTable.buckets.length).toBe(32);

    const biggerHashTable = new HashTable(100);
    expect(biggerHashTable.buckets.length).toBe(100);
  })

  it('should generate proper hash codes for given keys', () => {
    const hashTable = new HashTable();
    expect(hashTable.hash('a')).toBe(1);
    expect(hashTable.hash('b')).toBe(2);
    expect(hashTable.hash('abc')).toBe(2);
    expect(hashTable.hash('surjit')).toBe(5);
  })

  it('should get, set and delete values in the hashTable', () => {
    const hashTable = new HashTable();
    expect(hashTable.get('non-existing')).toBeUndefined();
    hashTable.set('a', 'camel');
    hashTable.set('b', 'king-kong');
    hashTable.set('shit', '💩');

    expect(hashTable.has('shit')).toBe(true);
    expect(hashTable.has('a')).toBe(true);
    expect(hashTable.has('c')).toBe(false);
    
    expect(hashTable.get('a')).toBe('camel');
    expect(hashTable.get('b')).toBe('king-kong');
    expect(hashTable.get('c')).toBeUndefined();

    expect(hashTable.getKeys()).toEqual(['a', 'b', 'shit']);

    expect(hashTable.delete('a')).toBe('camel');
    expect(hashTable.delete('surjit')).toBeNull();
    expect(hashTable.get('a')).toBeUndefined();
    expect(hashTable.getKeys()).toEqual(['b','shit']);

  })
})