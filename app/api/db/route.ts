// pages/api/db.js
import { openDatabase } from '../../../util/db';

export async function connectDatabase() {
  const db = await openDatabase();
  return db;
}
