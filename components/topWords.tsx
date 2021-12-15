import React, {useEffect} from 'react';
import {WordsRepositoryImpl} from 'lib/Repository/WordsRepository';
import {MainRepositoryImpl} from 'lib/Repository/MainRepository';
import {getOrderedWords, getTopWordsWithRepeats} from "lib/getWords";

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
    <div style={{overflowY: 'auto'}}>
      {Boolean(orderedWords?.length) && orderedWords.map((w, i) => (
        <div key={w + i}>
          {w}
        </div>
      ))}
    </div>
  );
}
