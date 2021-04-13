/**
 * A hash-table is basically a key-value lookup data structure, a hash map. A combination of features from Array and LinkedList data structures.
 * Array like constant complexity and LinkedList like flexibility
 * It uses a hash function to compute an index into an array of buckets to put or get the data from.
 * 
 * **lookup** - key(input) -> hashCode -> index
 * ### Problem Statement (Collision)
 * - The size of the array is fixed, where as number of potential hashCodes is virtually infinite
 * - Multiple keys can produce single hashCode
 * - And multiple hashCodes can map to a single index of the array of buckets
 * 
 * ### Collision Handling
 * - The buckets will not store a single data entity, but rather it'll be a linkedList
 * - The LinkedList will have all the data items whose keys mapped to the same index of the bucket
 * - The data entities will consist of key as well as value as properties
 * -> when multiple keys map to the same index, we go that index and search for the key in the linked list
 * 
 * ![Hash Table](https://upload.wikimedia.org/wikipedia/commons/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg)
 *
 * Hash collision resolved by chaining.
 *
 * ![Hash Collision](https://upload.wikimedia.org/wikipedia/commons/d/d0/Hash_table_5_0_1_1_1_1_1_LL.svg)
 * 
 * [![YouTube](http://img.youtube.com/vi/shs0KM3wKv8/0.jpg)](http://www.youtube.com/watch?v=shs0KM3wKv8)
 * 
 * @module 5. HashTable
 */

import { LinkedList } from './LinkedList';

const defaultHashTableSize = 32;

interface Node {
  key: string,
  value: any
}

/**
 * Hash Table data structure
 */
export class HashTable {
  /**
   * @property Array of buckets or slots
   */
  buckets: LinkedList[];
  /**
   * @property A map of key -> index in the bucket for fast lookup
   */
  keys: {
    [x: string]: number,
  }

  /**
   * 
   * @param tableSize size of the hash table
   */
  constructor(tableSize = defaultHashTableSize) {
    this.buckets = new Array(tableSize).fill(null).map(() => new LinkedList());
    this.keys = {}  // key: index map for fast lookup
  }

  /** 
   * POLYNOMIAL STRING HASHING key(string input) -> hash -> index
   * 
   * hash(str) = [(str.charCodeAt(0) * P^(n-1)) + (str.charCodeAt(1) * P^(n-2)) + ... ] % M
   * 
   * P => any prime number, roughly equal to the total no of characters used in the key
   *      * e.g. if the key only uses lower-case alphabets => prime number closer to 26 => 31
   * 
   * M => usually the size of bucket list,
   *      because probability of two strings colliding must be inversely proportional to M
   * 
   * n => length of the key
   */
  hash(key: string) {
    const P = 31; // key will only contain small letters. so 26 = 31
    const n = key.length;
    const M = this.buckets.length;

    const hash =  Array.from(key).reduce(
      (hashAccumulator: number, keyChar: string, idx: number) => {
        return hashAccumulator + keyChar.charCodeAt(0) * Math.pow(P, n - (idx+1));
      },
      0
    );
    return hash % M;
  }

  set(key: string, value: any) {
    const index = this.hash(key);
    this.keys[key] = index;
    const bucketLinkedList = this.buckets[index];

    const node = bucketLinkedList.find({callback: (node: Node) => node.key === key});
    if (!node) {
      // insert new value
      bucketLinkedList.append({key, value});
    } else {
      // update existing value
      node.value.value = value;
    }
    return this;
  }

  delete(key: string) {
    const index = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[index];

    const nodeToBeDeleted = bucketLinkedList.find({callback: (node: Node) => node.key === key});
    console.log(nodeToBeDeleted);
    if (nodeToBeDeleted) {
      return bucketLinkedList.delete(nodeToBeDeleted.value)?.value.value;
    }
    return null;
  }

  get(key: string) {
    if (!this.keys[key]) {
      return undefined;
    }
    const index = this.hash(key);
    const bucketLinkedList = this.buckets[index];
    const node = bucketLinkedList.find({callback: (value: Node) => value.key === key});
    return node ? node.value.value : undefined;
  }

  has(key: string) {
    return key in this.keys;
  }

  getKeys() {
    return Object.keys(this.keys);
  }
}