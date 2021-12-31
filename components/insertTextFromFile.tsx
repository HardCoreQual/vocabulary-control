import {PdfLoader} from './pdfLoader';
import {pdf2txt} from "../libs/pdf2txt";

async function pdfToText(pdf: ArrayBuffer): Promise<string> {
  return pdf2txt(pdf);
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
