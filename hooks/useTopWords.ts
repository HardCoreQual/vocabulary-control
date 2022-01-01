import {pipe} from "ts-functional-pipe";
import {getTopWordsWithRepeats, RepeatedWordType, sortRepeatWords} from "../libs/getWords";
import {useEffect} from "react";
import {WordsRepositoryImpl} from "../libs/Repository/WordsRepository";
import {MainRepositoryImpl} from "../libs/Repository/MainRepository";
import {moreUsedWordsCoefficient, moreUsedWordsRepeatedMoreThat} from "../config";

const select = <R, K extends string>(key: K) => <T extends Record<K, any>>(data: T) => data[key];
const sum = (a: number, b: number) => a + b;
const map = <T, R = any>(fn: (e: T, i: number, arr: T[]) => R) => (arr: T[]) => arr.map(fn);
const reduce = <T, R>(fn: (r: R, e: T) => R) => (init: R) => (arr: T[]) => arr.reduce(fn, init);
const calcCountTotalWords = pipe(
  map<{ count: number }>(select('count')),
  reduce(sum)(0),
);
const excludeLessUsed = (words: RepeatedWordType[]) => {
  const totalCountWords = calcCountTotalWords(words);
  let savedCountWords = 0;

  return words.filter((e) => {
    if (savedCountWords / totalCountWords > moreUsedWordsCoefficient) {
      return false;
    }
    if (e.count <= moreUsedWordsRepeatedMoreThat) {
      return false;
    }

    savedCountWords += e.count;
    return e;
  });
}

export const useTopWords = (value: string) => {
  const topWordsRepeated = pipe(
    getTopWordsWithRepeats,
    sortRepeatWords(true),
  )(value);

  const moreUsedTopWords = excludeLessUsed(topWordsRepeated);

  const orderedWords = pipe(
    (words: RepeatedWordType[]) => words.map(({word}) => word),
  )(moreUsedTopWords);

  useEffect(() => {
    const repository = new WordsRepositoryImpl(
      new MainRepositoryImpl(),
    );

    void repository.addBunch(topWordsRepeated);
  }, [orderedWords]);

  return {
    orderedWords,
    totalCountWords: topWordsRepeated.length,
    moreUsedCountWords: moreUsedTopWords.length,
  };
};