import {pdf2txt} from "../libs/pdf2txt";
import {Button} from "@mui/material";
import React, {useState} from "react";
import {Margin} from "./stupid/styled";

export function UploadFile({setText}: {
  setText: (t: string) => void,
}) {
  const [file, setFile] = useState<null | ArrayBuffer>(null);

  return <Margin>
    <Button
      variant={"outlined"}
      component="label"
    >
      {file ? 'Change': 'Upload'}&nbsp;File
      <input
        onChange={async (e) => {
          const v = e.target.files?.item(0);

          const arrayBuffer = await v?.arrayBuffer();
          setFile(arrayBuffer || null);
        }}
        type="file"
        hidden
      />
    </Button>

    {file && (
      <Button color={'success'} onClick={async() => {
        if (!file) {
          setText('');
          return;
        }

        setText(await pdf2txt(file));
      }}>Submit File</Button>
    )}
  </Margin>;
}
