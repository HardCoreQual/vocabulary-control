import React from 'react';
import {extractTopWords} from "../hooks/useTopWords";
import {moreUsedWordsCoefficient} from "../config";
import {Button} from "@mui/material";
import {trpc} from "../hooks/trpc";
import {useSession} from "next-auth/react";


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
  const {topWordsRepeated, orderedWords, moreUsedCountWords, totalCountWords} = extractTopWords(value);
  const { data } = useSession();
  const addWords = trpc.useMutation('add_words');

  if (orderedWords.length === 0) {
    return null;
  }

  const handleAddWordsToMyProfile = () => {
    addWords.mutate({
      email: data?.user?.email || '',
      words: topWordsRepeated.map(e => ({text: e.word, count: e.count})),
    })
  }

  return <>
    <Button variant="contained" onClick={() => {
      downloadObjectAsJson(orderedWords, 'words')
    }}>Download</Button>

    <Button variant="contained" onClick={handleAddWordsToMyProfile}>Save to my words</Button>

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
