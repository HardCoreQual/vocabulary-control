import {RepeatedWords, RepeatedWordType} from './types';

export class AscSortedRepeatWord implements RepeatedWords {
  constructor(private source: RepeatedWords) {}

  get() {
    const words = this.source.get();
    return this.sortWordsByCount(words);
  }

  private sortWordsByCount(wordsWithCount: RepeatedWordType[]) {
    return wordsWithCount.sort(this.compareRepeatedWords);
  }

  private compareRepeatedWords(a: RepeatedWordType, b: RepeatedWordType) {
    return a.count - b.count;
  }
}
