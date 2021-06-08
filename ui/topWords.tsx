import {WordsFromRepeatedWords} from '../entities/Words';
import {AscSortedRepeatWord} from '../entities/AscSortedRepeatWord';
import {WordsCountRepeatImpl} from '../entities/WordsCountRepeatImpl';
import {TextWordsImpl} from '../entities/TextWords';
import React from 'react';

export function TopWords({value}: { value: string }) {
  const topWords = new WordsFromRepeatedWords(
      new AscSortedRepeatWord(
          new WordsCountRepeatImpl(
              new TextWordsImpl(
                  value.toLowerCase(),
              ),
          ),
      ),
  )
      .get()
      .reverse();

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
