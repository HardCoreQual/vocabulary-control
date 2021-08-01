import type {NextApiRequest, NextApiResponse} from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;
  console.log( data );
  res.status(200).json({name: 'PDF'});
};
