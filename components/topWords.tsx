import React, {useEffect} from 'react';
import {WordsRepositoryImpl} from 'lib/../libs/Repository/WordsRepository';
import {MainRepositoryImpl} from 'lib/../libs/Repository/MainRepository';
import {getOrderedWords, getTopWordsWithRepeats} from "../libs/getWords";

export function TopWords({value}: { value: string }) {
  const topWordsRepeated = getTopWordsWithRepeats(value);
  const orderedWords = getOrderedWords(topWordsRepeated);

  useEffect(() => {
    const repository = new WordsRepositoryImpl(
      new MainRepositoryImpl(),
    );

    repository.addBunch(topWordsRepeated);
  }, [orderedWords]);

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
