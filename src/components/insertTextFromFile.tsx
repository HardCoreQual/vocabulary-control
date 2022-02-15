import {pdf2txt} from "../libs/pdf2txt";
import {Button} from "@mui/material";
import React, {useState} from "react";

export function InsertTextFromFile({setText}: {
  setText: (t: string) => void,
}) {
  const [file, setFile] = useState<null | ArrayBuffer>(null);
  return <>
    <input type="file" onChange={async (e) => {
      const v = e.target.files?.item(0);

      const arrayBuffer = await v?.arrayBuffer();
      setFile(arrayBuffer || null);
    }} />
    <Button onClick={async() => {
      if (!file) {
        setText('');
        return;
      }

      setText(await pdf2txt(file));
    }}>Submit File</Button>
  </>;
}
