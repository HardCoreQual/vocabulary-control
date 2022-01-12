import React, {useState} from 'react';
import {InsertText} from "../components/insertText";
import {TopWords} from "../components/topWords";
import {trpc} from "../hooks/trpc";
import {signIn} from "next-auth/react"

export default function IndexPage() {
  const [text, setText] = useState('');
  const hello = trpc.useQuery(['hello', { text: 'client' }]);
  return (
    <>
      <button onClick={() => signIn()}>Login</button>
      {hello.data?.greeting}
      <InsertText text={text} setText={setText}/>
      <TopWords value={text}/>
    </>
  );
}
