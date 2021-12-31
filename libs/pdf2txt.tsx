import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = "libs/pdfjs-dist/pdf.worker.js";
const CMAP_URL = "libs/pdfjs-dist/cmaps";
const CMAP_PACKED = true;
const ENABLE_XFA = true;

export async function pdf2txt(pdf: ArrayBuffer) {
  const loadingTask = getDocument({
    data: new Uint8Array(pdf),
    cMapUrl: CMAP_URL,
    cMapPacked: CMAP_PACKED,
    enableXfa: ENABLE_XFA,
  });

  const pdfDocument = await loadingTask.promise;

  let texts: string[] = [];

  for(let page = 1; page <= pdfDocument.numPages; page++) {
    console.log( page )
    await pdfDocument.getPage(page)
      .then(data => data.getTextContent())
      .then((data) => {
        texts.push(...data.items.map(e => (e as any).str));
      });
  }


  return texts.join(' ').replaceAll('  ', ' ');
}