import { Trie } from '../Trie';

describe('Trie', () => {
  it('should create a trie', () => {
    const trie = new Trie();
    expect(trie).toBeDefined();
    expect(trie.head.toString()).toBe('*');
  });

  it('should add words to the trie', () => {
    const trie = new Trie();
    trie.addWord('car');
    expect(trie.head.toString()).toBe('*:c');
    expect(trie.head.getChild('c').toString()).toBe('c:a');

    trie.addWord('cat');
    expect(trie.head.toString()).toBe('*:c');
    expect(trie.head.getChild('c').toString()).toBe('c:a');
    expect(trie.head.getChild('c').getChild('a').toString()).toBe('a:r,t');
  });

  it('should check if the words exist in the trie', () => {
    const trie = new Trie();
    trie.addWord('cat');
    trie.addWord('car');
    expect(trie.doesWordExist('car')).toBe(true);
    expect(trie.doesWordExist('cat')).toBe(true);
    expect(trie.doesWordExist('carpet')).toBe(false);
  });

  it('should delete words from the trie', () => {
    const trie = new Trie();
    trie.addWord('car');
    trie.addWord('cat');
    trie.addWord('carpet');
    trie.addWord('cart');

    trie.deleteWord('carpool');
    expect(trie.doesWordExist('car')).toBe(true);
    expect(trie.doesWordExist('cat')).toBe(true);
    expect(trie.doesWordExist('carpet')).toBe(true);
    expect(trie.doesWordExist('cart')).toBe(true);

    trie.deleteWord('cart');
    expect(trie.doesWordExist('car')).toBe(true);
    expect(trie.doesWordExist('cat')).toBe(true);
    expect(trie.doesWordExist('carpet')).toBe(true);
    expect(trie.doesWordExist('cart')).toBe(false);

    trie.deleteWord('car');
    expect(trie.doesWordExist('car')).toBe(false);
    expect(trie.doesWordExist('cat')).toBe(true);
    expect(trie.doesWordExist('carpet')).toBe(true);
    expect(trie.doesWordExist('cart')).toBe(false);

    trie.deleteWord('cat');
    expect(trie.doesWordExist('car')).toBe(false);
    expect(trie.doesWordExist('cat')).toBe(false);
    expect(trie.doesWordExist('carpet')).toBe(true);
    expect(trie.doesWordExist('cart')).toBe(false);

    trie.deleteWord('carpet');
    expect(trie.doesWordExist('car')).toBe(false);
    expect(trie.doesWordExist('cat')).toBe(false);
    expect(trie.doesWordExist('carpet')).toBe(false);
    expect(trie.doesWordExist('cart')).toBe(false);
  });

  it('should suggest next characters', () => {
    const trie = new Trie();
    trie.addWord('car');
    trie.addWord('cat');
    trie.addWord('cats');
    trie.addWord('caption');

    expect(trie.suggestNextCharacters('ca')).toEqual(['r', 't', 'p']);
    expect(trie.suggestNextCharacters('cat')).toEqual(['s']);
    expect(trie.suggestNextCharacters('cab')).toBeNull();
  });
});
