import {WordsFromRepeatedWords} from '../lib/legacy/Words';
import {AscSortedRepeatWord} from '../lib/legacy/AscSortedRepeatWord';
import {WordsCountRepeatImpl} from '../lib/legacy/WordsCountRepeatImpl';
import {TextWordsImpl} from 'lib/legacy/TextWords';
import React, {useEffect} from 'react';
import {WordsRepositoryImpl} from '../lib/Repository/WordsRepository';
import {MainRepositoryImpl} from '../lib/Repository/MainRepository';

export function TopWords({value}: { value: string }) {
  const topWordsRepeated = new WordsCountRepeatImpl(
    new TextWordsImpl(
      value.toLowerCase(),
    ),
  );

  const topWords = new WordsFromRepeatedWords(
    new AscSortedRepeatWord(
      topWordsRepeated,
    ),
  )
    .get()
    .reverse();

  useEffect(() => {
    const repository = new WordsRepositoryImpl(
      new MainRepositoryImpl(),
    );

    repository.addBunch(topWordsRepeated.get());
  }, [topWords]);

  return (
    <div style={{overflowY: 'auto'}}>
      {Boolean(topWords?.length) && topWords.map((w, i) => (
        <div key={w + i}>
          {w}
        </div>
      ))}
    </div>
  );
}
