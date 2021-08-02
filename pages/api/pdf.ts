import type {NextApiRequest, NextApiResponse} from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({text: ''});
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};
