import LinkedList from './LinkedList';

const defaultHashTableSize = 32;

interface Node {
  key: string,
  value: any
}
export default class HashTable {
  buckets: LinkedList[];
  keys: {
    [x: string]: number,
  }

  constructor(tableSize = defaultHashTableSize) {
    this.buckets = new Array(tableSize).fill(null).map(() => new LinkedList());
    this.keys = {}  // key: index map for fast lookup
  }

  /** POLYNOMIAL STRING HASHING str -> hash -> index  
   * hash(str) = [(str.charCodeAt(0) * P^(n-1)) + (str.charCodeAt(1) * P^(n-2)) + ... ] % M  
   * P => any prime number, roughly equal to the total no of characters used in the key  
   * M => usually the size of bucket list,
   *      because probability of two strings colliding must be inversely proportional to M  
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