import {RepeatedWords, Words} from './types';

export class WordsFromRepeatedWords implements Words {
	constructor(private repeat: RepeatedWords) {}

	get() {
		return this.repeat
			.get()
			.map(({word}) => word)
			.filter(word => word.length > 1);
	}
}
