import { HashTable } from '../5.HashTable/HashTable';

export class TrieNode {
  /**
   * @property Character
   */
  character: string;

  /**
   * @property Flag for marking a complete word
   * */
  isCompleteWord: boolean;

  /**
   * @property Children of current node
   */
  children: HashTable;

  constructor(character: string, isCompleteWord = false) {
    this.character = character;
    this.isCompleteWord = isCompleteWord;
    this.children = new HashTable();
  }

  getChild(character: string) {
    return this.children.get(character) as TrieNode;
  }

  addChild(character: string, isCompleteWord = false) {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord));
    }

    const node: TrieNode = this.children.get(character);
    // for situations like when we add 'car' after inserting the word 'carpet',
    // the isComplete flag for "r" needs to be updated
    if (node) {
      node.isCompleteWord = node.isCompleteWord || isCompleteWord;
    }

    return node;
  }

  removeChild(character: string) {
    // Remove child only if it doesn't have any children and node.isCompleteWord is false
    const child: TrieNode = this.children.get(character);
    if (child && !child.hasChildren() && !child.isCompleteWord) {
      this.children.delete(character);
    }
    return this;
  }

  hasChild(character: string) {
    return this.children.has(character);
  }

  hasChildren() {
    return this.children.getKeys().length > 0;
  }

  suggestChildren() {
    return [...this.children.getKeys()];
  }

  toString() {
    let childrenAsString = this.suggestChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
    const isCompleteString = this.isCompleteWord ? '*' : '';

    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}
