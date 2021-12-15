import {PdfLoader} from './pdfLoader';
import axios from 'axios';

async function pdfToText(pdf: ArrayBuffer) {
  const data = new FormData();

  data.append('pdf', new Blob([pdf]));
  const resp = await axios.post('/api/pdf', data, {
    headers: {'content-type': 'multipart/form-data'},
  });

  return resp.data;
}

function InsertTextFromPdf({setText}: { setText: (t: string) => void }) {
  return <PdfLoader setFile={ async (pdf) => {
    if (!pdf) {
      setText('');
      return;
    }

    setText(await pdfToText(pdf));
  }} />;
}

export function InsertTextFromFile({setText}: {
  setText: (t: string) => void,
}) {
  return <>
    <InsertTextFromPdf setText={setText} />
  </>;
}
