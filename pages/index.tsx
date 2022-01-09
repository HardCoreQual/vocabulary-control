import React, {useState} from 'react';
import {InsertText} from "../components/insertText";
import {TopWords} from "../components/topWords";
import {trpc} from "../hooks/trpc";

export default function IndexPage() {
  const [text, setText] = useState('');
  const hello = trpc.useQuery(['hello', { text: 'client' }]);
  return (
    <>
      {hello.data?.greeting}
      <InsertText text={text} setText={setText}/>
      <TopWords value={text}/>
    </>
  );
}
