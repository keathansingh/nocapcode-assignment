import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { DatabaseSync } from 'node:sqlite';

export function createDatabase(databasePath = process.env.DATABASE_PATH) {
  const filename = databasePath ?? resolve('backend', 'data', 'contact.sqlite');
  mkdirSync(dirname(filename), { recursive: true });

  const database = new DatabaseSync(filename);
  database.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      organization TEXT NOT NULL DEFAULT '',
      submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const insertContact = database.prepare(`
    INSERT INTO contact_submissions (name, email, subject, message, organization)
    VALUES (?, ?, ?, ?, ?)
  `);

  return {
    database,
    insertContact,
    close: () => database.close(),
  };
}
