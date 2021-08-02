import type {NextApiRequest, NextApiResponse} from 'next';
// @ts-ignore
import PDFParser from 'pdf2json';
import * as fs from 'fs';

export function convertPDFToJson(pdf: Buffer) {
  const pdfParser = new PDFParser();

  return new Promise((resolve, reject) => {
    pdfParser.on('pdfParser_dataError', (errData: any) => reject(errData.parserError));
    pdfParser.on('pdfParser_dataReady', (pdfData: any) => resolve(pdfData));

    pdfParser.loadPDF('f.pdf');

    //
    // pdfParser.parseBuffer(Buffer.from(pdf));
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body as ArrayBuffer;
  fs.writeFileSync('d.pdf', Buffer.from(data));

  return convertPDFToJson(Buffer.from(data))
      .then((d: any) => {
        console.log( d.formImage.Pages[1] );
        return res.status(200).json(d);
      })
      .catch((e) => {
        return res.status(500).json(e);
      } );
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};
