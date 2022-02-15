import React, {useState} from 'react';
import {TextBox} from "../components/textBox";
import {TopWordsView} from "../components/topWordsView";
import {signIn, signOut, useSession} from "next-auth/react"
import {Button} from "@mui/material";

export default function IndexPage() {
  const [text, setText] = useState('');

  console.log( text )
  const {status} = useSession();

  return (
    <>
      <div css={`display: flex; justify-content: flex-end; height: 100px;`}>
        <div>
          {status === 'unauthenticated' && <Button color={'secondary'} variant={'outlined'} onClick={() => signIn()}>Login</Button>}
          {status === 'authenticated' && <Button color={'secondary'} variant={'outlined'} onClick={() => signOut()}>SignOut</Button>}
        </div>
      </div>

      <TextBox text={text} setText={setText}/>
      <TopWordsView value={text}/>
    </>
  );
}
