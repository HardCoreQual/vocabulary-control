import React from 'react';
import {InsertTextFromFile} from './insertTextFromFile';

export function InsertText({text, setText}: {
text: string,
setText: (t: string) => void,
}) {
  return (
    <div>
      <InsertTextFromFile setText={setText}/>

      <textarea
        cols={30}
        rows={10}
        onChange={(e) => {
          setText(e.target.value);
        }}
      >
        {text}
      </textarea>
    </div>
  );
}
