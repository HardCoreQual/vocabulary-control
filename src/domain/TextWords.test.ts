import {TextWordsImpl} from './TextWords';

describe('TextWordsImpl', () => {
	it('empty text -> []', () => {
		const words = new TextWordsImpl('').toArray();
		expect(words.length).toBe(0);
	});

	it('one word', () => {
		const words = new TextWordsImpl('one').toArray();
		expect(words.length).toBe(1);
		expect(words[0]).toBe('one');
	});

	it('two word', () => {
		const words = new TextWordsImpl('two word').toArray();
		expect(words.length).toBe(2);
		expect(words[0]).toBe('two');
		expect(words[1]).toBe('word');
	});
});
