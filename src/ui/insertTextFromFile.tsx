import {PdfLoader} from './pdfLoader';


function InsertTextFromPdf({setText}: { setText: (t: string) => void }) {
  return <PdfLoader setFile={(pdf) => {
    if (!pdf) setText('');
  }} />;
}

export function InsertTextFromFile({setText}: {
  setText: (t: string) => void,
}) {
  return <>
    <InsertTextFromPdf setText={setText} />
  </>;
}
