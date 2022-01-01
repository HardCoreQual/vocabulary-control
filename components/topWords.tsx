import React from 'react';
import {useTopWords} from "../hooks/useTopWords";
import {moreUsedWordsCoefficient} from "../config";
import {Button} from "@mui/material";


const downloadBlob = (blob: Blob, name: string) => {
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = name;
  link.click();
};

const downloadObjectAsJson = (data: any, name: string) => {
  const json = JSON.stringify(data);
  const blob = new Blob([new Buffer(json)], {
    type: 'application/json'
  });

  downloadBlob(blob, name + '.json');
};

export function TopWords({value}: { value: string }) {
  const {orderedWords, moreUsedCountWords, totalCountWords} = useTopWords(value);

  if (orderedWords.length === 0) {
    return null;
  }

  return <>
    <Button variant="contained" onClick={() => {
      downloadObjectAsJson(orderedWords, 'words')
    }}>Download</Button>

    <Button variant="contained" onClick={() => {
      const text = orderedWords.join('\n');
      const blob = new Blob([new Buffer(text)], {
        type: 'plain/text'
      });

      downloadBlob(blob, 'anki-words.txt');
    }}>Download for Anki</Button>

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
