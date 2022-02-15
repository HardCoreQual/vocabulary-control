import React, {useState} from 'react';
import {InsertText} from "../components/insertText";
import {TopWords} from "../components/topWords";
import {signIn, signOut, useSession} from "next-auth/react"

export default function IndexPage() {
  const [text, setText] = useState('');

  const {status} = useSession();

  return (
    <>
      {status === 'unauthenticated' && <button onClick={() => signIn()}>Login</button>}
      {status === 'authenticated' && <button onClick={() => signOut()}>SignOut</button>}
      <InsertText text={text} setText={setText}/>
      <TopWords value={text}/>
    </>
  );
}