import React from 'react';

export function PdfLoader({setFile}: {
  setFile: (e: ArrayBuffer | null) => void
}) {
  return <input type="file" onChange={async (e) => {
    const v = e.target.files?.item(0);

    const arrayBuffer = await v?.arrayBuffer();
    setFile(arrayBuffer || null);
  }} />;
}
