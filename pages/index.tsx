import React, {useState} from 'react';
import {InsertText} from "../components/insertText";
import {TopWords} from "../components/topWords";

export default function IndexPage() {
  const [text, setText] = useState('');

  return (
    <>
      <InsertText text={text} setText={setText}/>
      <TopWords value={text}/>
    </>
  );
}
