/**
 * Trie is also known as digital tree or prefix tree, it is a type of search tree.
 * It's a tree data structure generally used to store strings, where each node stores individual
 * character and links to next characters
 *
 * Each node stores a character, a flag of doesItCompleteAWord and an array or HashTable of all of its children nodes
 *
 * e.g. "car" => {"*", root} --> {'c', completesWord: false} --> {'a', completesWord: false} --> {'r', completesWord: True}
 *
 * Basically nodes are linked not by entire keys, but by individual characters
 *
 * ![Trie](https://upload.wikimedia.org/wikipedia/commons/b/be/Trie_example.svg)
 *
 * **Files:**
 * [Trie](https://github.com/SurjitSahoo/DataStructures-Algorithms/blob/main/src/dataStructures/8.Trie/Trie.ts) |
 * [Test](https://github.com/SurjitSahoo/DataStructures-Algorithms/blob/main/src/dataStructures/8.Trie/test/Trie.test.ts)
 *
 * [![YouTube](http://img.youtube.com/vi/zIjfhVPRZCg/0.jpg)](http://www.youtube.com/watch?v=zIjfhVPRZCg)
 *
 * @category Data Structure
 * @module 8.Trie
 */
import { TrieNode } from './TrieNode';

const HEAD_CHARACTER = '*';
export class Trie {
  /**
   * @property Root Node
   */
  head: TrieNode;

  constructor() {
    this.head = new TrieNode(HEAD_CHARACTER);
  }

  addWord(word: string) {
    const characters = Array.from(word);
    let currentNode = this.head;
    for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
      const doesCompleteTheWord = charIndex === characters.length - 1;
      currentNode = currentNode.addChild(characters[charIndex], doesCompleteTheWord);
    }
    return this;
  }

  deleteWord(word: string) {
    /**
     * Recursive function to delete character by character.
     * Exit conditions: if we reach the end of the word | the word doesn't exist
     */
    const depthFirstDelete = (currentNode: TrieNode, currentCharIndex = 0) => {
      if (currentCharIndex >= word.length) {
        // if we reach the end of word
        return;
      }

      const nextNode = currentNode.getChild(word[currentCharIndex]);
      if (!nextNode) {
        // if the word doesn't exist in the Trie
        return;
      }

      // keep going deeper until we reach one of the exit conditions
      depthFirstDelete(nextNode, currentCharIndex + 1);

      // Deletion
      // since we're deleting the word, first we need to mark it's last character's isComplete flag as false
      // otherwise we won't be able to delete the last character
      if (currentCharIndex === word.length - 1) {
        nextNode.isCompleteWord = false;
      }

      currentNode.removeChild(word[currentCharIndex]);
    };

    depthFirstDelete(this.head);
    return this;
  }

  suggestNextCharacters(word: string) {
    const lastChar = this.getLastCharacterNode(word);
    if (!lastChar) {
      return null;
    }
    return lastChar.suggestChildren();
  }

  doesWordExist(word: string) {
    const lastChar = this.getLastCharacterNode(word);
    return !!lastChar && lastChar.isCompleteWord;
  }

  getLastCharacterNode(word: string) {
    const characters = Array.from(word);
    let currentNode = this.head;

    for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
      if (!currentNode.hasChild(characters[charIndex])) {
        return null;
      }
      currentNode = currentNode.getChild(characters[charIndex]);
    }

    return currentNode;
  }
}
