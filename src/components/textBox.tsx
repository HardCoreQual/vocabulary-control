import React from 'react';
import {UploadFile} from './uploadFile';
import {TextareaAutosize} from "@mui/material";

export function TextBox({text, setText}: {
text: string,
setText: (t: string) => void,
}) {
  return (
    <div>
      <UploadFile setText={setText}/>


      <TextareaAutosize
        placeholder="Insert text there"
        style={{ width: 900, height: 100, padding: 10  }}
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text}
      />

    </div>
  );
}
