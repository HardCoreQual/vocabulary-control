import React, {useEffect} from 'react';
import {WordsRepositoryImpl} from 'lib/../libs/Repository/WordsRepository';
import {MainRepositoryImpl} from 'lib/../libs/Repository/MainRepository';
import {getTopWordsWithRepeats, RepeatedWordType, sortRepeatWords} from "../libs/getWords";
import {pipe} from "ts-functional-pipe";

const moreUsedWordsCoefficient = 0.99;

const excludeLessUsed = (words: RepeatedWordType[]) => {
  const totalCountWords = words.reduce((sum, e) => sum + e.count, 0);
  let savedCountWords = 0;

  return words.filter((e) => {
    if (savedCountWords / totalCountWords > moreUsedWordsCoefficient) {
      return false;
    }

    savedCountWords += e.count;
    return e;
  });
}
const useTopWords = (value: string) => {
  const topWordsRepeated = pipe(
    getTopWordsWithRepeats,
    sortRepeatWords(true),
  )(value);

  const orderedWords = pipe(
    excludeLessUsed,
    (words: RepeatedWordType[]) => words.map(({word}) => word),
  )(topWordsRepeated);

  useEffect(() => {
    const repository = new WordsRepositoryImpl(
      new MainRepositoryImpl(),
    );

    void repository.addBunch(topWordsRepeated);
  }, [orderedWords]);

  return {orderedWords};
};

export function TopWords({value}: { value: string }) {
  const {orderedWords} = useTopWords(value);

  return (
    <div style={{
      display: 'grid',
      maxWidth: '100vw',
      gridTemplateColumns: 'repeat(5, 1fr)',
    }}>
      {Boolean(orderedWords?.length) && orderedWords.map((w, i) => (
        <div style={{ padding: '5px' }} key={w + i}>
          {w}
        </div>
      ))}
    </div>
  );
}
