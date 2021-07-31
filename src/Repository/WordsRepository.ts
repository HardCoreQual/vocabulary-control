import {RepeatedWordType} from '../domain/types';
import {MainRepository} from './MainRepository';

export interface WordsRepository {
  get() : Promise<RepeatedWordType[] | null>;
  add(word: RepeatedWordType) : Promise<boolean>;
}

export class WordsRepositoryImpl implements WordsRepository {
	constructor(private repository: MainRepository) {}

	async get() {
		const data = await this.repository.get();
		return data?.repeatedWords || null;
	}

	async addBunch(words: RepeatedWordType[]): Promise<boolean[]> {
		return Promise.all(words.map(this.add));
	}

	async add(word: RepeatedWordType): Promise<boolean> {
		const data = await this.repository.get();
		if (!data) {
			return false;
		}

		const {repeatedWords, ...rest} = data;

		const {searchedRepeatWord, newRepeatWords} = this.wordSearch(
			word.word,
			repeatedWords,
		);

		const newSearchedWord = {
			word: word.word,
			count: searchedRepeatWord.count + word.count,
		};

		return this.repository.set({
			...rest,
			repeatedWords: [
				...newRepeatWords,
				newSearchedWord,
			],
		});
	}

	private wordSearch(word: string, repeatedWords: RepeatedWordType[]) : {
    searchedRepeatWord: RepeatedWordType,
    newRepeatWords: RepeatedWordType[],
  } {
		let index = -1;

		repeatedWords.forEach((e, i) => {
			if (e.word === word) {
				index = i;
			}
		});

		if (index < 0) {
			return {
				newRepeatWords: repeatedWords,
				searchedRepeatWord: {
					word,
					count: 0,
				},
			};
		}

		const newRepeatWords = [...repeatedWords];
		const searchedRepeatWords = newRepeatWords.splice(index, 1);
		const searchedRepeatWord = searchedRepeatWords[0];
		return {searchedRepeatWord, newRepeatWords};
	}
}
