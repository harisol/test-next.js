// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let {delay = 3}: {delay?: number} = req.query;
  delay *= 1000;
  
  setTimeout(() => {
    res.status(200).json({ name: 'John Doe' });
  }, delay);
}
