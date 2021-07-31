import {WordsFromRepeatedWords} from '../domain/Words';
import {AscSortedRepeatWord} from '../domain/AscSortedRepeatWord';
import {WordsCountRepeatImpl} from '../domain/WordsCountRepeatImpl';
import {TextWordsImpl} from '../domain/TextWords';
import React, {useEffect} from 'react';
import {WordsRepositoryImpl} from '../Repository/WordsRepository';
import {MainRepositoryImpl} from '../Repository/MainRepository';

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

  // useEffect(() => {
  //   const repository = new WordsRepositoryImpl(
  //       new MainRepositoryImpl(),
  //   );
  //
  //   repository.addBunch(topWordsRepeated.get());
  // }, [topWords]);

  return (
    <div style={{overflowY: 'auto'}}>
      {!!topWords?.length && topWords.map((w, i) => (
        <div key={w + i}>
          {w}
        </div>
      ))}
    </div>
  );
}
