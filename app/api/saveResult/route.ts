import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../database';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { code, score, feedback } = req.body;
  db.run(
    'INSERT INTO results (code, score, feedback) VALUES (?, ?, ?)',
    [code, score, feedback],
    // function (err) {
    //   if (err) {
    //     res.status(500).json({ error: 'Failed to save result' });
    //   } else {
    //     res.status(200).json({ id: this.lastID });
    //   }
    // }
  );
}