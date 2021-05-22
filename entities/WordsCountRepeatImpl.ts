import {ToWordsConverter} from './TextWords';

interface WordsCountRepeat {
  calcRepeatCount() : {word: string, count: number}[];
}

export class WordsCountRepeatImpl implements WordsCountRepeat {
  constructor(private words: ToWordsConverter) {}

  calcRepeatCount() {
    return this.toArray(this.calcRepeatCountInObject());
  }

  private calcRepeatCountInObject() {
    const result : Record<string, number> = {};

    this.words.toArray().forEach((word) => {
      const precedentValue = result[word] || 0;
      result[word] = precedentValue + 1;
    });

    return result;
  }

  private toArray(obj: Record<string, number>) {
    return Object.entries(obj).map(([word, count]) => {
      return {word, count};
    });
  }
}
