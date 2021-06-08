import {RepeatedWordType} from '../entities/types';

export interface WordsRepository {
  get() : Promise<RepeatedWordType[]>;
  add(word: RepeatedWordType) : Promise<boolean>;
}

type MainDataStructure = {
  repeatedWords: RepeatedWordType[];
}

export interface MainRepository {
  get() : Promise<MainDataStructure>;
  set(data: MainDataStructure) : Promise<boolean>;
}

export class WordsRepositoryImpl implements WordsRepository {
  constructor(private repository: MainRepository) {}

  get() {
    return this.repository.get().then((data) => data.repeatedWords);
  }

  async add(word: RepeatedWordType): Promise<boolean> {
    const {repeatedWords, ...rest} = await this.repository.get();

    return this.repository.set({
      ...rest,
      repeatedWords: [
        ...repeatedWords,
        word,
      ],
    });
  }
}
