import {splitTextToWords} from './TextWords';
import {RepeatedWords} from './types';

export class WordsCountRepeatImpl implements RepeatedWords {
  constructor(private text: string) {}

  get() {
    return this.toArray(this.calcRepeatCountInObject());
  }

  private calcRepeatCountInObject() {
    const result : Record<string, number> = {};

    splitTextToWords(this.text).forEach((word) => {
      const precedentValue = result[word] || 0;
      result[word] = precedentValue + 1;
    });

    return result;
  }

  private toArray(obj: Record<string, number>) {
    return Object.entries(obj).map(([word, count]) => ({word, count}));
  }
}
