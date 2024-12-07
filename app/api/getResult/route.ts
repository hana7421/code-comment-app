import { NextRequest, NextResponse } from 'next/server';
import db from '../../../database';

export async function GET(req: NextRequest, res: NextResponse) {
    db.all('SELECT * FROM results', [], (err, rows) => {
    //   if (err) {
    //     res.status(500).json({ error: 'Failed to fetch results' });
    //   } else {
    //     res.status(200).json(rows);
    //   }
    });
  }