import React from 'react';
import {useTopWords} from "../hooks/useTopWords";
import {moreUsedWordsCoefficient} from "../config";

export function TopWords({value}: { value: string }) {
  const {orderedWords, moreUsedCountWords, totalCountWords} = useTopWords(value);

  return <>
    <div style={{ margin: '5px', fontSize: '24px' }}>
      {moreUsedWordsCoefficient * 100}% is {moreUsedCountWords} from {totalCountWords} words
    </div>
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
  </>
}
