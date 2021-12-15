import {PdfLoader} from './pdfLoader';

async function pdfToText(pdf: ArrayBuffer): Promise<never> {
  throw new Error('Temporary disabled')
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
