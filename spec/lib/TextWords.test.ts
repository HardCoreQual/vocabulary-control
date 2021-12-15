import {splitTextToWords} from 'lib/legacy/TextWords';

describe('split text to words', () => {
  it('empty text -> []', () => {
    const words = splitTextToWords('');
    expect(words.length).toBe(0);
  });

  it('one word', () => {
    const words = splitTextToWords('one')
    expect(words.length).toBe(1);
    expect(words[0]).toBe('one');
  });

  it('two word', () => {
    const words = splitTextToWords('two word');
    expect(words.length).toBe(2);
    expect(words[0]).toBe('two');
    expect(words[1]).toBe('word');
  });
});
