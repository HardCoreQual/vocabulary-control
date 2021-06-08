import {RepeatedWordType} from '../entities/types';
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

  async add(word: RepeatedWordType): Promise<boolean> {
    const data = await this.repository.get();
    if (!data) {
      return false;
    }

    const {repeatedWords, ...rest} = data;

    return this.repository.set({
      ...rest,
      repeatedWords: [
        ...repeatedWords,
        word,
      ],
    });
  }
}
