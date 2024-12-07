// util/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDatabase() {
  return open({
    filename: './nihongo.db',
    driver: sqlite3.Database,
  });
}
