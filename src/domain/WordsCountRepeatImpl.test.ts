import {WordsCountRepeatImpl} from './WordsCountRepeatImpl';

describe('CountWords', () => {
	const calc = (array: string[]) => new WordsCountRepeatImpl({
		toArray: () => array,
	}).get();

	it('empty data', () => {
		expect(calc([]).length).toBe(0);
	});

	it('one input -> one output', () => {
		expect(calc(['test']).length).toBe(1);
	});

	it('3 words with repeat', () => {
		const result = calc(['text', 'new', 'text']);
		expect(result.length).toBe(2);
		expect(result).toStrictEqual([
			{word: 'text', count: 2}, {word: 'new', count: 1},
		]);
	});
});
