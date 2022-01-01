import {pipe} from "ts-functional-pipe";
import {getTopWordsWithRepeats, RepeatedWordType, sortRepeatWords} from "../libs/getWords";
import {useEffect} from "react";
import {WordsRepositoryImpl} from "../libs/Repository/WordsRepository";
import {MainRepositoryImpl} from "../libs/Repository/MainRepository";
import {moreUsedWordsCoefficient, moreUsedWordsRepeatedMoreThat} from "../config";
import {map, reduce, select, sum} from "../libs/utils/fp";

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

export const extractTopWords = (value: string) => {
  const topWordsRepeated = pipe(
    getTopWordsWithRepeats,
    sortRepeatWords(true),
  )(value);

  const moreUsedTopWords = excludeLessUsed(topWordsRepeated);

  const orderedWords = pipe(
    (words: RepeatedWordType[]) => words.map(({word}) => word),
  )(moreUsedTopWords);

  return {
    orderedWords,
    topWordsRepeated,
    totalCountWords: topWordsRepeated.length,
    moreUsedCountWords: moreUsedTopWords.length,
  };
};

export const useTopWords = (value: string) => {
  const {topWordsRepeated, ...words} = extractTopWords(value);

  useEffect(() => {
    const repository = new WordsRepositoryImpl(
      new MainRepositoryImpl(),
    );

    void repository.addBunch(topWordsRepeated);
  }, [words.orderedWords]);

  return words;
};