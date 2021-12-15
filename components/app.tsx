import React, {useState} from 'react';
import {InsertText} from './insertText';
import {TopWords} from './topWords';

export function App() {
  const [text, setText] = useState('');

  return (
    <>
      <InsertText text={text} setText={setText}/>
      <TopWords value={text}/>
    </>
  );
}
