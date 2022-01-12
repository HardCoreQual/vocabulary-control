import React, {useState} from 'react';
import {InsertText} from "../components/insertText";
import {TopWords} from "../components/topWords";
import {signIn, useSession} from "next-auth/react"

export default function IndexPage() {
  const [text, setText] = useState('');

  const {status} = useSession();

  return (
    <>
      {status === 'unauthenticated' && <button onClick={() => signIn()}>Login</button>}
      <InsertText text={text} setText={setText}/>
      <TopWords value={text}/>
    </>
  );
}
